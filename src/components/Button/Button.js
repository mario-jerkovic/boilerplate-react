import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

function Button(props) {
    const {
        href,
        label: labelProp,
        className: classNameProp,
        onClick,
        primary,
        secondary,
        disabled,
        children,
        fullWidth,
        ...other
    } = props;

    const className = classNames(styles.button,
        {
            [styles.disabled]: disabled,
            [styles.primary]: !disabled && primary,
            [styles.secondary]: !disabled && secondary,
            [styles.fullWidth]: fullWidth,
        },
        classNameProp);

    const label = (
        <span className={styles.label}>
            {labelProp}
        </span>
    );

    if (href) {
        return (
            <a
                {...other}
                href={href}
                target="_blank"
                className={className}
            >
                {label}
                {children}
            </a>
        );
    }

    return (
        <div // eslint-disable-line jsx-a11y/interactive-supports-focus
            {...other}
            role="button"
            className={className}
            onClick={!disabled ? onClick : undefined}
        >
            {label}
            {children}
        </div>
    );
}

Button.defaultProps = {
    href: '',
    className: '',
    onClick: () => {
    },
    primary: false,
    secondary: false,
    disabled: false,
    children: null,
    fullWidth: false,
};

Button.propTypes = {
    href: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    fullWidth: PropTypes.bool,
};

export default Button;
