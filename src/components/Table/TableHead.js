import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';


class TableHead extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    };

    static defaultProps = {
        className: '',
        children: null,
    };

    static childContextTypes = {
        table: PropTypes.object,
    };

    getChildContext = () => ({
        table: {
            head: true,
        },
    });

    render() {
        const {
            children,
            className: classNameProp,
            ...other
        } = this.props;
        const className = classNames(styles.tableHeader, classNameProp);

        return (
            <thead
                {...other}
                className={className}
            >
                {children}
            </thead>
        );
    }
}

export default TableHead;
