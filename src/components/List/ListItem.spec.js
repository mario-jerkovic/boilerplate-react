/* global describe it */

import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import ListItem from './ListItem';
import styles from './styles.scss';

describe('<ListItem />', () => {
    it('should render a div', () => {
        const wrapper = shallow(<ListItem />);
        assert.strictEqual(wrapper.name(), 'div');
    });

    it('should render with the user and listItem classes', () => {
        const wrapper = shallow(<ListItem className="woof" />);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.listItem), true, 'should have the listItem class');
    });

    it('should render with disabled class', () => {
        const wrapper = shallow(<ListItem disabled={true} />);
        assert.strictEqual(wrapper.hasClass(styles.disabled), true);
    });

    it('should render children', () => {
        const children = <div>Test</div>;
        const wrapper = shallow(
            <ListItem>
                {children}
            </ListItem>,
        );

        assert.strictEqual(wrapper.childAt(0).equals(children), true);
    });

    it('should fire onClick callback', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<ListItem onClick={onClick} />);

        wrapper.simulate('click');

        expect(onClick.calledOnce).to.equal(true);
    });

    it('should not fire onClick callback when disabled', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<ListItem disabled={true} onClick={onClick} />);

        wrapper.simulate('click');

        expect(onClick.calledOnce).to.equal(false);
    });
});
