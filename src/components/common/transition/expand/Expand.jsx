import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import noop from 'utils/noop';
import Animation from '../Animation';
import './expand.css';

export default class Expand extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		if: Animation.propTypes.if,
		ifNot: Animation.propTypes.ifNot,
		onExpand: PropTypes.func,
		onCollapsed: PropTypes.func
	};
	static defaultProps = {
		children: null,
		className: '',
		if: Animation.defaultProps.if,
		ifNot: Animation.defaultProps.ifNot,
		onExpand: noop,
		onCollapsed: noop
	};
	height = undefined;
	handleEnter = elem => {
		elem.style.maxHeight = 'none';
		this.height = getComputedStyle(elem).height;
		elem.style.maxHeight = '';
		// eslint-disable-next-line babel/no-unused-expressions
		elem.offsetHeight; // force repaint
		this.props.onExpand(elem);
	};
	handleEntering = elem => {
		elem.style.maxHeight = this.height;
	};
	handleEntered = elem => {
		elem.style.maxHeight = '';
	};
	handleExit = elem => {
		elem.style.maxHeight = getComputedStyle(elem).height;
	};
	handleExiting = elem => {
		// eslint-disable-next-line babel/no-unused-expressions
		elem.offsetWidth; // force repaint
		elem.style.maxHeight = '';
	};

	render () {
		let { children, className, onCollapsed	} = this.props;

		return (
			<Animation
				if={this.props.if}
				ifNot={this.props.ifNot}
				className={classnames('expand', className)}
				onEnter={this.handleEnter}
				onEntering={this.handleEntering}
				onEntered={this.handleEntered}
				onExit={this.handleExit}
				onExiting={this.handleExiting}
				onExited={onCollapsed}
			>
				{children}
			</Animation>
		);
	}
}