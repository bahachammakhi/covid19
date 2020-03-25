import React, { Suspense } from 'react';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
const RootContainer = React.lazy(() => import('./containers/RootContainer/RootContainer'));
//mybe add persist later
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div className={'loadingtitle'}>Loading</div>}>
          <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
            <Route path="/" component={RootContainer} />
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
