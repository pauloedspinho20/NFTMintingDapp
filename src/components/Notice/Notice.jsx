import { node } from 'prop-types';

import './Notice.scss';

const Notice = ({ children, ...props }) => !!children && (
<div
  className="notice text-center"
  { ...props }
>
  { children }
</div>
);

Notice.propTypes = {
  children: node,
};

Notice.defaultProps = {
  children: null,
};

export default Notice;
