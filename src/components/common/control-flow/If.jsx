import React from 'react';
import PropTypes from 'prop-types';

import { arrify } from 'utils/array';

function isTruethy (value) {
	return Boolean(value);
}
function isFalsy (value) {
	return !value;
}

export default class If extends React.Component {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.func
		]).isRequired,
		true: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.arrayOf(PropTypes.bool)
		]),
		false: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.arrayOf(PropTypes.bool)
		])
	};
	static defaultProps = {
		true: true,
		false: false
	};
	static getDerivedStateFromProps (props) {
		let matchesTruethyConditions = arrify(props.true).every(isTruethy);
		let matchesFalsyConditions = arrify(props.false).some(isFalsy);
		let matchesConditions = matchesTruethyConditions && matchesFalsyConditions;

		return { matchesConditions };
	}
	state = {};
	shouldComponentUpdate (nextProps, nextState) {
		let { children } = this.props;
		let { matchesConditions } = this.state;
		let childrenAreUpdated = children !== nextProps.children;
		let conditionsAreUpdated = matchesConditions !== nextState.matchesConditions;
		let componentShouldUpdate = conditionsAreUpdated || childrenAreUpdated;

		return componentShouldUpdate;
	}
	render () {
		let { matchesConditions } = this.state;
		let { children } = this.props;
		let childrenIsRenderProp = typeof children === 'function';

		if (matchesConditions) {
			return childrenIsRenderProp ? children() : children;
		}
		return null;
	}
}