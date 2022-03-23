import { useEffect, useRef } from 'react';

// import Button from 'components/Button/Button';
import NavigationSocialMedia from 'components/Navigation/SocialMedia';
import PageContainer from 'components/Page/Container';
import { maintenanceMessage } from 'config';

import MaintenanceMessage from './MaintenanceMessage';

const UpperHeader = () => {
  const upperHeaderRef = useRef();

  useEffect(() => {
    const handler = () => {
      if (upperHeaderRef?.current) {
        const { getComputedStyle, pageYOffset } = window;
        const { offsetHeight } = upperHeaderRef.current;
        const { marginBottom } = getComputedStyle(upperHeaderRef.current);

        if (pageYOffset >= (offsetHeight + parseInt(marginBottom, 10))) {
          document.body.classList.add('header-is-sticky');
          return;
        }
      }

      document.body.classList.remove('header-is-sticky');
    };

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      { maintenanceMessage && (
        <MaintenanceMessage>{ maintenanceMessage }</MaintenanceMessage>
      ) }

      <div
        className="upper-header__wrapper"
        ref={ upperHeaderRef }
      >
        <PageContainer>
          <div className="row">
            <div className="col text-left">
              { /*   <Button
                to="/"
                theme="white"
                size="xxs"
              >
                Action
              </Button> */ }
            </div>
            <div className="col text-right">
              <NavigationSocialMedia />
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  );
};

export default UpperHeader;
