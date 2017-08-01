/* eslint-disable no-bitwise, no-plusplus */

import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import styles from './styles.scss';

function hashCode(str) {
    let hash = 5381;
    let i = str.length;

    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }

    /**
     * JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift.
     */
    return hash >>> 0;
}

function intoHex(hash) {
    return (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
}

function string2RGBA(string, opacity = 100) {
    const hex = intoHex(hashCode(string));

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const a = opacity / 100;

    return `rgba(${r},${g},${b},${a})`;
}

class Chart extends React.PureComponent {

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

    static defaultDataSetOptions = {
        fill: false,
        lineTension: 0.2,
        borderWidth: 2,
        borderDashOffset: 0.0,
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointHitRadius: 10,
        pointHoverBorderWidth: 2,
    };

    render() {
        const labels = [];
        const datasets = [];

        const { keys, data } = this.props;

        labels.push(...data.map(([dataKey]) => (
            dataKey
        )));

        datasets.push(...keys.map((key, index) => (
            Object.assign({}, Chart.defaultDataSetOptions, {
                label: key,
                borderColor: string2RGBA(key),
                backgroundColor: string2RGBA(key, 40),
                data: data.map(([dataKey, values]) => ( // eslint-disable-line no-unused-vars
                    values[index]
                )),
            })
        )));

        return (
            <div className={styles.chartContainer}>
                <Line data={{ labels, datasets }} />
            </div>
        );
    }
}

export default Chart;
