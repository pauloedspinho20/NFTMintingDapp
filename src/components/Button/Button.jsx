import {
  bool, func, node, oneOf, string,
} from 'prop-types';
import classnames from 'classnames';
import Link from 'components/Link';

const Button = ({
  children,
  className,
  external,
  onClick,
  size,
  sizeMin,
  theme,
  to,
  type,
  ...props
}) => {
  const classes = classnames('btn', className, {
    [`btn--size-${size}`]: size,
    [`btn--size-min-${sizeMin}`]: sizeMin,
    [`btn--bg-${theme}`]: theme,
    [`btn--${type}`]: type,
  });

  if (!to) {
    return (
      <button
        className={ classes }
        onClick={ onClick }
        type="button"
        { ...props }
      >
        { children }
      </button>
    );
  }

  if (external) {
    return (
      <a
        className={ classes }
        href={ to }
        onClick={ onClick }
        rel="noopener noreferrer"
        target="_blank"
        { ...props }
      >
        { children }
      </a>
    );
  }

  return (
    <Link
      className={ classes }
      onClick={ onClick }
      to={ to }
      { ...props }
    >
      { children }
    </Link>
  );
};

Button.propTypes = {
  children: node,
  className: string,
  external: bool,
  onClick: func,
  size: oneOf([ 'xxs', 'xs', 's', 'm', 'l', 'xl' ]),
  sizeMin: oneOf([ 100, 110, 120, 150, 200 ]),
  theme: oneOf([
    '',
    'blue-white-gradient',
    'green',
    'blue',
    'blue-gradient',
    'metamask-gradient',
    'none',
    'outline-red',
    'outline-white',
    'outline-green',
    'purple',
    'purple-gradient',
    'trustwallet-gradient',
    'white',
    'white-gradient',
    'orange',
    'orange-gradient',
    'yellow',
    'yellow-gradient',
    'walletconnect-gradient',
  ]),
  to: string,
  type: oneOf([ 'fill', 'outline' ]),
};

Button.defaultProps = {
  children: null,
  className: '',
  external: false,
  onClick: null,
  size: 'm',
  sizeMin: null,
  theme: '',
  to: '',
  type: 'fill',
};

export default Button;
