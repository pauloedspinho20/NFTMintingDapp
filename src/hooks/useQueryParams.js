import { useCallback, useMemo } from 'react';

import useRouter from 'hooks/useRouter';

import queryString from 'utils/queryString';

const setParam = (params, key, value) => {
  switch (key) {
    case 'order':
      params.sort = value;
      break;

    case 'page':
      params.page = value;
      break;

    case 'per_page':
      params.perPage = value;
      break;

    case 'filters':
      params.filters = value;
      break;

    default:
      params.filters[key] = value;
      break;
  }
};

export const getQueryParams = location => {
  const { search } = typeof location === 'string'
    ? new URL(location, window.location.origin)
    : location;

  const params = { filters: {} };

  const searchParams = new URLSearchParams(search);
  searchParams.forEach((value, key) => setParam(params, key, value));

  return params;
};

const isEmptyQueryParams = queryParams => (
  // Only `filters` property by default in the object
  Object.keys(queryParams).length === 1
  && queryParams.filters
  // `filters` itself is empty
  && !Object.keys(queryParams.filters).length
);

const useQueryParams = ({ emptyIfNone } = {}) => {
  const {
    pathname,
    push,
    query: search,
    replace,
  } = useRouter();

  const queryParams = useMemo(() => getQueryParams({ pathname, search }), [ pathname, search ]);

  const set = useCallback((values, routerMethod) => {
    const newParams = { ...queryParams };
    Object.entries(values).forEach(([ key, value ]) => {
      setParam(newParams, key, value);
    });

    const paramsStr = queryString(newParams);
    if (paramsStr !== search) {
      if (paramsStr) {
        routerMethod(`${pathname}?${paramsStr}`, undefined, { scroll: false });
      }
      else {
        routerMethod(pathname, undefined, { scroll: false });
      }
    }
  }, [ pathname, queryParams, search ]);

  const setFilter = useCallback(filter => {
    set({
      ...Object.entries(filter).reduce((acc, [ key, val ]) => ({
        ...acc,
        [key]: val?.replace(/#/g, '%23'),
      }), {}),
      page: 1,
    }, push);
  }, [ push, set ]);

  const hookPush = useCallback(values => set(values, push), [ push, set ]);
  const hookReplace = useCallback(values => set(values, replace), [ replace, set ]);

  const hookQueryParams = useMemo(
    () => ((!emptyIfNone || !isEmptyQueryParams(queryParams))
      ? queryParams
      : null),
    [ emptyIfNone, queryParams ],
  );

  return {
    queryParams: hookQueryParams,
    setFilter,

    push: hookPush,
    replace: hookReplace,
  };
};

export default useQueryParams;
