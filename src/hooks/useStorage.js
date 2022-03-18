import { useMemo } from 'react';
import Cookies from 'js-cookie';

import useConsent from 'hooks/useConsent';

const getStoreObject = which => {
  const storage = window[which];
  if (!storage) {
    throw Error('no local storage');
  }

  storage.setItem('test', 'test');
  if (storage.getItem('test') === 'test') {
    storage.removeItem('test');
  }

  // Setup simple local storage wrapper
  return {
    set: (key, value) => storage.setItem(key, JSON.stringify(value)),
    get: key => {
      const item = storage.getItem(key);
      try {
        return JSON.parse(item);
      }
      catch (ex) {
        return null;
      }
    },
    remove: key => storage.removeItem(key),
  };
};

const getStore = consent => {
  const inBrowser = typeof window !== 'undefined';
  if (!inBrowser) {
    return {
      get: () => {},
      set: () => {},
      remove: () => {},
    };
  }

  // User has not consented to storing information, we can only store info for this session.
  if (!consent) {
    try {
      return getStoreObject('sessionStorage');
    }
    catch (ex) {
      return {
        get: key => JSON.parse(Cookies.get(key)),
        set: (key, value) => Cookies.set(key, value, {
          sameSite: 'strict',
        }),
        remove: Cookies.remove,
      };
    }
  }

  // Safari in incognito has local storage, but size 0
  // This system falls back to cookies in that situation
  try {
    return getStoreObject('localStorage');
  }
  catch (ex) {
    return {
      get: key => JSON.parse(Cookies.get(key)),
      set: (key, value) => Cookies.set(key, value, {
        expires: 365,
        sameSite: 'strict',
      }),
      remove: Cookies.remove,
    };
  }
};

const scriptStorage = {};

export const getStorage = (key, consent) => {
  const store = getStore(consent);

  scriptStorage[key] = store.get(key) || {};

  return {
    get: name => scriptStorage[key][name],

    set: (name, value) => {
      scriptStorage[key][name] = value;
      store.set(key, scriptStorage[key]);
      return value;
    },

    remove: name => {
      delete scriptStorage[key][name];
      store.set(key, scriptStorage[key]);
    },
  };
};

const useStorage = (key, consentType) => {
  const [ consent ] = useConsent(consentType);
  return useMemo(() => getStorage(key, consent), [ consent, key ]);
};

export default useStorage;
