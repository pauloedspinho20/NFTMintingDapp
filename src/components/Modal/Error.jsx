import { useEffect } from 'react';

import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import useErrors from 'hooks/useErrors';
import useModal from 'hooks/useModal';

const getTitle = message => {
  switch (message) {
    case 'not approved':
      return 'Transactions Not Approved';
    case 'no eth':
      return 'No Balance in Wallet';
    case 'insufficient eth':
      return 'Not Enough ETH';
    case 'mint cancelled':
      return 'Mint Cancelled';
    default:
      return 'Something went wrong';
  }
};

const getMessage = message => {
  switch (message) {
    case 'not approved':
      return 'You must approve its transactions in MetaMask.';
    case 'no eth':
      return 'Please add ETH to your wallet.';
    case 'insufficient eth':
      return 'Please add more ETH to your wallet.';
    case 'mint cancelled':
      return 'You must confirm the transaction in order to mint.';
    default:
      return message;
  }
};

const getActionLabel = message => {
  switch (message) {
    case 'no eth':
      return 'Buy ETH';
    case 'insufficient eth':
      return 'Buy More ETH';
    default:
      return 'Try Again';
  }
};

const ModalError = () => {
  const { clear, errors } = useErrors();
  const { close, open, show } = useModal('error');

  const getAction = message => {
    switch (message) {
      case 'no eth':
      case 'insufficient eth':
        return () => window.open('https://www.binance.com/en/buy-sell-crypto?channel=hzBankcard&fiat=USD&crypto=ETH');
      default:
        return null;
    }
  };

  useEffect(() => {
    if (errors.length) {
      open();
    }
    else {
      close();
    }
  }, [ close, errors, open, show ]);

  const { message: first } = errors[0] || {};

  return (
    <Modal
      name="error"
      onClose={ clear }
    >
      <div className="popup--title">{ getTitle(first) }</div>

      { errors.map(({ message }, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={ `error-${idx}` }
          className="popup--desc"
        >
          { getMessage(message) }
          { [ 'no eth', 'insufficient eth' ].includes(message) && (
            <h3>No ETH</h3>
          ) }
        </div>
      )) }

      <ul className="popup--actions">
        <li>
          <Button
            className="btn-primary"
            onClick={ getAction(first) || clear }
            size="m"
            theme="orange"
          >
            { getActionLabel(first) }
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

export default ModalError;
