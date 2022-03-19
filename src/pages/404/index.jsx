import { useRouter } from 'next/router';

import AppWrapper from 'containers/AppWrapper';
import Button from 'components/Button/Button';

const FourOhFour = () => {
  const { push } = useRouter();

  return (
    <AppWrapper isError>
      <div className="container container--error">
        <div className="row">
          <div className="col">
            <h1 className="e404--title">404 Page not found</h1>
            <p className="e404--desc">This page doesn’t exist.</p>

            <Button
              className="btn--hover-bg-purple"
              onClick={ () => push('/') }
              size="s"
              sizeMin={ 150 }
              theme="white"
            >
              Back home
            </Button>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default FourOhFour;
