import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Import Bootstrap's CSS.
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);