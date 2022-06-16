import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { HoverFlyout, FlyoutLayer } from 'components/common/layout';
import { Props } from 'components/common/control-flow';
import { FlyoutBox } from './flyout-box';

import './tooltip.css';

let globalTooltipsIndex = -1;

export default class Tooltip extends React.PureComponent {
	constructor (props) {
		super(props);
		this.index = ++globalTooltipsIndex;
	}

	render () {
		const {
			children,
			description,
			className,
			onShow,
			onHide,
			delay
		} = this.props;
		const id = `tooltip-${this.index}`;

		return (
			<FlyoutLayer>
				<HoverFlyout
					delay={delay}
					onShow={onShow}
					onHide={onHide}
					box={
						description && (
							<FlyoutBox
								id={id}
								role="tooltip"
								className="tooltip"
							>
								{description}
							</FlyoutBox>
						)
					}
				>
					<Props aria-describedby={id} className={className}>{children}</Props>
				</HoverFlyout>
			</FlyoutLayer>
		);
	}
}

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.node,
	className: PropTypes.string,
	onShow: PropTypes.func,
	onHide: PropTypes.func,
	delay: PropTypes.number
};

Tooltip.defaultProps = {
	className: '',
	onShow: noop,
	onHide: noop,
	description: '',
	delay: 0
};