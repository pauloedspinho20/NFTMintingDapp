import { useState } from 'react';
import { bool } from 'prop-types';
import classnames from 'classnames';

import { menuLinks } from 'config';

import Link from 'components/Link';

import useRouter from 'hooks/useRouter';

const NavigationItems = ({ expanded }) => {
  const [ isShown, setIsShown ] = useState(expanded);
  const { pathname } = useRouter();

  return menuLinks?.map(
    ({
      label, link, submenu,
    }) => (
      <li key={ label } className={ classnames('nav-item-li', { 'nav-item-has-submenu': submenu }) }>
        { !submenu ? (
          <Link
            className={ classnames('nav-item', {
              'nav-item--current_page': pathname.startsWith(link),
            }) }
            to={ link }
          >
            { label }
          </Link>
        ) : (
          <a
            className="nav-item"
            href="/"
            onClick={ e => e.preventDefault() }
            onMouseEnter={ () => submenu && setIsShown(true) }
            onMouseLeave={ () => submenu && setIsShown(expanded) }
          >
            { label }
          </a>
        ) }
        { isShown && submenu && (
          <ul
            className="nav-item-submenu"
            onMouseEnter={ () => submenu && setIsShown(true) }
            onMouseLeave={ () => submenu && setIsShown(expanded) }
          >
            { submenu.map(item => (
              <li key={ item.label }>
                <Link className="nav-item" to={ item.link }>
                  { item.label }
                </Link>
              </li>
            )) }
          </ul>
        ) }
      </li>
    ),
  );
};

NavigationItems.propTypes = {
  expanded: bool,
};

NavigationItems.defaultProps = {
  expanded: false,
};

export default NavigationItems;
