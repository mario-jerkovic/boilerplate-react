/* global describe it */

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import TableRow from './TableRow';
import styles from './styles.scss';

describe('<TableRow />', () => {
    const context = { table: {} };

    it('should render a tr', () => {
        const wrapper = shallow(<TableRow />, { context });
        assert.strictEqual(wrapper.name(), 'tr');
    });

    it('should spread custom props on the root node', () => {
        const wrapper = shallow(<TableRow data-my-prop="woof" />, { context });
        assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
    });

    it('should render with the user and tableRow classes', () => {
        const wrapper = shallow(<TableRow className="woof" />, { context });
        wrapper.setContext({ ...wrapper.options.context, table: { body: true } });

        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.tableRow), true, 'should have the tableRow class');
    });

    it('should render children', () => {
        const children = <td className="test" />;
        const wrapper = shallow(
            <TableRow>
                {children}
            </TableRow>,
            { context });

        assert.strictEqual(wrapper.childAt(0).equals(children), true);
    });

    it('should render with the head class when in the context of a table head', () => {
        const wrapper = shallow(<TableRow />, { context });
        wrapper.setContext({ ...wrapper.options.context, table: { head: true } });

        assert.strictEqual(wrapper.hasClass(styles.tableHead), true, 'should have the head class');
    });
});
