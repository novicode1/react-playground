import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'lodash/noop';

import { Props } from 'components/common/control-flow';
import { PointerFlyout, FlyoutLayer } from 'components/common/layout';
import { FlyoutBox } from './flyout-box';

import './tip.css';

let globalTipsIndex = -1;

export default class Tip extends React.PureComponent {
	constructor (props) {
		super(props);
		this.index = ++globalTipsIndex;
	}

	render () {
		const {
			children, title, className, onShow, onHide, delay
		} = this.props;
		const id = `tip-${this.index}`;

		return (
			<FlyoutLayer>
				<PointerFlyout
					delay={delay}
					onShow={onShow}
					onHide={onHide}
					box={
						title && (
							<FlyoutBox id={id} role="tooltip" className="tip">
								{title}
							</FlyoutBox>
						)
					}
				>
					<Props
						aria-describedby={id}
						className={classnames(className, {
							cursorHelp: title
						})}
					>
						{children}
					</Props>
				</PointerFlyout>
			</FlyoutLayer>
		);
	}
}

Tip.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.node,
	className: PropTypes.string,
	onShow: PropTypes.func,
	onHide: PropTypes.func,
	delay: PropTypes.number
};

Tip.defaultProps = {
	className: undefined,
	onShow: noop,
	onHide: noop,
	title: '',
	delay: 200
};