import Numbers from '@taikai/dappkit/dist/src/utils/numbers';

// @TODO avoid having to connect wallet just to get the decimals
const decimals = 18;

const numberFromDecimals = (value, options) => {
  if (!value) {
    return 0;
  }

  const number = Number(Numbers.fromDecimals(value, decimals));

  return options?.round ? Math.round(number) : number;
};

export default numberFromDecimals;
