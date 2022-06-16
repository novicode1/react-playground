// eslint-disable-next-line filenames/match-exported
import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';

import { Props } from 'components/common/control-flow';

class Mouse extends React.PureComponent {
	holdTimerId = undefined;

	handleMouseDown = event => {
		const HOLD_DELAY = 300;
		const HOLD_INTERVAL = 90;
		const LEFT_BUTTON = 0;
		const { onPress, setInterval, setTimeout, onDown } = this.props;
		const mouseButtonIsLeft = event.button === LEFT_BUTTON;

		if (onPress && mouseButtonIsLeft) {
			this.holdTimerId = setTimeout(() => {
				this.holdTimerId = setInterval(() => onPress(event), HOLD_INTERVAL);
			}, HOLD_DELAY);

			onPress(event);
		}
		if (onDown) {
			onDown(event);
		}
	};

	handleMouseUp = event => {
		const { clearInterval, onUp } = this.props;

		clearInterval(this.holdTimerId);

		if (onUp) {
			onUp(event);
		}
	};

	handleLeave = event => {
		const { clearInterval, onLeave } = this.props;

		clearInterval(this.holdTimerId);

		if (onLeave) {
			onLeave(event);
		}
	};

	render () {
		const {
			className,
			children,
			onEnter,
			onLeave,
			onMove,
			onClick,
			onDoubleClick,
			onUp,
			onDown,
			onPress
		} = this.props;

		const mouseEvents = {
			onMouseEnter: onEnter,
			onMouseLeave: onLeave || onPress ? this.handleLeave : undefined,
			onMouseMove: onMove,
			onClick,
			onDoubleClick,
			onMouseDown: onDown || onPress ? this.handleMouseDown : undefined,
			onMouseUp: onUp || onPress ? this.handleMouseUp : undefined
		};

		return (
			<Props className={className} {...mouseEvents}>
				{children}
			</Props>
		);
	}
}

Mouse.propTypes = {
	className: PropTypes.string,
	setInterval: PropTypes.func.isRequired,
	setTimeout: PropTypes.func.isRequired,
	clearInterval: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	onEnter: PropTypes.func,
	onLeave: PropTypes.func,
	onMove: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onDown: PropTypes.func,
	onUp: PropTypes.func,
	onPress: PropTypes.func

	// onClickOutside: PropTypes.func,
	// onSelect: PropTypes.func
};

Mouse.defaultProps = {
	className: undefined,
	onEnter: undefined,
	onLeave: undefined,
	onMove: undefined,
	onClick: undefined,
	onDoubleClick: undefined,
	onDown: undefined,
	onUp: undefined,
	onPress: undefined

	// onClickOutside: undefined,
	// onSelect: undefined
};

// eslint-disable-next-line babel/new-cap
const MouseWithTimeout = ReactTimeout(Mouse);

MouseWithTimeout.displayName = 'Mouse';

export default MouseWithTimeout;