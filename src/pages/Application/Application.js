import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';

import styles from './styles.scss';
import Component from '../index';

function Application({ page }) {
    return (
        <div className={styles.container}>
            Application Component
            <br />
            <br />
            <NavLink activeClassName="active" to="/">Dashboard</NavLink>
            <br />
            <NavLink activeClassName="active" to="/profile">Profile</NavLink>
            <br />
            <NavLink activeClassName="active" to="/reviews">Reviews</NavLink>
            <br />
            <NavLink activeClassName="active" to="/notifications">Notifications</NavLink>
            <br />
            <NavLink activeClassName="active" to="/something-wrong">{'URL/route doesn\'t exit'}</NavLink>
            <br />
            <Component page={page} />
        </div>
    );
}

Application.propTypes = {
    page: PropTypes.string.isRequired,
};

function mapStateToProps({ location: { type } }) {
    return {
        page: type,
    };
}

export default connect(mapStateToProps)(Application);
