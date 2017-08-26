/* eslint-disable no-underscore-dangle, no-shadow */
import {
    compose,
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './modules';

export default function configureStore(preLoadedState = {}) {
    const enhancers = [];
    const middleware = [thunkMiddleware];
    let composeEnhancers = compose;

    if (process.env.NODE_ENV !== 'production') {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    return createStore(
        combineReducers(reducers),
        preLoadedState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers,
        ),
    );
}
