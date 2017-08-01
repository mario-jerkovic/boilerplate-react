import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

class List extends React.PureComponent {

    static propTypes = {
        value: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
            PropTypes.string,
            PropTypes.number,
        ]),
        children: PropTypes.node,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        value: null,
        children: null,
        className: '',
        containerClassName: '',
        onChange: () => {},
    };

    static isChildSelected(child, props) { // eslint-disable-line class-methods-use-this
        if (child.props.value) {
            return child.props.value === props.value;
        }

        return false;
    }

    componentDidMount() {
        this.setScrollPosition();
    }

    setScrollPosition() {
        if (this.focusedChild >= 0) {
            const listItemHeight = 41;
            const selectedOffSet = (this.focusedChild + 1) * listItemHeight;

            let scrollTop = selectedOffSet - listItemHeight;

            if (scrollTop < listItemHeight) {
                scrollTop = 0;
            }

            ReactDOM.findDOMNode(this).scrollTop = scrollTop; // eslint-disable-line react/no-find-dom-node, max-len
        }
    }

    handleItemClick = (event, index, value) => {
        this.props.onChange(event, index, value);
    };

    renderChildren() {
        const { children } = this.props;

        return React.Children.toArray(children).map((child, index) => {
            if (child.props.disabled) {
                return child;
            }

            const isSelected = List.isChildSelected(child, this.props);

            if (isSelected) {
                this.focusedChild = index;
            }

            return React.cloneElement(child, {
                selected: isSelected,
                onClick: event => this.handleItemClick(event, index, child.props.value),
            });
        });
    }

    render() {
        const {
            className: classNameProp,
            containerClassName: containerClassNameProp,
        } = this.props;

        const className = classNames(styles.list, classNameProp);
        const containerClassName = classNames(
            styles.listItemContainer,
            containerClassNameProp,
        );

        return (
            <div className={className}>
                <div
                    role="menu"
                    className={containerClassName}
                >
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default List;
