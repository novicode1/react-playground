import React from 'react';
import PropTypes from 'prop-types';

function isReactWrapper (child) {
	return typeof child.type === 'symbol';
}

function augment (funcTo, funcFrom) {
	const OPTIMIZED_LENGTH = 3;

	if (!funcFrom) return funcTo;

	return funcTo.length <= OPTIMIZED_LENGTH ?
		function (arg1, arg2, arg3) {
			funcTo(arg1, arg2, arg3);
			funcFrom(arg1, arg2, arg3);
		} :
		function (...args) {
			funcTo(...args);
			funcFrom(...args);
		};
}

function mergeProps (to, from) {
	let props = {};

	Object.keys(from).forEach(function (prop) {
		const SPACE = ' ';
		let value = to[prop];

		if (prop === 'className') {
			props[prop] = (value || '')
				.split(SPACE)
				.concat((from[prop] || '').split(SPACE))
				.filter(Boolean)
				.join(SPACE);
		}
		else if (typeof value === 'function') {
			props[prop] = augment(value, from[prop]);
		}
		else {
			props[prop] = from[prop];
		}
	});

	return props;
}

function extendChildrenWithProps (children, props) {
	return React.Children.map(children, function (child) {
		let childIsJsx = React.isValidElement(child);
		let childShouldBeSkipped = isReactWrapper(child);

		if (childIsJsx) {
			let extendedProps = mergeProps(child.props, props);

			if (childShouldBeSkipped) {
				return React.cloneElement(child, {
					children: extendChildrenWithProps(child.props.children, extendedProps)
				});
			}
			return React.cloneElement(child, extendedProps);
		}

		return child;
	});
}

export default class Props extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	};
	render () {
		let { children, ...props } = this.props;

		return extendChildrenWithProps(children, props);
	}
}