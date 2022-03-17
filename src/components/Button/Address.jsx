import {
  node,
} from 'prop-types';

import useBepro from 'hooks/useBepro';

const ButtonAddress = ({
  children,
  ...props
}) => {
  const {
    networkActive,
  } = useBepro();

  const baseURL = networkActive === 'rinkeby' ? 'https://rinkeby.etherscan.io/address/' : 'https://etherscan.io/address/';
  const url = baseURL + children;
  return (
    <a
      href={ url }
      rel="noopener noreferrer"
      target="_blank"
      { ...props }
    >
      { children }
    </a>
  );
};

ButtonAddress.propTypes = {
  children: node,
};

ButtonAddress.defaultProps = {
  children: null,
};

export default ButtonAddress;
