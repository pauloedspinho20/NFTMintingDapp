import { node, string } from 'prop-types';
import { SimpleImg } from 'react-simple-img';

const Image = ({ placeholder, src, ...props }) => !!src && (
  <SimpleImg
    placeholder={ placeholder }
    src={ src }
    { ...props }
  />
);
Image.propTypes = {
  placeholder: node,
  src: string,
};

Image.defaultProps = {
  placeholder: false,
  src: '',
};

export default Image;
