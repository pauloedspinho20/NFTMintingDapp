/* eslint-disable max-len, react/no-unescaped-entities */

import AppWrapper from 'containers/AppWrapper';
import PageContainer from 'components/Page/Container';
import MintCanvas from 'components/Canvas/MintCanvas';

const Canvas = () => (
  <AppWrapper>
    <PageContainer>
      <div className="row">
        <h2 className="page-main-title">Canvas</h2>
        <span className="page-main-subtitle">Upload to IPFS</span>
      </div>
    </PageContainer>
    <PageContainer>
      <div className="row">
        <div className="col">
          <MintCanvas />
        </div>
      </div>
    </PageContainer>
  </AppWrapper>
);

export default Canvas;
