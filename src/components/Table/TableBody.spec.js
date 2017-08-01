/* global describe it */

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import TableBody from './TableBody';
import styles from './styles.scss';

describe('<TableBody />', () => {
    it('should render a tbody', () => {
        const wrapper = shallow(<TableBody />);
        assert.strictEqual(wrapper.name(), 'tbody');
    });

    it('should render with the user and tableBody classes', () => {
        const wrapper = shallow(<TableBody className="woof" />);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.tableBody), true, 'should have the tableBody class');
    });

    it('should render children', () => {
        const children = <tr className="test" />;
        const wrapper = shallow(
            <TableBody>
                {children}
            </TableBody>,
        );
        assert.strictEqual(wrapper.childAt(0).equals(children), true);
    });
});
