import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

class Table extends React.PureComponent {

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
        table: {},
    });

    render() {
        const {
            children,
            className: classNameProp,
            ...other
        } = this.props;
        const className = classNames(styles.table, classNameProp);

        return (
            <table
                {...other}
                className={className}
            >
                {children}
            </table>
        );
    }
}

export default Table;
