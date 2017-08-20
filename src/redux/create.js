/* eslint-disable no-underscore-dangle, no-shadow */
import {
    compose,
    createStore,
    combineReducers,
} from 'redux';

import * as reducers from './ducks';

export default function configureStore(preLoadedState = {}) {
    let composeEnhancers = compose;

    if (process.env.NODE_ENV !== 'production') {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    return createStore(
        combineReducers(reducers),
        preLoadedState,
        composeEnhancers(),
    );
}
