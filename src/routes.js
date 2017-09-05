import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './views/layouts/App';
import Login from './views/pages/Login';
import Dashboard from './views/pages/Dashboard';
import Profile from './views/pages/Profile';
import Reviews from './views/pages/Reviews';
import Notifications from './views/pages/Notifications';
import NotFound from './views/pages/NotFound';

export default () => {
    const requireLogin = (nextState, replace, cb) => {
        cb();
        // function checkAuth() {
        //     const { auth: { user } } = store.getState();
        //     if (!user) {
        //         // oops, not logged in, so can't be here!
        //         replace('/');
        //     }
        //     cb();
        // }

        // if (!isAuthLoaded(store.getState())) {
        //     store.dispatch(loadAuth()).then(checkAuth);
        // } else {
        //     checkAuth();
        // }
    };

    /**
     * Keep routes in alphabetical order
     */
    return (
        <Route path="/" component={App}>
            {/* Home (main) route */}
            <IndexRoute component={Dashboard} />

            {/* Routes requiring login */}
            <Route onEnter={requireLogin} />

            {/* Routes */}
            <Route path="login" component={Login} />
            <Route path="notifications" component={Notifications} />
            <Route path="profile" component={Profile} />
            <Route path="reviews" component={Reviews} />

            {/* Catch all route */}
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
