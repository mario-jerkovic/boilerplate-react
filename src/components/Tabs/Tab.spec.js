/* global describe it */

import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import Tab from './Tab';
import styles from './styles.scss';

describe('<Tab />', () => {
    it('should spread custom props on the root node', () => {
        const wrapper = shallow(<Tab data-my-prop="woof" />);
        assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
    });

    it('should render with the user and tab classes', () => {
        const wrapper = shallow(<Tab className="woof" />);

        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.tab), true, 'should have the tab class');
    });

    it('should render label props as child', () => {
        const label = 'label';
        const wrapper = shallow(<Tab label={label} />);

        assert.strictEqual(wrapper.childAt(0).equals(label), true);
    });

    it('should fire onActive callback', () => {
        const onActive = sinon.spy();

        shallow(<Tab selected={true} onActive={onActive} />);

        expect(onActive.calledOnce).to.equal(true);
    });

    it('should fire onClick callback', () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<Tab onClick={onClick} />);

        wrapper.simulate('click');

        expect(onClick.calledOnce).to.equal(true);
    });
});
