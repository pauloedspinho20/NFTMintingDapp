import useBepro from 'hooks/useBepro';
import Notice from './Notice';

const NoticeNetwork = () => {
  const { networkActive, networkWanted } = useBepro();
  return (
    networkWanted && networkActive && networkActive !== 'eth' ? (
      <div className="row">
        <div className="col-12 col-lg-6 mb-30">
          <Notice>
            <div>
              <b>NOT MAINNET! </b>
              { `This app is using ${networkWanted} network.` }
            </div>

            { networkActive === networkWanted ? (
              <small className="mt-2">
                If you need testnet ETH, get it
                { ' ' }
                <a href=" https://rinkebyfaucet.com/" target="_blank">here</a>
                { ' ' }
                or
                { ' ' }
                <a href=" https://faucets.chain.link/rinkeby" target="_blank">here</a>
                .
              </small>
            ) : (
              <div className="mt-2">
                { networkActive !== 'unknown' && `Your wallet is on ${networkActive}.` }
                { `Please select ${networkWanted} network on your wallet.` }
              </div>
            ) }
          </Notice>
        </div>
      </div>
    ) : <></>
  );
};

export default NoticeNetwork;
