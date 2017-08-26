/* eslint-disable no-underscore-dangle, global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router';

import configureStore from './redux/create';

const store = configureStore(window.REDUX_STATE);

const MOUNT_NODE = document.createElement('div');

if (document.body) {
    document.body.appendChild(MOUNT_NODE);
}

function render() {
    const routes = require('./routes').default(store);

    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router history={browserHistory}>
                    {routes}
                </Router>
            </Provider>
        </AppContainer>
        , MOUNT_NODE);
}

if (module.hot) {
    module.hot.accept([
        './routes',
    ], () => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            render();
        });
    });
}

render();
