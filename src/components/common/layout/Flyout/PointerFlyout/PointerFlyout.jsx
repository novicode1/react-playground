import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'lodash/noop';
import { TransitionGroup } from 'react-transition-group';

import { Mouse } from 'components/common/event-listener';
import { Props } from 'components/common/control-flow';
import FlyoutPortal from '../FlyoutPortal';

import '../flyout.css';
import './pointer-flyout.css';

export default class PointerFlyout extends React.PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			activated: false,
			placement: undefined
		};
		this.offsetBox = {};
		this.offsetParent = undefined;
		this.timerId = undefined;
		this.pointer = { x: 0, y: 0 };
	}

	componentDidUpdate () {
		const { activated } = this.state;
		const { onShow, onHide } = this.props;

		if (activated) {
			onShow();
		}
		else {
			onHide();
		}
	}

	componentWillUnmount () {
		clearTimeout(this.timerId);
	}

	handleFlyoutMount = mountElem => {
		const mountIsNotInitial = this.timerId !== undefined;

		this.offsetParent = mountElem;

		if (mountIsNotInitial) {
			this.setOffsetBox(mountElem);
			this.setState({ placement: this.position });
		}
	};

	handleMouseEnter = event => {
		const { delay } = this.props;

		this.setPointer(event);
		clearTimeout(this.timerId);
		this.timerId = setTimeout(() => {
			this.setOffsetBox(this.offsetParent);
			this.setState({ activated: true, placement: this.position });
		}, delay);
	};

	handleMouseMove = event => {
		const { activated } = this.state;
		const { box } = this.props;
		const flyoutContentIsPresent = Boolean(box);

		this.setPointer(event);
		if (!flyoutContentIsPresent) return;

		if (activated) {
			this.setState({ placement: this.position });
		}
		else {
			this.handleMouseEnter();
		}
	};

	handleMouseLeave = () => {
		clearTimeout(this.timerId);
		this.setState({ activated: false, placement: undefined });
	};

	setOffsetBox (offsetParent) {
		if (!offsetParent) return;
		this.offsetBox = offsetParent.getBoundingClientRect();
		this.offsetBox.scrollTop = offsetParent.scrollTop;
		this.offsetBox.scrollLeft = offsetParent.scrollLeft;
	}

	setPointer (event) {
		if (!event) return;
		this.pointer.x = event.clientX;
		this.pointer.y = event.clientY;
	}

	get position () {
		const { offsetBox } = this;
		const { x, y } = this.pointer;
		const left = x - offsetBox.left + offsetBox.scrollLeft;
		const top = y - offsetBox.top + offsetBox.scrollTop;

		return { left, top };
	}

	render () {
		const { children, box, className } = this.props;
		const { activated, placement } = this.state;
		const flyoutContentIsPresent = Boolean(box);
		const handleScroll = activated ? this.handleMouseLeave : undefined;

		return (
			<>
				<Mouse
					onEnter={this.handleMouseEnter}
					onLeave={this.handleMouseLeave}
					onMove={this.handleMouseMove}
				>
					{children}
				</Mouse>
				{flyoutContentIsPresent && (
					<FlyoutPortal
						onMount={this.handleFlyoutMount}
						onScroll={handleScroll}
					>
						<TransitionGroup component={null}>
							{activated && (
								<Props
									style={placement}
									className={classnames(
										'flyout',
										'pointer-flyout',
										className
									)}
								>
									{box}
								</Props>
							)}
						</TransitionGroup>
					</FlyoutPortal>
				)}
			</>
		);
	}
}

PointerFlyout.propTypes = {
	children: PropTypes.node.isRequired,
	box: PropTypes.element,
	delay: PropTypes.number,
	className: PropTypes.string,
	onShow: PropTypes.func,
	onHide: PropTypes.func
};

PointerFlyout.defaultProps = {
	className: '',
	box: null,
	delay: 0,
	onShow: noop,
	onHide: noop
};