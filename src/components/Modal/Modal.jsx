import { func, node, string } from 'prop-types';
import BootstrapModal from 'react-bootstrap/Modal';

import useModal from 'hooks/useModal';

import './Modal.scss';

const Modal = ({
  children, className, name, onClose,
}) => {
  const { close, show } = useModal(name);

  return (
    <BootstrapModal
      animation={ false }
      className={ className }
      contentClassName="ti"
      dialogClassName="tw"
      onHide={ onClose || close }
      show={ !!show }
    >
      <div className={ `${className}--container` }>
        <button
          className={ `${className}--close-btn` }
          label="close"
          onClick={ onClose || close }
          type="button"
        >
          x
        </button>
        <BootstrapModal.Body className={ `${className}--wrapper` }>
          { children }
        </BootstrapModal.Body>
      </div>
    </BootstrapModal>
  );
};

Modal.propTypes = {
  children: node,
  className: string,
  name: string.isRequired,
  onClose: func,
};

Modal.defaultProps = {
  children: null,
  className: 'popup',
  onClose: null,
};

export default Modal;
