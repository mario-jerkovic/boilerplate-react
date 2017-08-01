/* global describe it */

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import TableCell from './TableCell';
import styles from './styles.scss';

describe('<TableCell />', () => {
    const context = { table: {} };

    it('should render a td', () => {
        const wrapper = shallow(<TableCell />, { context });
        assert.strictEqual(wrapper.name(), 'td');
    });

    it('should spread custom props on the root node', () => {
        const wrapper = shallow(<TableCell data-my-prop="woof" />, { context });
        assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
    });

    it('should render children', () => {
        const children = <p className="test">Hello</p>;

        const wrapper = shallow(
            <TableCell>
                {children}
            </TableCell>, { context });

        wrapper.setContext({ ...wrapper.options.context, table: { body: true } });
        assert.strictEqual(wrapper.childAt(0).equals(children), true);
    });

    it('should render a th with the head class when in the context of a table head', () => {
        const wrapper = shallow(<TableCell />, { context });

        wrapper.setContext({ ...wrapper.options.context, table: { head: true } });
        assert.strictEqual(wrapper.name(), 'th');
        assert.strictEqual(wrapper.hasClass(styles.tableHeaderCell), true, 'should have the head class');
    });

    it('should render with the numeric class', () => {
        const wrapper = shallow(<TableCell numeric={true} />, { context });

        wrapper.setContext({ ...wrapper.options.context, table: { body: true } });
        assert.strictEqual(wrapper.hasClass(styles.tableRowCell), true, 'should have the tableRowCell class');
        assert.strictEqual(wrapper.hasClass(styles.numeric), true, 'should have the numeric class');
    });
});
