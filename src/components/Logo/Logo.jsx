import React from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';

import Image from 'components/Image';

import logo from './assets/logo.png';

const Logo = ({ className }) => {
  const img = false;
  return (
    img ? (
      <Image
        alt="logo"
        className={ classnames('logo', className) }
        src={ logo }
      />
    ) : (
      <h4 className={ classnames('logo', className) }>{ process.env.NEXT_PUBLIC_DAPP_NAME || 'NFTMintingDapp' }</h4>
    )
  );
};

Logo.propTypes = {
  className: string,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
