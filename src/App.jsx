import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import AppWrapper from 'containers/AppWrapper';
import CookiesBanner from 'components/CookiesBanner/CookiesBanner';
import Header from 'containers/Header/Header';
import { getStorage } from 'hooks/useStorage';

// PAGES
import HomePage from 'pages/home';
import MintPage from 'pages/mint';
import CollectionPage from 'pages/collection';
import FourOhFour from 'pages/404';
import Maintenance from 'pages/maintenance';
import Privacy from 'pages/privacy-policy';
import Terms from 'pages/terms-conditions';

import { maintenance, maintenanceToken } from './config';
import history from './history';

function App() {
  // Maintenance Token
  const storage = getStorage(false);
  const queryParams = new URLSearchParams(window.location.search);
  const queryKey = queryParams.get('token');
  if (queryKey) {
    storage.set('maintenanceToken', queryKey);
  }

  const token = window && storage.get('maintenanceToken');
  const skipMaintenance = maintenanceToken === token;

  return (
    <BrowserRouter history={ history }>
      { maintenance && !skipMaintenance && (
        <Maintenance />
      ) }

      { (!maintenance || skipMaintenance) && (
      <HelmetProvider>
        <CookiesBanner />
        <AppWrapper>
          <Header />
          <main id="main-content">
            <Switch>
              <Route exact path="/" component={ HomePage } />
              <Route path="/mint" component={ MintPage } />
              <Route path="/collection" component={ CollectionPage } />
              <Route path="/privacy-policy" component={ Privacy } />
              <Route path="/terms-conditions" component={ Terms } />
              <Route component={ FourOhFour } status={ 404 } />
            </Switch>
          </main>
        </AppWrapper>
      </HelmetProvider>
      ) }
    </BrowserRouter>
  );
}

export default App;
