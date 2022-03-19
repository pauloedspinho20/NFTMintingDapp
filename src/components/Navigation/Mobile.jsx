import classnames from 'classnames';

import PageContainer from 'components/Page/Container';
import Wallet from 'components/Wallet/Wallet';

import useClickOutside from 'hooks/useClickOutside';
import useMobileNav from 'hooks/useMobileNav';

import NavigationItems from './Items';

const NavigationMobile = () => {
  const [ mobileNav, setMobileNav ] = useMobileNav();

  const ref = useClickOutside(({ target }) => {
    if (mobileNav === 'main-nav' && !target.classList.contains('mobile-menu-btn')) {
      setMobileNav(null);
    }
  });

  return (
    <div
      className={ classnames('mobile-nav', {
        'mobile-nav--is-active': mobileNav === 'main-nav',
      }) }
      ref={ ref }
    >
      <PageContainer>
        <div className="row">
          <div className="col">
            <nav>
              <ul>
                <NavigationItems expanded />
                <li>
                  <Wallet />
                </li>
                <li />
              </ul>
            </nav>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default NavigationMobile;
