/* global describe it */

import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import { expect, assert } from 'chai';

import Button from './Button';
import styles from './styles.scss';

describe('<Button />', () => {
    const testChildren = <div className="unique">Hello World</div>;

    it('renders children', () => {
        const wrapper = shallow(
            <Button label="Text">{testChildren}</Button>,
        );

        assert.ok(wrapper.contains(testChildren), 'should contain the children');
    });

    it('passes props to the button', () => {
        const props = {
            disabled: false,
            href: 'http://google.com',
            label: 'Hello World',
        };

        const wrapper = shallow(
            <Button {...props}>Button</Button>,
        );

        expect(wrapper.instance().props).to.deep.include(props);
    });

    it('should spread custom props on the root node', () => {
        const wrapper = shallow(<Button label="Text" data-my-prop="woof" />);
        assert.strictEqual(wrapper.prop('data-my-prop'), 'woof', 'custom prop should be woof');
    });

    it('should render with the user and table classes', () => {
        const wrapper = shallow(<Button label="Text" className="woof" />);
        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
        assert.strictEqual(wrapper.hasClass(styles.button), true, 'should have the button class');
    });

    describe('validateLabel', () => {
        const buttonPropTypes = Button.propTypes;

        it('should throw when using wrong label', () => {
            expect(checkPropTypes(buttonPropTypes, { label: undefined }, 'prop', Button.name)).to.equal(
                'Failed prop type: The prop `label` is marked as required in `Button`, but its value is `undefined`.',
            );
        });

        it('should not throw when using a valid label', () => {
            assert.strictEqual(checkPropTypes(buttonPropTypes, { label: 'Text' }, 'prop', Button.name), undefined);
        });
    });
});
