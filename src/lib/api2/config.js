import fetch from 'utils/fetch';

const config = {
  getConfig: () => fetch('config'),
  getMintConfig: () => fetch('staking_configs'),
};

export default config;
