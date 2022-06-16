// eslint-disable-next-line filenames/match-exported
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { LightTheme } from 'components/common/theme';
import { Fade, Expand } from 'components/common/transition';

import './flyout-box.css';

const transitions = {
	enter: 'enter',
	enterActive: 'enter-active',
	exit: 'exit',
	exitActive: 'exit-active'
};

class FlyoutBox extends React.PureComponent {
	constructor (props) {
		super(props);
		this.elementRef = props.innerRef || createRef();
		this.arrowElement = createRef();
		this.elementStartingRect = undefined;
	}

	componentDidMount () {
		this.elementStartingRect = this.elementRect;
		this.updatePlacement();
	}

	componentDidUpdate () {
		this.updatePlacement();
	}

	get elementRect () {
		return this.elementRef.current.getBoundingClientRect();
	}

	get triggerStyle () {
		const { style } = this.props;

		return style;
	}

	/* Расчёт выравнивания по центру */
	get centeredLeft () {
		const { elementRect, triggerStyle } = this;
		const HALF = 2;
		const triggerCenter = (triggerStyle.width || 0) / HALF;
		const elementCenter = elementRect.width / HALF;
		const centerShift = triggerCenter - elementCenter;
		const centeredLeft = triggerStyle.left + centerShift;

		return Math.round(centeredLeft);
	}

	/* Учёт выхода за пределы экрана */
	get viewportLeftShift () {
		const viewportWidth = Math.floor(
			document.documentElement.getBoundingClientRect().width
		);
		const { elementStartingRect, centeredLeft } = this;
		const elementLeft = elementStartingRect.left + centeredLeft;
		const elementRight = elementStartingRect.right + centeredLeft;
		let viewportShift = 0;

		if (elementLeft < 0) {
			viewportShift = Math.ceil(Math.abs(elementLeft));
		}
		else if (elementRight > viewportWidth) {
			viewportShift = Math.floor(viewportWidth - elementRight);
		}
		return viewportShift;
	}

	/* Окончательная позиция с учётом всех сдвигов */
	get left () {
		return this.centeredLeft + this.viewportLeftShift;
	}

	updatePlacement () {
		const flyoutElement = this.elementRef.current;
		const arrowElement = this.arrowElement.current;
		const { viewportLeftShift, left } = this;

		flyoutElement.style.transform = `translateX(${left}px)`;
		arrowElement.style.marginLeft = `${-viewportLeftShift}px`;
	}

	render () {
		const {
			children,
			className,
			id,
			role,
			style,
			onMouseLeave,
			onMouseDown
		} = this.props;
		const { enter, exit, in: transitIn, onExited } = this.props;
		const { top } = style;

		return (

		// <Fade>

			<CSSTransition
				classNames={transitions}
				timeout={250}
				enter={enter}
				exit={exit}
				onExited={onExited}
				in={transitIn}
			>
				<LightTheme>
					{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
					<div
						ref={this.elementRef}
						className={classnames('flyout-box', className)}
						id={id}
						role={role}
						onMouseDown={onMouseDown}
						onMouseLeave={onMouseLeave}
						style={{ top }}
					>
						<div className="container">
							<div ref={this.arrowElement} className="arrow" />
							<div className="content">{children}</div>
						</div>
					</div>
				</LightTheme>
			</CSSTransition>

		);
	}
}

FlyoutBox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	innerRef: PropTypes.shape({}),
	onMouseLeave: PropTypes.func,
	onMouseDown: PropTypes.func,
	id: PropTypes.string,
	role: PropTypes.string,
	style: PropTypes.object,
	enter: PropTypes.bool,
	exit: PropTypes.bool,
	in: PropTypes.bool,
	onExited: PropTypes.func
};

FlyoutBox.defaultProps = {
	children: null,
	className: '',
	innerRef: null,
	onMouseLeave: undefined,
	onMouseDown: undefined,
	id: undefined,
	role: undefined,
	style: {
		left: 0,
		top: 0
	},
	enter: undefined,
	exit: undefined,
	in: undefined,
	onExited: undefined
};

const FlyoutBoxWithRef = React.forwardRef((props, ref) =>
	<FlyoutBox {...props} innerRef={ref} />);

FlyoutBoxWithRef.displayName = 'FlyoutBox';
FlyoutBoxWithRef.propTypes = FlyoutBox.propTypes;
FlyoutBoxWithRef.defaultProps = FlyoutBox.defaultProps;

export default FlyoutBoxWithRef;