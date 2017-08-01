/* global describe it */

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import Table from './Table';
import styles from './styles.scss';

describe('<Table />', () => {
    it('should render a table', () => {
        const wrapper = shallow(<Table />);
        assert.strictEqual(wrapper.name(), 'table');
    });

    it('should spread custom props on the root node', () => {
        const wrapper = shallow(<Table data-my-prop="woof" />);
        assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
    });

    it('should render with the user and table classes', () => {
        const wrapper = shallow(<Table className="woof" />);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.table), true, 'should have the table class');
    });

    it('should render children', () => {
        const children = <tbody className="test" />;
        const wrapper = shallow(
            <Table>
                {children}
            </Table>,
        );
        assert.strictEqual(wrapper.childAt(0).equals(children), true);
    });
});
