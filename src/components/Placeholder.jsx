import { node } from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

const Placeholder = ({ children, ...props }) => (
  <ReactPlaceholder
    showLoadingAnimation
    type="text"
    rows={ 1 }
    { ...props }
  >
    { children }
  </ReactPlaceholder>
);

Placeholder.propTypes = {
  children: node,
};

Placeholder.defaultProps = {
  children: null,
};

export default Placeholder;
