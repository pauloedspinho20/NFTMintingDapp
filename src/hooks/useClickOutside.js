import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = handler => {
  const ref = useRef({
    node: null,
    remove: null,
  });

  useEffect(() => () => {
    if (ref.current.remove) {
      ref.current.remove();
      ref.current.remove = null;
    }
  }, []);

  return useCallback(node => {
    if (ref.current.remove) {
      ref.current.remove();
      ref.current.remove = null;
    }

    ref.current.node = node;

    if (node) {
      const onClick = e => {
        if (!node.contains(e.target)) {
          handler(e);
        }
      };

      window.addEventListener('click', onClick, true);

      ref.current.remove = () => window.removeEventListener('click', onClick, true);
    }
  }, [ handler ]);
};

export default useClickOutside;
