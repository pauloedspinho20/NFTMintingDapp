import { node, string } from 'prop-types';

import Button from 'components/Button/Button';
import useBepro from 'hooks/useBepro';

const ButtonViewTransaction = ({ children, transactionHash, ...props }) => {
  const {
    networkActive,
  } = useBepro();
  const txUrl = networkActive === 'rinkeby' ? 'https://rinkeby.etherscan.io/tx/' : 'https://etherscan.io/tx/';

  return !!transactionHash && (
    <Button
      external
      onClick={ () => console.log('transactionHash: ', transactionHash) }
      size="m"
      theme="orange"
      title="Transaction details"
      to={ `${txUrl}${transactionHash}` }
      { ...props }
    >
      { children }
    </Button>
  );
};

ButtonViewTransaction.propTypes = {
  children: node,
  transactionHash: string,
};

ButtonViewTransaction.defaultProps = {
  children: 'View Transaction',
  transactionHash: '',
};

export default ButtonViewTransaction;
