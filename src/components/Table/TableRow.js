import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

function TableRow(props, context) {
    const {
        children,
        className: classNameProp,
        ...other
    } = props;
    const { table } = context;

    const className = classNames(
        {
            [styles.tableRow]: table && table.body,
            [styles.tableHead]: table && table.head,
        },
        classNameProp);

    return (
        <tr
            {...other}
            className={className}
        >
            {children}
        </tr>
    );
}

TableRow.defaultProps = {
    className: '',
    children: null,
};

TableRow.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

TableRow.contextTypes = {
    table: PropTypes.object.isRequired,
};

export default TableRow;
