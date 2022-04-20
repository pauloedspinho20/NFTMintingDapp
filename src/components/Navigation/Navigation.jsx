import { useEffect } from 'react';
import classnames from 'classnames';
import Link from 'components/Link';

import Logo from 'components/Logo/Logo';
import PageContainer from 'components/Page/Container';
import Wallet from 'components/Wallet/Wallet';

import useMobileNav from 'hooks/useMobileNav';

import NavigationItems from './Items';

const Navigation = () => {
  const [ mobileNav, setMobileNav ] = useMobileNav();

  // Sticky Header
  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset >= 60) {
        document.body.classList.add('header-is-sticky');
      }
      else {
        document.body.classList.remove('header-is-sticky');
      }
    };

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header id="main-header">
      <PageContainer>
        <div className="row">
          <div className="col d-inline-flex justify-content-between s align-items-center">
            <Link to="/">
              <Logo />
            </Link>
            <nav id="main-nav">
              <ul>
                <NavigationItems />
              </ul>
              <Wallet withBalance size="s" />
            </nav>
            <button
              className={ classnames('mobile-menu-btn', {
                'mobile-menu-btn--is-active': mobileNav === 'main-nav',
              }) }
              onClick={ () => setMobileNav(mobileNav !== 'main-nav' ? 'main-nav' : null) }
              type="button"
            >
              <i className="line" />
            </button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
};

export default Navigation;
