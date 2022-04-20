import React from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';

import Image from 'components/Image';

import logo from './assets/logo.png';

const Logo = ({ className }) => {
  const img = false;
  return (
    <h1 className={ classnames('main-logo', { 'logo-text': !img }) }>
      { img ? (
        <Image
          alt="logo"
          className={ classnames('logo', className) }
          src={ logo?.src }
        />
      ) : (
        <div className={ classnames('logo', className) }>SPADE LABS</div>
      ) }
    </h1>
  );
};

Logo.propTypes = {
  className: string,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
