import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './styles.scss';

class App extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    static defaultProps = {};

    render() {
        const {
            children,
        } = this.props;

        return (
            <div>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/">Dashboard</Link>
                <br />
                <Link to="/profile">Profile</Link>
                <br />
                <Link to="/reviews">Reviews</Link>
                <br />
                <Link to="/notifications">Notifications</Link>
                <br />
                <Link to="/wrongRoute">Wrong route</Link>
                <div>
                    {children}
                </div>
            </div>
        );
    }
}

export default App;
