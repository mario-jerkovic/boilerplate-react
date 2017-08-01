/* eslint-disable max-len */
import React from 'react';
import { Tabs, Tab } from 'gutgemacht-ui/Tabs';

import { CompanyFilter, TypeFilter } from './Filters';
import Overviews from './Overviews';
import Clicks from './Clicks';
import Reviews from './Reviews';

import styles from './styles.scss';

class StatisticTabsContainer extends React.PureComponent {

    state = {
        userCompanies: [],
        filterTypes: [],

        selectedCompany: null,
    };

    handleCompanyChange = (selectedCompany) => {
        this.setState(() => ({ selectedCompany }));
    };

    handleFilterTypeChange = () => {

    };

    render() {
        const {
            userCompanies,
            filterTypes,
            selectedCompany,
        } = this.state;

        return (
            <div>
                <div className={styles.filtersContainer}>
                    <CompanyFilter
                        data={userCompanies}
                        value={selectedCompany}
                        onChange={this.handleCompanyChange}
                    />
                    <TypeFilter
                        data={filterTypes}
                        onChange={this.handleFilterTypeChange}
                    />
                </div>
                <Tabs>
                    <Tab label="Overviews">
                        <Overviews />
                    </Tab>
                    <Tab label="Clicks">
                        <Clicks />
                    </Tab>
                    <Tab label="Reviews">
                        <Reviews />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default StatisticTabsContainer;
