import React from 'react';

import Chart from './Chart';
import Table from './Table';

import styles from './styles.scss';

const temp = {
    filterType: 1,
    data: [
        {
            January: [
                {
                    'Clicks on Website-Link': 10,
                    'Clicks on E-mail': 15,
                    'Clicks on phone number': 20,
                    'Forms sent': 25,
                },
            ],
        },
        {
            February: [
                {
                    'Clicks on Website-Link': 123,
                    'Clicks on E-mail': 43,
                    'Clicks on phone number': 765,
                    'Forms sent': 78,
                },
            ],
        },
        {
            March: [
                {
                    'Clicks on Website-Link': 34,
                    'Clicks on E-mail': 789,
                    'Clicks on phone number': 5,
                    'Forms sent': 45,
                },
            ],
        },
        {
            April: [
                {
                    'Clicks on Website-Link': 234,
                    'Clicks on E-mail': 345,
                    'Clicks on phone number': 675,
                    'Forms sent': 123,
                },
            ],
        },
        {
            May: [
                {
                    'Clicks on Website-Link': 234,
                    'Clicks on E-mail': 345,
                    'Clicks on phone number': 675,
                    'Forms sent': 123,
                },
            ],
        },
        {
            Jun: [
                {
                    'Clicks on Website-Link': 34,
                    'Clicks on E-mail': 789,
                    'Clicks on phone number': 5,
                    'Forms sent': 45,
                },
            ],
        },
        {
            July: [
                {
                    'Clicks on Website-Link': 10,
                    'Clicks on E-mail': 15,
                    'Clicks on phone number': 20,
                    'Forms sent': 25,
                },
            ],
        },
        {
            August: [
                {
                    'Clicks on Website-Link': 678,
                    'Clicks on E-mail': 12,
                    'Clicks on phone number': 34,
                    'Forms sent': 41,
                },
            ],
        },
        {
            September: [
                {
                    'Clicks on Website-Link': 57,
                    'Clicks on E-mail': 8,
                    'Clicks on phone number': 45,
                    'Forms sent': 432,
                },
            ],
        },
        {
            October: [
                {
                    'Clicks on Website-Link': 7,
                    'Clicks on E-mail': 7,
                    'Clicks on phone number': 45,
                    'Forms sent': 0,
                },
            ],
        },
        {
            November: [
                {
                    'Clicks on Website-Link': 4,
                    'Clicks on E-mail': 45,
                    'Clicks on phone number': 78,
                    'Forms sent': 678,
                },
            ],
        },
        {
            December: [
                {
                    'Clicks on Website-Link': 10,
                    'Clicks on E-mail': 15,
                    'Clicks on phone number': 20,
                    'Forms sent': 25,
                },
            ],
        },
    ],
};

function extract(iterable = []) {
    const keys = new Set();
    const data = new Map();

    // @TODO: Babel plugin for Object.entries
    iterable.forEach((dataObject) => {
        Object.entries(dataObject).forEach(([dataKey, dataSets]) => {
            dataSets.forEach((dataSet) => {
                Object.entries(dataSet).forEach(([dataSetKey, dataSetValue]) => {
                    keys.add(dataSetKey);

                    if (!data.has(dataKey)) {
                        data.set(dataKey, [dataSetValue]);
                    } else {
                        data.set(dataKey, [
                            ...data.get(dataKey),
                            dataSetValue,
                        ]);
                    }
                });
            });
        });
    });


    return {
        keys: Array.from(keys),
        data: Array.from(data),
    };
}

function Clicks() {
    const { keys, data } = extract(temp.data);

    return (
        <div className={styles.tabPadding}>
            <Chart keys={keys} data={data} />
            <Table keys={keys} data={data} />
        </div>
    );
}

export default Clicks;
