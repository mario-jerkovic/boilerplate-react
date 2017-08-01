import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from 'gutgemacht-ui/Table';

import styles from './styles.scss';

function ReviewsTable() {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Number of reviews</TableCell>
                        <TableCell>Average review</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>January</TableCell>
                        <TableCell numeric={true}>32</TableCell>
                        <TableCell numeric={true}>4.0</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>February</TableCell>
                        <TableCell numeric={true}>23</TableCell>
                        <TableCell numeric={true}>4.8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>March</TableCell>
                        <TableCell numeric={true}>987</TableCell>
                        <TableCell numeric={true}>4.1</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>April</TableCell>
                        <TableCell numeric={true}>8</TableCell>
                        <TableCell numeric={true}>4.9</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>May</TableCell>
                        <TableCell numeric={true}>645</TableCell>
                        <TableCell numeric={true}>3.8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jun</TableCell>
                        <TableCell numeric={true}>13</TableCell>
                        <TableCell numeric={true}>1.3</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>July</TableCell>
                        <TableCell numeric={true}>45</TableCell>
                        <TableCell numeric={true}>4.5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>August</TableCell>
                        <TableCell numeric={true}>164</TableCell>
                        <TableCell numeric={true}>2.6</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Pagination
                pageStep={2}
                numberOfPages={12}
                className={styles.pagination}
            />
        </div>
    );
}

export default ReviewsTable;
