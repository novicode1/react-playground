import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { Props } from 'components/common/control-flow';
import noop from 'utils/noop';
import { arrify } from 'utils/array';

export default class Animation extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string.isRequired,
		if: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.arrayOf(PropTypes.bool)
		]),
		ifNot: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.arrayOf(PropTypes.bool)
		]),
		onEnter: PropTypes.func,
		onEntering: PropTypes.func,
		onEntered: PropTypes.func,
		onExit: PropTypes.func,
		onExiting: PropTypes.func,
		onExited: PropTypes.func
	};
	static defaultProps = {
		if: [],
		ifNot: [],
		onEnter: noop,
		onEntering: noop,
		onEntered: noop,
		onExit: noop,
		onExiting: noop,
		onExited: noop
	};
	static getDerivedStateFromProps (props) {
		return {
			if: arrify(props.if),
			ifNot: arrify(props.ifNot)
		};
	}
	static handleAnimationEnd (element, done) {
		element.addEventListener('transitionend', done, false);
		element.addEventListener('transitioncancel', done, false);
	}
	state = {};
	render () {
		const CLASS_SEPARATOR = ' ';
		let { handleAnimationEnd } = Animation;
		let {
			children, className, onEnter, onEntering, onEntered, onExit, onExiting, onExited
		} = this.props;
		let { state } = this;
		let [transitionName] = className.split(CLASS_SEPARATOR);
		let matchesTruethyConditions = state.if.every(Boolean);
		let matchesFalsyConditions = !state.ifNot.some(Boolean);
		let shown = matchesTruethyConditions && matchesFalsyConditions;

		return (
			<CSSTransition
				in={shown}
				addEndListener={handleAnimationEnd}
				classNames={transitionName}
				enter
				exit
				mountOnEnter
				unmountOnExit
				appear
				onEnter={onEnter}
				onEntering={onEntering}
				onEntered={onEntered}
				onExit={onExit}
				onExiting={onExiting}
				onExited={onExited}
			>
				<Props className={className}>
					{children}
				</Props>
			</CSSTransition>
		);
	}
}