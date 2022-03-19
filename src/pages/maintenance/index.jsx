import Link from 'components/Link';

import AppWrapper from 'containers/AppWrapper';
import Logo from 'components/Logo/Logo';

const Maintenance = () => (
  <AppWrapper>
    <div className="App pg-maintenance">
      <Link
        className="logo"
        to="/"
      >
        <Logo />
      </Link>
      <div className="container--maintenance tw">
        <div className="ti">
          <div className="maintenance--txt">
            <h1 className="maintenance--title">Under Maintenance</h1>
          </div>
        </div>
      </div>
      <div className="maintenance--bg" />
    </div>
  </AppWrapper>
);

export default Maintenance;
