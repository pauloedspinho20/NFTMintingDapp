import { node, string } from 'prop-types';

import Button from 'components/Button/Button';

const ButtonViewTransaction = ({ children, transactionHash, ...props }) => {
  const txUrl = 'https://bscscan.com/tx/';

  return !!transactionHash && (
    <Button
      className="btn-primary"
      external
      onClick={ () => console.log('transactionHash: ', transactionHash) }
      size="m"
      theme="blue-gradient"
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
