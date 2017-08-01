/* global describe it */

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import Tabs from './Tabs';
import Tab from './Tab';
import styles from './styles.scss';

describe('<Tabs />', () => {
    it('should render with the user classes', () => {
        const wrapper = shallow(<Tabs className="woof" />);

        assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    });

    it('should render with the user tabsContainerClassName', () => {
        const wrapper = shallow(<Tabs tabsContainerClassName="woof" />);

        const container = wrapper.find(`div.${styles.tabsContainer}`);

        assert.strictEqual(container.hasClass('woof'), true, 'should have the "woof" class');
    });

    it('should render with the user contentContainerClassName', () => {
        const wrapper = shallow(<Tabs contentContainerClassName="woof" />);

        const container = wrapper.find(`div.${styles.tabContentContainer}`);

        assert.strictEqual(container.hasClass('woof'), true, 'should have the "woof" class');
    });

    describe('uncontrolled', () => {
        it('should set the right tab active', () => {
            const wrapper = shallow(
                <Tabs>
                    <Tab />
                    <Tab />
                </Tabs>,
            );

            assert.strictEqual(wrapper.state().selectedIndex, 0);
        });
    });

    describe('controlled (prop:value)', () => {
        it('should set the right tab active', () => {
            const wrapper = shallow(
                <Tabs value="2">
                    <Tab value="1" />
                    <Tab value="2" />
                </Tabs>,
            );

            assert.strictEqual(wrapper.state().selectedIndex, 1);
        });

        it('should set the right tab active when the children change', () => {
            const wrapper = shallow(
                <Tabs value="2">
                    <Tab value="1" />
                    <Tab value="2" />
                </Tabs>,
            );

            wrapper.setProps({
                children: [
                    <Tab value="2" />,
                    <Tab value="3" />,
                ],
            });

            assert.strictEqual(wrapper.state().selectedIndex, 0);
        });
    });
});
