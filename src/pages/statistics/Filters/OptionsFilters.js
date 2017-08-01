import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectItem } from 'gutgemacht-ui/Select/index';

function SelectTemplate(props) {
    const onChange = (event, index, value) => {
        props.onChange(value);
    };

    const items = props.items.map(item => (
        <SelectItem
            key={item}
            text={item}
            value={item}
        />
    ));

    return (
        <Select
            value={props.value}
            onChange={onChange}
            labelText={props.label}
            className={props.className}
        >
            {items}
        </Select>
    );
}

SelectTemplate.defaultProps = {
    value: '',
    label: '',
    className: '',
};

SelectTemplate.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
};

function YearSelect(props) {
    const generateYears = (startYear = 1980) => {
        const years = [];
        const currentYear = new Date().getFullYear();

        for (let year = startYear; year <= currentYear; year += 1) {
            years.push(year);
        }

        return years;
    };

    return (
        <SelectTemplate
            {...props}
            items={generateYears(2013)}
            label="Year: "
        />
    );
}


function MonthSelect(props) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <SelectTemplate
            {...props}
            items={months}
            label="Month: "
        />
    );
}


export default {
    year: YearSelect,
    month: MonthSelect,
};
