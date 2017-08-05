import { combineReducers } from 'redux';

export default function makeRootReducer(asyncReducers) {
    return combineReducers({
        ...asyncReducers,
    });
}
