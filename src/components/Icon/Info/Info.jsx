import { node, string } from 'prop-types';
import Image from 'components/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const IconInfo = ({
  alt, children, id, src,
}) => (
  <OverlayTrigger
    delay={ 50 }
    overlay={ (
      <Tooltip id={ id }>
        { children || alt }
      </Tooltip>
      ) }
    placement="bottom"
    trigger={ [ 'focus', 'hover' ] }
  >
    <div className="icon-info">
      <span data-for={ id }>
        <Image
          alt={ alt }
          src={ src }
        />
      </span>
    </div>
  </OverlayTrigger>
);

IconInfo.propTypes = {
  alt: string,
  children: node,
  id: string.isRequired,
  src: string,
};

IconInfo.defaultProps = {
  alt: null,
  children: null,
  src: '',
};

export default IconInfo;
