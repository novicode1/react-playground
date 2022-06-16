import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'lodash/noop';
import { TransitionGroup } from 'react-transition-group';

import { Mouse, Document } from 'components/common/event-listener';
import { Props } from 'components/common/control-flow';
import { getVisibleClientRectInParent } from 'helpers/dom';
import FlyoutPortal from './FlyoutPortal';

import './flyout.css';

export default class HoverFlyout extends React.PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			activated: false,
			placement: undefined
		};
		this.flyout = React.createRef();
		this.triggerElem = undefined;
		this.offsetParent = undefined;
		this.timerId = undefined;
		this.triggerBox = { top: 0, left: 0, width: 0, height: 0 };
	}

	// eslint-disable-next-line react/sort-comp
	handleMouseEnter = event => {
		const { delay } = this.props;

		this.triggerElem = event.currentTarget;
		clearTimeout(this.timerId);
		this.timerId = setTimeout(() => {
			this.setTriggerBox(this.offsetParent);
			this.setState({ activated: true, placement: this.position });
		}, delay);
	};
	handleMouseMove = event => {
		const { activated } = this.state;
		const { box } = this.props;
		const flyoutContentIsPresent = Boolean(box);

		if (!flyoutContentIsPresent) return;
		if (activated) return;

		this.handleMouseEnter(event);
	};
	handleMouseLeave = event => {
		const hoveredFlyout
			= event
			&& this.flyout.current instanceof HTMLElement
			&& event.relatedTarget instanceof HTMLElement
			&& this.flyout.current.contains(event.relatedTarget);
		const hoveredTriggerFromFlyout
			= event && event.relatedTarget === this.triggerElem;

		if (hoveredFlyout || hoveredTriggerFromFlyout) return;
		clearTimeout(this.timerId);
		this.triggerElem = undefined;
		this.setState({ activated: false, placement: undefined });
	};
	handleScroll = event => {
		const element = event.target;
		const scrollIsOnRoot
			= element === document
			|| element === document.documentElement
			|| element === document.body;

		if (scrollIsOnRoot) return;

		const scrollIsInFlyout
			= this.flyout.current instanceof HTMLElement
			&& this.flyout.current.contains(element);

		if (scrollIsInFlyout) return;

		this.handleMouseLeave();
	};
	handleFlyoutMount = mountElem => {
		const mountIsNotInitial = this.timerId !== undefined;

		this.offsetParent = mountElem;
		if (mountIsNotInitial) {
			this.setTriggerBox(mountElem);
			this.setState({ placement: this.position });
		}
	};
	componentWillUnmount () {
		clearTimeout(this.timerId);
		this.triggerElem = undefined;
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


	setTriggerBox (offsetParent) {
		if (!offsetParent) return;

		this.triggerBox = getVisibleClientRectInParent(
			this.triggerElem,
			offsetParent
		);
	}

	get position () {
		const { triggerBox } = this;
		const { width, height, left, bottom } = triggerBox;

		return {
			left,
			top: bottom, // under the trigger element
			width,
			height
		};
	}

	render () {
		const { children, box, className } = this.props;
		const { activated, placement } = this.state;
		const flyoutContentIsPresent = Boolean(box);
		const handleScroll = activated ? this.handleScroll : undefined;

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
					<FlyoutPortal onMount={this.handleFlyoutMount}>
						<Document onScroll={handleScroll} capture />
						<TransitionGroup component={null}>
							{activated && (
								<Props
									ref={this.flyout}
									style={placement}
									className={classnames('flyout', className)}
									onMouseLeave={this.handleMouseLeave}
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

HoverFlyout.propTypes = {
	children: PropTypes.node.isRequired,
	box: PropTypes.element,
	delay: PropTypes.number,
	className: PropTypes.string,
	onShow: PropTypes.func,
	onHide: PropTypes.func
};

HoverFlyout.defaultProps = {
	className: '',
	box: null,
	delay: 0,
	onShow: noop,
	onHide: noop
};