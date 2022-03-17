import { string, bool } from 'prop-types';

import Image from 'components/Image';

import imageFevrFevr from './assets/pool-fevr-fevr.png';
import imageFevrBnb from './assets/fevr-bnb-token-header.png';
import imageFevrEth from './assets/fevr-eth-token-header.png';

const MintImage = ({ alt, isLpPool, network }) => {
  let src;

  if (!isLpPool) {
    src = imageFevrFevr;
  }
  else if (network === 'bsc') {
    src = imageFevrBnb;
  }
  else {
    src = imageFevrEth;
  }

  return (
    <Image
      className="minting-container--title-img"
      alt={ alt }
      animationDuration={ 0.1 }
      src={ src }
      key={ src }
    />
  );
};

MintImage.propTypes = {
  alt: string,
  isLpPool: bool,
  network: string,
};

MintImage.defaultProps = {
  alt: '',
  isLpPool: null,
  network: null,
};

export default MintImage;
