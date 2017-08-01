/* global describe it */

import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';

import Select from './Select';
import styles from './styles.scss';

describe('<Select />', () => {
    it('should render a div', () => {
        const wrapper = shallow(<Select />);
        assert.strictEqual(wrapper.childAt(0).name(), 'div');
    });

    it('should render with the user and selectField classes', () => {
        const wrapper = shallow(<Select className="woof" />).childAt(0);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.selectField), true, 'should have the selectField class');
    });


    it('should render with disabled class', () => {
        const wrapper = shallow(<Select disabled={true} />).childAt(0);
        assert.strictEqual(wrapper.hasClass(styles.disabled), true, 'should have the disabled class');
    });

    it('should open and render with active class', () => {
        const wrapper = shallow(<Select />);
        const instance = wrapper.instance();
        const handleClick = sinon.spy(instance, 'toggleDropDow');
        instance.forceUpdate();

        wrapper.childAt(0).childAt(0).simulate('click');

        expect(wrapper.state().open).to.equal(true);
        expect(wrapper.childAt(0).hasClass(styles.active)).to.equal(true);
        expect(handleClick.calledOnce).to.equal(true);
    });
});
