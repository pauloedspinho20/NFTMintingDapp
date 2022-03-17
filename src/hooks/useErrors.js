import { createGlobalState } from 'react-hooks-global-state';

import { knownErrors } from 'config';

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({ errors: [] });

export const add = (message, showSpecific) => {
  if (typeof message === 'object') {
    const str = Object.entries(message)
      .map(([ key, val ]) => {
        const keyVal = `${key}: ${val}`;
        return knownErrors[keyVal] || keyVal;
      })
      .join(', ');

    return add(str, showSpecific);
  }

  // eslint-disable-next-line no-console
  console.error(new Error(message));

  return setGlobalState('errors', [
    ...getGlobalState('errors'),
    {
      message: showSpecific ? message : 'An unexpected error has occurred. If this persists, please reach out to us.',
    },
  ]);
};

export const clear = () => setGlobalState('errors', []);

export const remove = error => setGlobalState('errors', getGlobalState('errors').filter(err => err !== error));

const useErrors = () => {
  const [ errors ] = useGlobalState('errors');

  return {
    add,
    clear,
    errors,
    remove,
  };
};

export default useErrors;
