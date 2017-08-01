import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

function ListItem(props) {
    const {
        text,
        selected,
        disabled,
        children,
        onClick,
        className: classNameProp,
        ...other
    } = props;

    const className = classNames(styles.listItem,
        {
            [styles.disabled]: disabled,
            [styles.selected]: !disabled && selected,
        },
        classNameProp);

    return (
        <div
            {...other}
            role="menuitem"
            tabIndex={0}
            onClick={!disabled ? onClick : undefined}
            className={className}
        >
            {text || children}
        </div>
    );
}

ListItem.defaultProps = {
    text: '',
    className: '',
    selected: false,
    disabled: false,
    children: null,
    onClick: () => {},
};

ListItem.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default ListItem;
