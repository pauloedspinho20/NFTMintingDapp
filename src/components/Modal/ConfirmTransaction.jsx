import Modal from 'components/Modal/Modal';
import InTransaction from 'components/InTransaction/InTransaction';

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
        Transaction pending on your wallet.
        <br />
        Can take some time confirm.
      </div>
      <InTransaction />
    </Modal>
  );
};

export default ModalConfirmTransaction;
