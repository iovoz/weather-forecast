import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './redux/createStore';
import IntlWrapper from './IntlWrapper';
import en from './locales/en.json';
import tc from './locales/tc.json';

ReactDOM.render(
    <IntlWrapper store={store} locales={{'en': en, 'tc': tc}}>
        <App />
    </IntlWrapper>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
