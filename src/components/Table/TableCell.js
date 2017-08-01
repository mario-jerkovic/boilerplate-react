import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

function TableCell(props, context) {
    const {
        numeric,
        children,
        className: classNameProp,
        ...other
    } = props;
    const { table } = context;

    const className = classNames(
        {
            [styles.tableRowCell]: table && table.body,
            [styles.tableHeaderCell]: table && table.head,
            [styles.numeric]: numeric,
        },
        classNameProp);

    const Component = table && table.head ? 'th' : 'td';

    return (
        <Component
            {...other}
            className={className}
        >
            {children}
        </Component>
    );
}

TableCell.defaultProps = {
    className: '',
    numeric: false,
    children: null,
};

TableCell.propTypes = {
    className: PropTypes.string,
    numeric: PropTypes.bool,
    children: PropTypes.node,
};

TableCell.contextTypes = {
    table: PropTypes.object.isRequired,
};

export default TableCell;
