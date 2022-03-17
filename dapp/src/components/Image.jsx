import { node, string } from 'prop-types';
import { SimpleImg } from 'react-simple-img';

import useIpfs from 'hooks/useIpfs';

const Image = ({ placeholder, src, ...props }) => {
  const ipfs = useIpfs();

  return !!src && (
    <SimpleImg
      placeholder={ placeholder }
      src={ ipfs(src) }
      { ...props }
    />
  );
};

Image.propTypes = {
  placeholder: node,
  src: string,
};

Image.defaultProps = {
  placeholder: false,
  src: '',
};

export default Image;
