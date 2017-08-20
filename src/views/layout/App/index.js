import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import routes from '../../../routes';

import './styles.scss';

function App() {
    return (
        <div>
            <NavLink to="/">Dashboard</NavLink>
            <br />
            <NavLink to="/user/profile">Profile</NavLink>
            <br />
            <NavLink to="/user/reviews">Reviews</NavLink>
            <br />
            <NavLink to="/user/notifications">Notifications</NavLink>
            <br />
            {routes.map(route => (
                <Route key={route.path} {...route} />
            ))}
        </div>
    );
}

export default App;
