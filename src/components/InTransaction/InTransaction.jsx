import { forwardRef } from 'react';
import { string } from 'prop-types';
import Image from 'next/image';
import loading from './assets/loading.svg';

const InTransaction = forwardRef(({ label }, ref) => (
  <div
    ref={ ref }
    className="in-transaction"
  >
    <Image
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
  label: '',
};

export default InTransaction;
