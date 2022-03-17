import Modal from 'components/Modal/Modal';

import useModal from 'hooks/useModal';

const ModalConfirmTransaction = () => {
  const { close, show } = useModal('confirm-transaction');

  const { onClose, title } = show || {};

  return (
    <Modal
      name="confirm-transaction"
      onClose={ onClose || close }
    >
      <div className="popup--title">{ title }</div>
      <div className="popup--desc">
        Pending on your wallet
      </div>
    </Modal>
  );
};

export default ModalConfirmTransaction;
