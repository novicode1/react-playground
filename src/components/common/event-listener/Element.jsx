import { PureComponent } from 'react';
import entries from 'lodash/entries';
import PropTypes from 'prop-types';

const passiveEventSupported = (function () {
	let supported = false;
	const options = Object.defineProperty({}, 'passive', {
		get () {
			supported = true;
			return supported;
		}
	});

	try {
		window.addEventListener('testpassive', null, options);
	}
	finally {
		window.removeEventListener('testpassive', null, options);
	}
	return supported;
}());

export default class Element extends PureComponent {
	componentDidMount () {
		const { listenersArguments } = this;
		const { node } = this.props;

		listenersArguments.forEach(({ eventType, callback }) => {
			this.addListener(node, eventType, callback);
		});
	}

	componentDidUpdate (prevProps) {
		const { handlers, node } = this.props;
		const { handlers: prevHandlers, node: prevNode } = prevProps;

		Object.entries(handlers)
			.map(([eventType, callback]) => {
				const { [eventType]: prevCallback } = prevHandlers;

				return { eventType, callback, prevCallback };
			})
			.filter(({ callback, prevCallback }) => {
				const callbackHasChanged = callback !== prevCallback; const nodeHasChanged = node !== prevNode;

				return callbackHasChanged || nodeHasChanged;
			})
			.forEach(({ eventType, callback, prevCallback }) => {
				this.removeListener(prevNode, eventType, prevCallback); this.addListener(node, eventType, callback);
			});
	}

	componentWillUnmount () {
		const { listenersArguments } = this;
		const { node } = this.props;

		listenersArguments.forEach(({ eventType, callback }) => {
			this.removeListener(node, eventType, callback);
		});
	}

	get listenerOptions () {
		const { passive, capture } = this.props;

		if (passive && passiveEventSupported) {
			return { passive, capture };
		}
		return capture;
	}

	get listenersArguments () {
		const { handlers } = this.props;

		return entries(handlers).map(([eventType, callback]) => ({
			eventType,
			callback
		}));
	}

	addListener (element, eventType, callback) {
		const { listenerOptions } = this;

		if (element && callback) {
			element.addEventListener(eventType, callback, listenerOptions);
		}
	}

	removeListener (element, eventType, callback) {
		const { listenerOptions } = this;

		if (element && callback) {
			element.removeEventListener(eventType, callback, listenerOptions);
		}
	}

	render () {
		return null;
	}
}

Element.propTypes = {
	node: PropTypes.oneOfType([
		PropTypes.instanceOf(window.Element),
		PropTypes.oneOf([window, document])
	]),
	handlers: PropTypes.objectOf(PropTypes.func),
	capture: PropTypes.bool,
	passive: PropTypes.bool
};

Element.defaultProps = {
	node: undefined,
	handlers: {},
	capture: false,
	passive: false
};