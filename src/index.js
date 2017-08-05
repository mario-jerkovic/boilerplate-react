/* eslint-disable no-underscore-dangle, global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store';
import Application from './pages/Application';

const store = configureStore(createHistory(), window.REDUX_STATE);

const MOUNT_NODE = document.createElement('div');

if (document.body) {
    document.body.appendChild(MOUNT_NODE);
}

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>
        , MOUNT_NODE);
}

if (module.hot) {
    module.hot.accept('./pages/Application', () => {
        setImmediate(() => {
            const App = require('./pages/Application').default;
            render(App);
        });
    });
}

render(Application);

