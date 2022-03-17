import { forwardRef } from 'react';
import { string } from 'prop-types';

import loading from './assets/loading.svg';
import './InTransaction.scss';

const InTransaction = forwardRef(({ label }, ref) => (
  <div
    ref={ ref }
    className="in-transaction"
  >
    <img
      alt={ label }
      className="in-transaction--image"
      src={ loading }
    />

    { label }
  </div>
));

InTransaction.propTypes = {
  label: string,
};

InTransaction.defaultProps = {

  label: 'Loading...',
};

export default InTransaction;
