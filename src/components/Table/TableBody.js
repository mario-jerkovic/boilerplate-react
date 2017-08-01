import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

class TableBody extends React.PureComponent {

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
            body: true,
        },
    });

    render() {
        const {
            children,
            className: classNameProp,
            ...other
        } = this.props;
        const className = classNames(styles.tableBody, classNameProp);

        return (
            <tbody
                {...other}
                className={className}
            >
                {children}
            </tbody>
        );
    }
}

export default TableBody;
