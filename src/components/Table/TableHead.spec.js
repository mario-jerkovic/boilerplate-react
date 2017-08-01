/* global describe it */

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import TableHead from './TableHead';
import styles from './styles.scss';

describe('<TableHead />', () => {
    it('should render a thead', () => {
        const wrapper = shallow(<TableHead />);
        assert.strictEqual(wrapper.name(), 'thead');
    });

    it('should render with the user and tableHeader classes', () => {
        const wrapper = shallow(<TableHead className="woof" />);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.tableHeader), true, 'should have the tableHeader class');
    });

    it('should render children', () => {
        const children = <tr className="test" />;
        const wrapper = shallow(
            <TableHead>
                {children}
            </TableHead>,
        );
        assert.strictEqual(wrapper.childAt(0).equals(children), true);
    });
});
