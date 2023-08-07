import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { IntlProvider } from 'react-intl';
import English from '../src/languages/en.json'
import Spanish from '../src/languages/es.json'
import Telugu from '../src/languages/te.json'

const locale = navigator.language

let lang

switch (locale) {
  case 'te':
    lang = Telugu
    break;
  case 'es':
    lang = Spanish
    break;
  default:
    lang = English
    break;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <IntlProvider locale={locale} messages={lang}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </IntlProvider>
)
