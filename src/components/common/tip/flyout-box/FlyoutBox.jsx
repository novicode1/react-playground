// eslint-disable-next-line filenames/match-exported
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { LightTheme } from 'components/common/theme';
import { Fade } from 'components/common/transition';

import './flyout-box.css';

class FlyoutBox extends React.PureComponent {
	constructor (props) {
		super(props);
		this.elementRef = props.innerRef || createRef();
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

	/* Учёт выхода за пределы экрана */
	get viewportShift () {
		const { style } = this.props;
		const { left, top } = style;
		const { elementStartingRect } = this;
		const viewportBox = document.documentElement.getBoundingClientRect();
		const viewportWidth = Math.floor(viewportBox.width);
		const viewportHeight = Math.floor(viewportBox.height);
		const elementLeft = elementStartingRect.left + left;
		const elementRight = elementStartingRect.right + left;
		const elementBottom = elementStartingRect.bottom + top;
		const viewportShift = {
			left: 0,
			top: 0
		};

		if (elementLeft < 0) {
			viewportShift.left = Math.ceil(Math.abs(elementLeft));
		}
		else if (elementRight > viewportWidth) {
			viewportShift.left = Math.floor(viewportWidth - elementRight);
		}
		if (elementBottom > viewportHeight) {
			viewportShift.top = -elementStartingRect.height;
		}
		return viewportShift;
	}

	/* Окончательная позиция с учётом всех сдвигов */
	get position () {
		const { style } = this.props;
		const { viewportShift } = this;

		return {
			left: style.left + viewportShift.left,
			top: style.top + viewportShift.top
		};
	}

	updatePlacement () {
		const flyoutElement = this.elementRef.current;
		const { position } = this;
		const { style } = this.props;

		flyoutElement.style.transform = `translateX(${position.left}px) translateY(${position.top}px)`;

		if (position.top === style.top) {
			flyoutElement.classList.remove('top');
		}
		else {
			flyoutElement.classList.add('top');
		}
	}

	render () {
		const {
			children, className, id, role, onMouseLeave
		} = this.props;
		const { enter, exit, in: transitIn, onExited } = this.props;

		return (
			<Fade enter={enter} exit={exit} onExited={onExited} in={transitIn}>
				<div
					ref={this.elementRef}
					className={classnames('flyout-box', className)}
					id={id}
					role={role}
					onMouseLeave={onMouseLeave}
				>
					<LightTheme>
						<div className="container">
							<div className="content">{children}</div>
						</div>
					</LightTheme>
				</div>
			</Fade>
		);
	}
}

FlyoutBox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	innerRef: PropTypes.shape({}),
	onMouseLeave: PropTypes.func,
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