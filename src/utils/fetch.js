import { add as addError } from 'hooks/useErrors';
import { getStorage } from 'hooks/useStorage';

// import { getAuth, refreshTokens, removeAuth } from 'lib/auth';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const corsAnywhere = process.env.REACT_APP_CORS_ANYWHERE;

const digest = data => {
  // Browser API
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    return window.crypto.subtle.digest('SHA-256', data);
  }

  const crypto = require('crypto');

  // Node 16 (15 actually) implements compatible browser API
  if (crypto.webcrypto) {
    return crypto.webcrypto.subtle.digest('SHA-256', data);
  }

  // Older Nodes implement different API, currently Netlify Functions, powered by AWS Lambda, only
  // go up to Node 14.
  return crypto.createHash('sha256').update(data).digest();
};

const hashData = async value => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const buffer = await digest(data);
  const array = Array.from(new Uint8Array(buffer));
  const hash = array.map(b => b.toString(16).padStart(2, '0')).join('');

  return hash;
};

const makeToken = () => {
  const date = new Date().toISOString().split('T')[0];
  return hashData(date);
};

// Early Access
const storage = getStorage(false);
if (typeof window !== 'undefined') {
  const queryParams = new URLSearchParams(window.location.search);
  const queryKey = queryParams.get('early_access_token');
  if (queryKey) {
    storage.set('early-access', queryKey);
  }
}

// Active fetch requests, hashed by the url and all request parameters
const active = new Map();

const doFetch = async (path, params, bypassActive) => {
  const url = corsAnywhere
    ? `${corsAnywhere}${decodeURIComponent(`${apiEndpoint}${path}`).replace(/#/g, '%23')}`
    : `${apiEndpoint}${path}`;

  const hash = await hashData(JSON.stringify({ params, url }));
  const existing = !bypassActive && active.get(hash);

  if (existing) {
    // A similar request is already under way, wait for it and use its response.
    return existing;
  }

  let response;
  let resolveActive;

  if (!bypassActive) {
    active.set(hash, new Promise(resolve => {
      resolveActive = resolve;
    }));
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-RealFevr-Token': await makeToken(),
      ...params?.headers,
    };

    if (corsAnywhere) {
      headers.Origin = process.env.URL || window.location.origin;
    }

    const earlyAccessToken = storage.get('early-access');
    if (earlyAccessToken) {
      headers['X-RealFevr-Early-Access-Token'] = earlyAccessToken;
    }

    // const authAccessTokens = getAuth();
    // if (authAccessTokens?.accessToken) {
    //   headers.Authorization = `Bearer ${authAccessTokens?.accessToken}`;
    // }

    const newResponse = fetch(url, {
      ...params,
      headers,
      referrerPolicy: 'no-referrer',
    })
      // .then(async innerResponse => {
      //   if (!innerResponse.ok) {
      //     // The access token may have expired or non-existing, attempt to get a new one
      //     if (innerResponse.status === 401) {
      //       // Avoid infinite loop of awaiting this same promise.
      //       if (params?.refreshingToken) {
      //         return innerResponse;
      //       }
      //
      //       const newTokens = await refreshTokens();
      //
      //       // We only get new access tokens if we had a refresh token saved to begin with. In this
      //       // case, try this request again with the new tokens.
      //       if (newTokens?.accessToken) {
      //         return doFetch(path, params, true);
      //       }
      //     }
      //
      //     // Malformed or invalid tokens imply a forced logout
      //     else if (innerResponse.status === 403) {
      //       removeAuth();
      //     }
      //   }
      //
      //   return innerResponse;
      // })
      .then(innerResponse => {
        // Requesting bypassing this cache should not be processed, as the original request will
        // try to process them as well.
        if (bypassActive) {
          return innerResponse;
        }

        return innerResponse.json()
          .then(content => {
            // Request errors should be shown to the user
            if ([ 400, 404 ].filter(code => !params?.ignoreErrors?.includes(code)).includes(innerResponse.status)) {
              if (typeof content === 'object' && !Array.isArray(content)) {
                addError(content, true);
              }
              else if (typeof content === 'string' && content) {
                addError(`Request error: ${content}`, true);
              }
              else {
                addError('Request error');
              }
            }

            const result = {
              ok: innerResponse.ok,
            };

            if (typeof content === 'object' && !Array.isArray(content)) {
              return {
                ...result,
                ...content,
              };
            }

            result.content = content;
            return result;
          })
          .catch(ex => {
            // eslint-disable-next-line no-console
            console.error(ex);

            if ([ 400, 404 ].filter(code => !params?.ignoreErrors?.includes(code)).includes(innerResponse.status)) {
              addError('Request error');
            }

            return innerResponse;
          });
      })
      .catch(ex => {
        // eslint-disable-next-line no-console
        console.error(ex);

        addError('Request error');

        return null;
      });

    // The request goes into a global object that can be checked for redundancy in other threads
    if (!bypassActive) {
      resolveActive(newResponse);
    }

    // Wait for it of course
    response = await newResponse;
  }
  catch (ex) {
    // eslint-disable-next-line
    console.error(ex);
  }

  // Outside of the catch, to ensure we don't lock up any request that may fail
  if (!bypassActive) {
    active.delete(hash);
  }

  return response;
};

export default doFetch;
