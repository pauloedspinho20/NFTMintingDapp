import { string } from 'prop-types';
import Button from 'components/Button/Button';
import Image from 'components/Image';
import PageContainer from 'components/Page/Container';
import heroImage from './assets/13.gif';

const Landing = ({ name }) => (
  <section className="section--home-hero">
    <PageContainer>
      <div className="hero">
        <div className="row">
          <div className="col-md-4 home-hero--col-2 order-md-2">
            { !!heroImage?.src && (
            <div className="home-hero--img-wrapper">
              <Image className="vert-move" src={ heroImage?.src } alt={ name } />
            </div>
            ) }
          </div>
          <div className="col-md-8 home-hero--col-1 order-md-1">
            <h1 className="home-hero--title">
              <span className="hero-title--line hero-title--line-2">{ name }</span>
            </h1>
            <p className="home-hero--desc">
              <strong>
                Dapp for NFT Collections
              </strong>
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
                <b>Max 3 NFTs per transaction</b>
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
                <b>Minimum amount of ERC20 token for mint</b>
              </li>
              <li>
                <b>Ethereum, Polygon, Binance Smart Chain</b>
                { ' ' }
                or any other EVM chain
              </li>
            </ul>
            <Button
              to="/mint"
              theme="orange"
              size="m"
            >
              Mint now!
            </Button>
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
