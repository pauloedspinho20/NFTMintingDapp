const updateApi = async () => {
  try {
    console.log('updateApi');
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

updateApi();

const useApi = () => {
  console.log('useApi');
};

export default useApi;
