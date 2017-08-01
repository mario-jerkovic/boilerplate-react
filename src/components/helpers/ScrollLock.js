import React from 'react';
import ReactDOM from 'react-dom';

function ScrollLockHOC(ComposedComponent) {
    class ScrollLock extends React.Component {

        componentDidMount() {
            this.containerNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node, max-len

            this.listenToScrollEvents(this.containerNode);
        }

        componentWillUnmount() {
            this.stopListeningToScrollEvents(this.containerNode);
        }

        onWheelHandler = (event) => {
            this.handleEventDelta(event, event.deltaY);
        };

        listenToScrollEvents(element) {
            element.addEventListener('wheel', this.onWheelHandler, false);
        }

        stopListeningToScrollEvents(element) {
            element.removeEventListener('wheel', this.onWheelHandler, false);
        }

        handleEventDelta = (event, delta) => {
            const isDeltaPositive = delta > 0;
            const { scrollTop, scrollHeight, clientHeight } = this.containerNode;

            if (isDeltaPositive && delta > scrollHeight - clientHeight - scrollTop) {
                this.containerNode.scrollTop = scrollHeight;

                event.preventDefault();
            } else if (!isDeltaPositive && -delta > scrollTop) {
                this.containerNode.scrollTop = 0;

                event.preventDefault();
            }
        };

        render() {
            let component = null;

            if (React.isValidElement(ComposedComponent)) {
                component = React.cloneElement(ComposedComponent, {
                    ...this.props,
                });
            } else {
                component = (
                    <ComposedComponent
                        {...this.props}
                    />
                );
            }

            return component;
        }
    }

    return ScrollLock;
}

export default ScrollLockHOC;
