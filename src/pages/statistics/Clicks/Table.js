/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from 'gutgemacht-ui/Table';

class ClicksTable extends React.PureComponent {

    static propTypes = {
        keys: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        ).isRequired,
        data: PropTypes.arrayOf(
            PropTypes.array,
        ).isRequired,
    };

    static defaultProps = {};

    renderHeadCells() {
        const { keys } = this.props;

        return keys.map((header, index) => (
            <TableCell key={`header_${header}_${index}`}>{header}</TableCell>
        ));
    }

    renderRowCells() {
        const { data } = this.props;

        return data.map(([rowKey, columnValues], rowIndex) => (
            <TableRow key={`row_${rowKey}_${rowIndex}`}>
                <TableCell>{rowKey}</TableCell>
                {
                    columnValues.map((value, columnIndex) => (
                        <TableCell
                            key={`cell_${rowKey}_${columnIndex}`}
                            numeric={typeof value === 'number'}
                        >
                            {value}
                        </TableCell>
                    ))
                }
            </TableRow>
        ));
    }

    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Something</TableCell>
                            {this.renderHeadCells()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRowCells()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ClicksTable;
