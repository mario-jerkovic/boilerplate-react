/* eslint-disable no-underscore-dangle, no-shadow */
import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';
import { connectRoutes } from 'redux-first-router';

import routesMap from './routesMap';
import makeRootReducer from './reducers';

function configureStore(history, preLoadedState = {}) {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);

    let composeEnhancers = compose;

    if (process.env.NODE_ENV !== 'production') {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    return createStore(
        makeRootReducer({ location: reducer }),
        preLoadedState,
        composeEnhancers(
            enhancer,
            applyMiddleware(middleware),
        ),
    );
}

export default configureStore;
