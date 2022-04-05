import { string } from 'prop-types';
import Countdown from 'components/Countdown/Countdown';
import Image from 'components/Image';
import PageContainer from 'components/Page/Container';
import heroImage from './assets/13.gif';

const Landing = ({ name }) => (
  <section className="section--home-hero">
    <PageContainer>
      <div className="hero">
        <div className="row">
          <div className="col-md-8 home-hero--col-1">
            <h1 className="home-hero--title">
              <span className="hero-title--line hero-title--line-2">{ name }</span>
            </h1>
            <p className="home-hero--desc">
              <li><strong>Dapp for NFT collections</strong></li>
            </p>
            <ul>
              <li>
                <b>React.js</b>
                { ' ' }
                (Next.js with server side-rendering for SEO)
              </li>
              <li>
                <b>Metamask, Trust Wallet</b>
                { ' ' }
                and
                { ' ' }
                <b>WalletConnect</b>
                { ' ' }
                integrations
              </li>
              <li>
                <b>ERC721 or ERC1155</b>
                { ' ' }
                Non-Fungible Token Smart Contract
              </li>
              <li>
                <b>Whitelist, Pre Sale and Public Sale</b>
                { ' ' }
                with custom token prices
              </li>
              <li>
                <b>Ethereum, Polygon, Binance Smart Chain</b>
                { ' ' }
                or any other EVM chain
              </li>
            </ul>

            <Countdown />
          </div>
          <div className="col-md-4 home-hero--col-2">
            { heroImage?.src ? (
              <Image src={ heroImage?.src } alt={ name } />
            ) : (
              <a href="#collection-mint-widget">Mint</a>
            ) }

          </div>
        </div>
      </div>
    </PageContainer>
  </section>
);

Landing.propTypes = {
  name: string,
};

Landing.defaultProps = {
  name: '',
};

export default Landing;
