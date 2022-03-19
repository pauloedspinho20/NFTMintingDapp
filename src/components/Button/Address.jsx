import {
  bool,
  node,
} from 'prop-types';

import useBepro from 'hooks/useBepro';

const ButtonAddress = ({
  format,
  children,
  ...props
}) => {
  const {
    networkActive,
  } = useBepro();

  const formatAddress = address => {
    const first = address?.substr(0, 5);
    const last = address?.substr(-4);
    return `${first}...${last}`;
  };

  const baseURL = networkActive === 'rinkeby' ? 'https://rinkeby.etherscan.io/address/' : 'https://etherscan.io/address/';
  const url = baseURL + children;
  return (
    <a
      href={ url }
      rel="noopener noreferrer"
      target="_blank"
      { ...props }
    >
      { format ? formatAddress(children) : children }
    </a>
  );
};

ButtonAddress.propTypes = {
  format: bool,
  children: node,
};

ButtonAddress.defaultProps = {
  format: false,
  children: null,
};

export default ButtonAddress;
