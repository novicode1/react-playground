import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import noop from 'lodash/noop';

import { ScrollEmitter } from 'components/common/event-listener';
import { setNonStaticPosition } from 'helpers/dom';

export default class FlyoutPortal extends React.PureComponent {
	root = document.body;

	handleMount = scrollParent => {
		const { onMount } = this.props;
		const mountParent
			= scrollParent === document.documentElement ? document.body : scrollParent;

		setNonStaticPosition(mountParent);
		onMount(mountParent);
	};

	render () {
		const { children, onScroll, className } = this.props;

		return createPortal(
			<ScrollEmitter
				onScroll={onScroll}
				className={className}
				onMount={this.handleMount}
				capture
				passive
			>
				{children}
			</ScrollEmitter>,
			this.root
		);
	}
}

FlyoutPortal.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onMount: PropTypes.func,
	onScroll: PropTypes.func
};

FlyoutPortal.defaultProps = {
	children: null,
	className: undefined,
	onMount: noop,
	onScroll: undefined
};