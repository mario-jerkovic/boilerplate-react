import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectItem } from 'gutgemacht-ui/Select/index';

class CompanyFilter extends React.PureComponent {

    static propTypes = {
        value: PropTypes.number,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                company_id: PropTypes.number,
                name: PropTypes.string,
            }),
        ).isRequired,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        value: null,
    };

    handleChange = (event, index, value) => {
        this.props.onChange(value);
    };

    render() {
        const {
            value,
            data,
        } = this.props;

        return (
            <Select
                value={value}
                labelText="Company: "
                onChange={this.handleChange}
            >
                {data.map(company => ((
                    <SelectItem
                        key={company.company_id}
                        text={company.name}
                        value={company.company_id}
                    />
                )))}
            </Select>
        );
    }
}

export default CompanyFilter;
