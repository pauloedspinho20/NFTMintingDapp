import { useEffect } from 'react';
import { bool, string, node } from 'prop-types';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import CookiesBanner from 'components/CookiesBanner/CookiesBanner';
import Footer from 'containers/Footer/Footer';
import Header from 'containers/Header/Header';
import Metadata from 'components/Metadata';
import ModalConnectWallet from 'components/Modal/ConnectWallet';
import ModalError from 'components/Modal/Error';
import ModalConfirmTransaction from 'components/Modal/ConfirmTransaction';
import ModalMint from 'components/Modal/Mint';
import ModalTransactionSuccessful from 'components/Modal/TransactionSuccessful';

import useAppSuffix from 'hooks/useAppSuffix';
import useMobileNav from 'hooks/useMobileNav';
import useQueryParams, { getQueryParams } from 'hooks/useQueryParams';
import useIpfs from 'hooks/useIpfs';
import { pageMeta } from 'config';

const getPageSuffix = (appSuffix, isError, pathname) => {
  if (isError) {
    return 'error';
  }

  if (appSuffix) {
    return appSuffix;
  }

  const path = pathname.match(/^\/([a-zA-Z/_-]+)/)?.[1];
  if (!path) {
    return 'home';
  }

  switch (path) {
    case 'mint':
      return 'mint';
    case 'collection':
      return 'collection';
    default:
      return path;
  }
};

const AppWrapper = ({
  children,
  description,
  image,
  isError,
  title,
  video,
}) => {
  const { events, pathname } = useRouter();
  const ipfs = useIpfs();
  const { queryParams: { page } } = useQueryParams();
  const [ appSuffix ] = useAppSuffix();
  const suffix = getPageSuffix({
    appSuffix, isError, pathname,
  });

  const [ , setMobileNav ] = useMobileNav();

  useEffect(() => {
    // Always close the mobile menu on route switch
    setMobileNav(null);
  }, [ pathname, setMobileNav, suffix ]);

  useEffect(() => {
    const handleRouteChanged = location => {
      const newQueryParams = getQueryParams(location);

      if (
        (newQueryParams.page && newQueryParams.page !== '1' && !page)
        || (newQueryParams.page && page && newQueryParams.page !== page)
      ) {
        const scrollHere = document.getElementById('scroll-here');
        if (scrollHere) {
          window.scrollTo(0, scrollHere.offsetTop - 128);
          return;
        }

        window.scrollTo(0, 0);
      }
    };

    events.on('routeChangeStart', handleRouteChanged);

    return () => {
      events.off('routeChangeStart', handleRouteChanged);
    };
  }, [ events, page ]);

  return (
    <>
      <Metadata
        description={ description || pageMeta.description }
        image={ ipfs(image || pageMeta.image) }
        title={ title || pageMeta.title }
        video={ video || pageMeta.video }
      />

      <CookiesBanner />
      <ModalConnectWallet />
      <ModalError />
      <ModalConfirmTransaction />
      <ModalMint />
      <ModalTransactionSuccessful />

      <div
        className={ classnames('App', `pg-${suffix}`, {
          // maintenance: maintenance.message,
        }) }
      >
        <Header />
        <main id="main-content">
          { children }
        </main>
        <Footer />
      </div>
    </>
  );
};

AppWrapper.propTypes = {
  children: node,
  description: string,
  image: string,
  isError: bool,
  title: string,
  video: string,
};

AppWrapper.defaultProps = {
  children: null,
  description: '',
  image: '',
  isError: false,
  title: '',
  video: '',
};

export default AppWrapper;
