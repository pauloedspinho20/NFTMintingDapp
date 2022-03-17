import { useHistory } from 'react-router-dom';

import Button from 'components/Button/Button';

import './style.scss';

const FourOhFour = () => {
  const history = useHistory();

  return (
    <div className="container container--error">
      <div className="row">
        <div className="col">
          <h1 className="e404--title">404 Page not found</h1>
          <p className="e404--desc">This page doesn’t exist.</p>

          <Button
            className="btn--hover-bg-purple"
            onClick={ () => history.push('/') }
            size="s"
            sizeMin={ 150 }
            theme="white"
          >
            Back home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
