import { useCallback } from 'react';

const useIpfs = () => {
  const ipfsUrl = process.env.NEXT_PUBLIC_IPFS_URL;

  return useCallback(url => url?.replace(/^ipfs:\/\/ipfs\//, ipfsUrl), [ ipfsUrl ]);
};

export default useIpfs;
