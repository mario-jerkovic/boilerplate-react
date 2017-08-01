import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

class Tabs extends React.PureComponent {

    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        className: PropTypes.string,
        tabsContainerClassName: PropTypes.string,
        contentContainerClassName: PropTypes.string,
        children: PropTypes.node,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        value: null,
        children: null,
        className: '',
        tabsContainerClassName: '',
        contentContainerClassName: '',
        onChange: () => {
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
        };
    }

    componentWillMount() {
        this.setState({
            selectedIndex: this.getSelectedIndex(this.props),
        });
    }

    componentWillReceiveProps(props) {
        if (props.value !== null && props.value !== undefined) {
            this.setState({
                selectedIndex: this.getSelectedIndex(props),
            });
        }
    }

    getSelectedIndex(props) { // eslint-disable-line class-methods-use-this
        const { children, value } = props;
        let selectedIndex = 0;

        React.Children.forEach(children, (child, index) => {
            if (value === child.props.value) {
                selectedIndex = index;
            }
        });

        return selectedIndex;
    }

    isTabSelected(tabValue, tabIndex) {
        if (this.props.value) {
            return this.props.value === tabValue;
        }

        return this.state.selectedIndex === tabIndex;
    }

    handleTabClick(tabValue, tabIndex, event) {
        event.stopPropagation();

        let selectedIndex = this.state.selectedIndex;

        if (this.props.value && this.props.value !== tabValue) {
            selectedIndex = tabIndex;
        } else if (!this.props.value) {
            selectedIndex = tabIndex;
        }

        if (this.state.selectedIndex !== selectedIndex) {
            this.props.onChange(event, tabIndex, tabValue);
        }

        this.setState({ selectedIndex });
    }

    renderTabs() {
        const { children } = this.props;

        return React.Children.map(children, (child, index) => (
            React.cloneElement(child, {
                onClick: this.handleTabClick.bind(this, child.props.value, index),
                selected: this.isTabSelected(child.props.value, index),
            })
        ));
    }

    renderTabContent() {
        const { children } = this.props;
        const { selectedIndex } = this.state;

        const foundChild = React.Children.toArray(children).find(({ props }, index) => (
            index === selectedIndex
        ));

        if (foundChild) {
            return foundChild.props.children;
        }

        return null;
    }

    render() {
        const {
            className: classNameProp,
            tabsContainerClassName,
            contentContainerClassName,
        } = this.props;

        const className = classNames(classNameProp);
        const tabsClassName = classNames(styles.tabsContainer, tabsContainerClassName);
        const contentClassName = classNames(styles.tabContentContainer, contentContainerClassName);
        return (
            <div className={className}>
                <div className={tabsClassName}>
                    {this.renderTabs()}
                </div>
                <div className={contentClassName}>
                    {this.renderTabContent()}
                </div>
            </div>
        );
    }
}

export default Tabs;
