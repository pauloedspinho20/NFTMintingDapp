import {
  bool, number, oneOf, shape,
} from 'prop-types';

import formatNumber from 'utils/formatNumber';

const Price = ({
  eth, dollar, options, output, showLabel,
}) => {
  const bnbInDollar = 6; // TODO: coingecko api

  const vDollar = Number(dollar || 0);
  const vEth = Number(eth || 0);

  if (output === 'bnb') {
    return (
      <>
        { formatNumber(vEth || (vDollar) / bnbInDollar, {
          maximumFractionDigits: 2,
          ...options,
        }) }
        { showLabel && ' BNB' }
      </>
    );
  }

  if (output === 'eth') {
    return (
      <>
        { formatNumber(vEth || (vDollar) / bnbInDollar, {
          maximumFractionDigits: 2,
          ...options,
        }) }
        { showLabel && ' ETH' }
      </>
    );
  }

  const value = formatNumber(vDollar || vEth * bnbInDollar, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...options,
  });

  return (
    <>
      { `$${value}` }
      { ' ' }
      { showLabel && 'USD' }
    </>
  );
};

Price.propTypes = {
  eth: number,
  dollar: number,
  options: shape({}),
  output: oneOf([ 'eth', 'dollar' ]),
  showLabel: bool,
};

Price.defaultProps = {
  eth: 0,
  dollar: 0,
  options: null,
  output: 'dollar',
  showLabel: false,
};

export default Price;
