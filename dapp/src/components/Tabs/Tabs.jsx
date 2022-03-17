import {
  arrayOf, bool, shape, string,
} from 'prop-types';
import classnames from 'classnames';
import { useLocation, useHistory } from 'react-router-dom';
import PageContainer from 'components/Page/Container';

import './Tabs.scss';

const list = {
  minting: [
    { label: 'Fixed', path: '/' },
    { label: 'Flexible', path: '/flexible' },
    { label: 'Liquidity Pools', path: '/lps' },
  ],
  status: [
    { label: 'Active', path: '/active' },
    { label: 'Inactive', path: '/inactive' },
  ],
};

const Tabs = ({ section, stepper, tabs }) => {
  // const { pathname, push } = useRouter();
  const { hash, pathname } = useLocation();
  const history = useHistory();

  const show = list[section] || tabs;

  return (
    !!show && section === 'minting' ? (
      <div
        className={ classnames('tabs-nav', {
          'tabs-nav--with-overflow': stepper,
          'tabs-nav--stepper': stepper,
        }) }
      >
        <PageContainer>
          <div className="row">
            <div className="col">
              <nav>
                <ul>
                  { show.map(({
                    active, label, onClick, path, stepDone,
                  }) => (
                    <li
                      key={ path || label }
                      className={ classnames({
                        'active-tab': active || path === pathname,
                        'step-done': stepDone,
                      }) }
                    >
                      { stepper
                        ? (
                          <span>{ label }</span>
                        )
                        : (
                          <button
                            onClick={ onClick || (() => {
                              history.push(`${path}${hash}`);
                            }) }
                            type="button"
                          >
                            { label }
                          </button>
                        ) }
                    </li>
                  )) }
                </ul>
              </nav>
            </div>
          </div>
        </PageContainer>
      </div>
    )
      : (
        <div
          className={ classnames('tabs-nav', {
            'tabs-nav--with-overflow': stepper,
            'tabs-nav--stepper': stepper,
          }) }
        >
          <div className="row">
            <div className="col">
              <nav>
                <ul>
                  { show.map(({
                    active, label, onClick, path, stepDone,
                  }) => (
                    <li
                      key={ path || label }
                      className={ classnames({
                        'active-tab': active || path === pathname,
                        'step-done': stepDone,
                      }) }
                    >
                      { stepper
                        ? (
                          <span>{ label }</span>
                        )
                        : (
                          <button
                            onClick={ onClick || (() => history.push(path)) }
                            type="button"
                          >
                            { label }
                          </button>
                        ) }
                    </li>
                  )) }
                </ul>
              </nav>
            </div>
          </div>

        </div>
      )
  );
};

Tabs.propTypes = {
  section: string,
  stepper: bool,
  tabs: arrayOf(shape({
    label: string,
    path: string,
  })),
};

Tabs.defaultProps = {
  section: '',
  stepper: false,
  tabs: [],
};

export default Tabs;
