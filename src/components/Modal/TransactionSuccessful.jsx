import ButtonViewTransaction from 'components/Button/ViewTransaction';
import Modal from 'components/Modal/Modal';

import useModal from 'hooks/useModal';

const ModalTransactionSuccessful = () => {
  const { close, open, show } = useModal('transaction-successful');

  const {
    transactionHash,
  } = show || {};

  const onClose = () => {
    if (show?.length > 1) {
      open(show.slice(1));
    }
    else {
      close();
    }
  };

  return (
    <Modal
      name="transaction-successful"
      onClose={ onClose }
    >
      <div className="popup--title">NFT Minted</div>

      <ul className="popup--actions">
        <li>
          <ButtonViewTransaction transactionHash={ transactionHash } />
        </li>
      </ul>
    </Modal>
  );
};

export default ModalTransactionSuccessful;
