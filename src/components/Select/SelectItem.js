import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../List/ListItem';

function SelectItem(props) {
    const {
        text,
        selected,
        disabled,
        className: classNameProp,
        ...other
    } = props;

    return (
        <ListItem
            {...other}
            text={text}
            className={classNameProp}
            disabled={disabled}
            selected={selected}
        />
    );
}

SelectItem.defaultProps = {
    text: '',
    className: '',
    selected: false,
    disabled: false,
};

SelectItem.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default SelectItem;
