import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

function Tab(props) {
    const {
        label,
        className: classNameProp,
        selected,
        onActive,
        ...other
    } = props;
    const className = classNames(styles.tab,
        {
            [styles.selected]: selected,
        },
        classNameProp);

    if (selected) {
        onActive();
    }

    return (
        <div // eslint-disable-line jsx-a11y/interactive-supports-focus
            {...other}
            role="button"
            className={className}
        >
            {label}
        </div>
    );
}

Tab.defaultProps = {
    label: '',
    value: '',
    className: '',
    children: null,
    selected: false,
    onActive: () => {
    },
};

Tab.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    children: PropTypes.node,
    selected: PropTypes.bool,
    onActive: PropTypes.func,
};

export default Tab;
