import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import List from '../List/List';
import ClickAway from '../helpers/ClickAway';
import ScrollLock from '../helpers/ScrollLock';
import styles from './styles.scss';

class Select extends React.Component {

    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        children: PropTypes.node,
        className: PropTypes.string,
        labelText: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        value: null,
        children: null,
        className: '',
        labelText: '',
        disabled: false,
        onChange: () => {
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.disabled !== nextProps.disabled && nextProps.disabled) {
            this.closeDropDown();
        }
    }

    handleChange = (event, index, value) => {
        this.closeDropDown(event, () => {
            this.props.onChange(event, index, value);
        });
    };

    openDropDown = (event, callback) => {
        const { open } = this.state;

        if (!open) {
            this.setState({ open: true }, callback);
        }
    };

    closeDropDown = (event, callback) => {
        const { open } = this.state;

        if (open) {
            this.setState({ open: false }, callback);
        }
    };

    toggleDropDow = (event) => {
        const { open } = this.state;

        if (open) {
            this.closeDropDown(event);
        } else {
            this.openDropDown(event);
        }
    };

    renderSelectItems() {
        const { open } = this.state;
        const { children, value } = this.props;

        if (!open) {
            return null;
        }

        return React.createElement(
            ScrollLock(
                <List
                    value={value}
                    onChange={this.handleChange}
                    className={styles.selectList}
                >
                    {children}
                </List>,
            ),
        );
    }

    render() {
        const { open } = this.state;
        const {
            value,
            labelText,
            children,
            disabled,
            className: classNameProp,
        } = this.props;

        const iconClassName = classNames('icon_arrow_down', styles.icon);
        const className = classNames(styles.selectField,
            {
                [styles.active]: open,
                [styles.disabled]: disabled,
            },
            classNameProp);

        let displayValue = '';

        React.Children.toArray(children).find((child) => {
            if (!child.props.disabled && child.props.value && child.props.value === value) {
                displayValue = child.props.text || '';

                return true;
            }

            return false;
        });

        return (
            <ClickAway onClickAway={!disabled ? this.closeDropDown : undefined}>
                <div className={className}>
                    <div
                        role="button"
                        tabIndex={0}
                        className={styles.selectControl}
                        onClick={!disabled ? this.toggleDropDow : undefined}
                    >
                        <div className={styles.text}>
                            {`${labelText}${displayValue}`}
                        </div>
                        <div className={iconClassName} />
                    </div>
                    {this.renderSelectItems()}
                </div>
            </ClickAway>
        );
    }
}

export default Select;
