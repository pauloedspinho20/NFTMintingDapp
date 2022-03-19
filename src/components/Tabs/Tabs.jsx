import {
  arrayOf, bool, shape, string,
} from 'prop-types';
import classnames from 'classnames';

import PageContainer from 'components/Page/Container';

import useRouter from 'hooks/useRouter';

const list = {
  default: [
    { label: 'Menu 1', path: '/' },
    { label: 'Menu 2', path: '/' },
  ],

};

const Tabs = ({ section, stepper, tabs }) => {
  const { buildPathWithQuery, pathname, push } = useRouter();

  const show = list[section] || tabs;

  return !!show && (
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
                          onClick={ onClick || (() => push(buildPathWithQuery(path))) }
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
