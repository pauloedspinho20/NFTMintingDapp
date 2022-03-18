import { createGlobalState } from 'react-hooks-global-state';

const { getGlobalState, setGlobalState, useGlobalState } = createGlobalState({ modals: {} });

const prepareModal = name => {
  const modal = {
    show: null,

    open: params => setGlobalState('modals', {
      ...getGlobalState('modals'),
      [name]: {
        ...modal,
        show: params || true,
      },
    }),

    close: () => setGlobalState('modals', {
      ...getGlobalState('modals'),
      [name]: {
        ...modal,
        show: null,
      },
    }),
  };

  setGlobalState('modals', {
    ...getGlobalState('modals'),
    [name]: modal,
  });

  return modal;
};

const useModal = name => {
  const [ modals ] = useGlobalState('modals');
  return modals[name] || prepareModal(name);
};

export default useModal;

export const getModal = name => {
  const modals = getGlobalState('modals');
  return modals[name] || prepareModal(name);
};

export const openModal = (name, params) => {
  const { open } = getModal(name);
  open(params);
};
