import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { createGlobalState } from 'react-hooks-global-state';
import parser from 'html-react-parser';

import Button from 'components/Button/Button';

import useConsent from 'hooks/useConsent';

import { cookiesBanner } from 'config';

import './CookiesBanner.scss';

export const { useGlobalState } = createGlobalState({
  cookiesScreen: '',
});

const CookiesBanner = () => {
  const [ consent, setConsent ] = useConsent();
  const [ firstRender, setFirstRender ] = useState(false);
  const [ options, setOptions ] = useState(cookiesBanner.options.reduce((acc, [ option ]) => ({
    ...acc,
    [option]: consent?.[option],
  }), {}));
  const [ screen, setScreen ] = useGlobalState('cookiesScreen');

  useEffect(() => {
    // So hidration matches SSRed markup when consent cookie already exists.
    setFirstRender(true);
  }, []);

  useEffect(() => {
    if (!screen && !consent) {
      setScreen('banner');
    }
  }, [ consent, screen, setScreen ]);

  return (!firstRender || !consent || screen === 'options') && (
    <section
      className={ classnames('cookies-banner', {
        'cookies-banner--show': screen,
      }) }
    >
      <div className="cookies-banner__content">
        { parser(cookiesBanner.body) }

        <div className="cookies-banner__links">
          <Link to="/terms-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>

        { screen === 'options' && (
          <div className="cookies-banner__options">
            { cookiesBanner.options.map(([ option, label ]) => (
              <div
                key={ option }
                className={ classnames('form-element-container form-element-container--checkbox', {
                  'checkbox-is-checked': options[option],
                }) }
              >
                <div
                  className={ classnames('checkbox', {
                    checked: options[option],
                  }) }
                >
                  <input
                    type="checkbox"
                    checked={ options[option] }
                    id={ `switch-${option}` }
                    onChange={ e => setOptions({
                      ...options,
                      [option]: e.target.checked,
                    }) }
                  />
                </div>
                <label htmlFor={ `switch-${option}` }>
                  { label }
                </label>
              </div>
            )) }
          </div>
        ) }
      </div>

      <div className="cookies-banner__btn-wrapper">
        { screen === 'banner' && (
          <Button
            className="cookies-banner__btn cookies-banner__btn--more btn--hover-txt-purple"
            onClick={ () => setScreen('options') }
            size="xs"
            theme="none"
          >
            More Options
          </Button>
        ) }

        { screen === 'banner' && (
          <Button
            className="cookies-banner__btn"
            onClick={ () => {
              setConsent(cookiesBanner.options.reduce((acc, [ option ]) => ({
                ...acc,
                [option]: true,
              }), {}));
              setScreen('');
            } }
            size="xs"
            theme="blue-gradient"
          >
            Accept All
          </Button>
        ) }

        { screen === 'options' && (
          <Button
            className="cookies-banner__btn"
            onClick={ () => {
              setConsent(options);
              setScreen('');
            } }
            size="xs"
            theme="purple-gradient"
          >
            Save Preferences
          </Button>
        ) }
      </div>
    </section>
  );
};

export default CookiesBanner;
