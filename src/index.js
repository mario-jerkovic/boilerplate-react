/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const MOUNT_NODE = document.createElement('div');

if (document.body) {
    document.body.appendChild(MOUNT_NODE);
}

function render() {
    const App = require('./pages/App').default;

    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>
        , MOUNT_NODE);
}

if (module.hot) {
    module.hot.accept('./pages/App', () => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            render();
        });
    });
}

render();
