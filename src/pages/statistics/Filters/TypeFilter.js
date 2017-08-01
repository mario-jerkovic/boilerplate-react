import React from 'react';
import PropTypes from 'prop-types';
import Button from 'gutgemacht-ui/Button/index';
import OptionsFilters from './OptionsFilters';

import styles from './styles.scss';

class Filter extends React.PureComponent {

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.number,
                label: PropTypes.string,
                options: PropTypes.arrayOf(
                    PropTypes.string,
                ),
            }),
        ).isRequired,
        // onChange: PropTypes.func.isRequired,
    };

    state = {
        selectGroup: 1,
    };

    handleFilterGroupClick = (selectGroup) => {
        this.setState(() => ({ selectGroup }));
    };

    handleFilterApply = () => {
    };

    renderFilterTypes() {
        const {
            selectGroup,
        } = this.state;
        const {
            data,
        } = this.props;

        return data.map(({ key, label }) => (
            <Button
                key={key}
                label={label}
                secondary={selectGroup !== key}
                onClick={() => {
                    this.handleFilterGroupClick(key);
                }}
            />
        ));
    }

    renderFiltersByType() {
        const {
            selectGroup,
        } = this.state;
        const {
            data,
        } = this.props;

        const filterType = data.find(({ key }) => key === selectGroup);

        if (filterType) {
            const { options } = filterType;

            return options.map((optionKey) => {
                const Component = OptionsFilters[optionKey];

                if (Component) {
                    return React.createElement(OptionsFilters[optionKey], {
                        key: `${optionKey}-${selectGroup}`,
                        className: styles.select,
                        onChange: () => {},
                    });
                }

                return null;
            }).filter(component => !!component);
        }

        return null;
    }

    render() {
        return (
            <div>
                <div className={styles.filterTypes}>
                    {this.renderFilterTypes()}
                </div>
                <div className={styles.filterOptions}>
                    {this.renderFiltersByType()}
                </div>
                <div className={styles.filterApply}>
                    <Button
                        primary={true}
                        label="Filter"
                        onClick={this.handleFilterApply}
                    />
                </div>
            </div>
        );
    }
}

export default Filter;
