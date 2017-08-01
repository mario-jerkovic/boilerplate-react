/* eslint-disable no-underscore-dangle, global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const MOUNT_NODE = document.createElement('div');

if (document.body) {
    document.body.appendChild(MOUNT_NODE);
}

function render() {
    const App = require('./pages/statistics').default;

    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>
        , MOUNT_NODE);
}

if (module.hot) {
    module.hot.accept('./pages/statistics', () => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            render();
        });
    });
}

render();
