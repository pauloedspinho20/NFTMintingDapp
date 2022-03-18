import { node } from 'prop-types';

import './Notice.scss';

const Notice = ({ children, ...props }) => {
  console.log('notice');
  return !!children && (
    <div
      className="notice"
      { ...props }
    >
      { children }
    </div>
  );
};

Notice.propTypes = {
  children: node,
};

Notice.defaultProps = {
  children: null,
};

export default Notice;
