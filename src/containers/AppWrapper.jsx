import { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import ModalConnectWallet from 'components/Modal/ConnectWallet';
import ModalError from 'components/Modal/Error';
import ModalConfirmTransaction from 'components/Modal/ConfirmTransaction';
import ModalMint from 'components/Modal/Mint';
import ModalTransactionSuccessful from 'components/Modal/TransactionSuccessful';

import useMobileNav from 'hooks/useMobileNav';

import { maintenanceMessage } from 'config';

const getPageSuffix = pathname => {
  const path = pathname.match(/^\/([a-zA-Z/_-]+)/)?.[1];
  if (!path) {
    return 'minting';
  }

  switch (path) {
    default:
      return path;
  }
};

const AppWrapper = ({ children }) => {
  const [ appClassName, setAppClassName ] = useState('');
  const { pathname } = useLocation();
  const suffix = getPageSuffix(pathname);
  const [ , setMobileNav ] = useMobileNav();

  useEffect(() => {
    setAppClassName(`pg-${suffix}`);

    // Always close the mobile menu on route switch
    setMobileNav(null);
  }, [ pathname, setMobileNav, suffix ]);

  return (
    <>
      <ModalConnectWallet />
      <ModalError />
      <ModalConfirmTransaction />
      <ModalMint />
      <ModalTransactionSuccessful />

      <div className={ classnames('App', appClassName, {
        maintenance: maintenanceMessage !== '',
      }) }
      >
        { children }
      </div>
    </>
  );
};

AppWrapper.propTypes = {
  children: node,
};

AppWrapper.defaultProps = {
  children: null,
};

export default AppWrapper;
