import Modal from 'components/Modal/Modal';

import useModal from 'hooks/useModal';

const ModalFollowMetamask = () => {
  const { close, show } = useModal('follow-metamask');

  const { onClose, title } = show || {};

  return (
    <Modal
      name="follow-metamask"
      onClose={ onClose || close }
    >
      <div className="popup--title">{ title }</div>
      <div className="popup--desc">
        Please follow the directions in your wallet.
        The transaction may take a couple of minutes to process.
      </div>
    </Modal>
  );
};

export default ModalFollowMetamask;
