import { node } from 'prop-types';

const PageTitle = ({ children }) => (
  <h2 className="page-main-title">{ children }</h2>
);

PageTitle.propTypes = {
  children: node,
};

PageTitle.defaultProps = {
  children: null,
};

export default PageTitle;
