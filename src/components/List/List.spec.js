/* global describe it */

import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import List from './List';
import ListItem from './ListItem';
import styles from './styles.scss';

describe('<List />', () => {
    it('should render a div', () => {
        const wrapper = shallow(<List />);
        assert.strictEqual(wrapper.name(), 'div');
    });

    it('should render with the user and list classes', () => {
        const wrapper = shallow(<List className="woof" />);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.list), true, 'should have the list class');
    });

    it('should render ListItem children', () => {
        const children = [
            <ListItem key={1} disabled={true}>Test</ListItem>,
            <ListItem key={2} disabled={true}>Test1</ListItem>,
            <ListItem key={3} disabled={true}>Test2</ListItem>,
        ];
        const wrapper = shallow(
            <List>
                {children}
            </List>,
        );

        expect(wrapper.childAt(0).contains(children)).to.equal(true);
    });

    it('should fire onChange callback on child click', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(
            <List onChange={onChange}>
                <ListItem>Test</ListItem>
            </List>,
        );

        wrapper.find(ListItem).simulate('click');
        expect(onChange.calledOnce).to.equal(true);
    });

    it('should not fire onChange callback on disabled child', () => {
        const onChange = sinon.spy();
        const wrapper = shallow(
            <List onChange={onChange}>
                <ListItem disabled={true}>Test</ListItem>
            </List>,
        );

        wrapper.find(ListItem).simulate('click');
        expect(onChange.calledOnce).to.equal(false);
    });
});
