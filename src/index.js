/* eslint-disable no-underscore-dangle, global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from './views/layout/App';
import configureStore from './redux/create';

const store = configureStore(window.REDUX_STATE);

const MOUNT_NODE = document.createElement('div');

if (document.body) {
    document.body.appendChild(MOUNT_NODE);
}

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>
        , MOUNT_NODE);
}

if (module.hot) {
    module.hot.accept('./views/layout/App/index.js', () => {
        setImmediate(() => {
            render(require('./views/layout/App/index.js').default);
        });
    });
}

render(App);
