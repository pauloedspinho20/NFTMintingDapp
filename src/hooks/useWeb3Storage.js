import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_API_TOKEN });

const useWeb3Storage = () => ({
  put: async files => client.put(files),

  info: async cid => client.status(cid),

  res: async cid => {
    const res = await client.get(cid); // Promise<Web3Response | null>
    const files = await res.files(); // Promise<Web3File[]>
    return files;
  },
});

export default useWeb3Storage;
