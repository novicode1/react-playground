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

export default class ToggleFlyout extends React.PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			placement: undefined
		};
		this.flyout = React.createRef();
		this.triggerElem = undefined;
		this.offsetParent = undefined;
		this.triggerBox = { top: 0, left: 0, width: 0, height: 0 };
	}

	// eslint-disable-next-line react/sort-comp
	handleFlyoutMount = mountElem => {
		this.offsetParent = mountElem;
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

		this.hide();
	};
	toggle = event => {
		const { placement } = this.state;
		const { onShow } = this.props;

		if (placement) {
			this.hide();
			return;
		}

		this.triggerElem = event.currentTarget;
		this.setTriggerBox(this.offsetParent);
		this.setState({ placement: this.position });
		onShow();
	};
	componentWillUnmount () {
		this.triggerElem = undefined;
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


	hide () {
		const { onHide } = this.props;

		this.setState({ placement: undefined });
		onHide();
	}

	render () {
		const { children, box, className } = this.props;
		const { placement } = this.state;
		const activated = Boolean(placement);
		const flyoutContentIsPresent = Boolean(box);
		const handleScroll = activated ? this.handleScroll : undefined;

		return (
			<>
				<Mouse onClick={this.toggle}>{children}</Mouse>
				{flyoutContentIsPresent && (
					<FlyoutPortal onMount={this.handleFlyoutMount}>
						<Document onScroll={handleScroll} capture />
						<TransitionGroup component={null}>
							{activated && (
								<Props
									ref={this.flyout}
									className={classnames('flyout', className)}
									style={placement}
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

ToggleFlyout.propTypes = {
	children: PropTypes.node.isRequired,
	box: PropTypes.element,
	className: PropTypes.string,
	onShow: PropTypes.func,
	onHide: PropTypes.func
};

ToggleFlyout.defaultProps = {
	className: '',
	box: null,
	onShow: noop,
	onHide: noop
};