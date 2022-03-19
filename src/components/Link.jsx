import { node, string } from 'prop-types';
import NextLink from 'next/link';

const Link = ({ children, to, ...props }) => {
  if (/^http(s)?/.test(to)) {
    return (
      <a
        href={ to }
        rel="noopener noreferrer"
        target="_blank"
        { ...props }
      >
        { children }
      </a>
    );
  }

  return (
    <NextLink href={ to }>
      <a { ...props }>
        { children }
      </a>
    </NextLink>
  );
};

Link.propTypes = {
  children: node,
  to: string.isRequired,
};

Link.defaultProps = {
  children: null,
};

export default Link;
