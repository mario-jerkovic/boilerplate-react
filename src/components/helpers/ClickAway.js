import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const clickAwayEvents = ['mouseup', 'touchend'];

function isDescendant(el, target) {
    if (target !== null) {
        return el === target || isDescendant(el, target.parentNode);
    }
    return false;
}

function setEventsOn(el, type, callback) {
    if (el.addEventListener) {
        el.addEventListener(type, callback);
    } else {
        // IE8+ Support
        el.attachEvent(`on${type}`, () => {
            callback.call(el);
        });
    }
}

function removeEventsFrom(el, type, callback) {
    if (el.removeEventListener) {
        el.removeEventListener(type, callback);
    } else {
        // IE8+ Support
        el.detachEvent(`on${type}`, callback);
    }
}

function bind(callback) {
    clickAwayEvents.forEach(event => setEventsOn(document, event, callback));
}

function unbind(callback) {
    clickAwayEvents.forEach(event => removeEventsFrom(document, event, callback));
}

class ClickAway extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        onClickAway: PropTypes.func,
    };

    static defaultProps = {
        children: null,
        onClickAway: () => {
        },
    };

    componentDidMount() {
        this.isCurrentlyMounted = true;

        if (this.props.onClickAway) {
            bind(this.handleClickAway);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.onClickAway !== this.props.onClickAway) {
            unbind(this.handleClickAway);

            if (this.props.onClickAway) {
                bind(this.handleClickAway);
            }
        }
    }

    componentWillUnmount() {
        this.isCurrentlyMounted = false;

        unbind(this.handleClickAway);
    }


    handleClickAway = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        // IE11 support, which trigger the handleClickAway even after the unbind
        if (this.isCurrentlyMounted) {
            const el = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

            if (document.documentElement.contains(event.target) && !isDescendant(el, event.target)) { // eslint-disable-line max-len
                this.props.onClickAway(event);
            }
        }
    };

    render() {
        return this.props.children;
    }
}

export default ClickAway;
