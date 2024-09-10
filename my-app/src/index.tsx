import React from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css";
import App from './App';
// import GlobalContextProvider from './component/Context/global-context';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {Toaster} from 'sonner';
import GlobalContextProvider from './component/context/global-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position = "bottom-right" />
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Provider>
  </React.StrictMode>
);