import { Link } from 'react-router-dom';

import Logo from 'components/Logo/Logo';

import './style.scss';

const Maintenance = () => (
  <div className="App pg-maintenance">
    <div id="main-content">
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
  </div>
);

export default Maintenance;
