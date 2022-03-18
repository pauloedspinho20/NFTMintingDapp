const getNextSuffix = suffix => {
  switch (suffix) {
    case 'b':
      return 't';
    case 'm':
      return 'b';
    case 'k':
      return 'm';
    case '':
      return 'k';
    default:
      return 't';
  }
};

const largeRound = (shortened, suffix = '') => {
  if (suffix === 't') {
    return { shortened, suffix };
  }

  if (!suffix && shortened < 10000) {
    return { shortened, suffix };
  }

  if (shortened < 1000) {
    return { shortened, suffix };
  }

  return largeRound(shortened / 1000, getNextSuffix(suffix));
};

const formatNumber = (number, options) => {
  if (options?.exact) {
    return new Intl.NumberFormat('en', options || {
      maximumSignificantDigits: 18,
    })
      .format(number)
      .replace(/,/g, ' ')
      .replace(/\./g, ',');
  }

  const { shortened, suffix } = largeRound(number);
  if (!suffix) {
    return new Intl.NumberFormat('en', options || {
      maximumSignificantDigits: 8,
    })
      .format(number)
      .replace(/,/g, ' ')
      .replace(/\./g, ',');
  }

  const value = suffix ? Math.round(shortened) : shortened;
  const str = new Intl.NumberFormat('en')
    .format(value)
    .replace(/,/g, ' ')
    .replace(/\./g, ',');

  return `${str} ${suffix}`;
};

export default formatNumber;
