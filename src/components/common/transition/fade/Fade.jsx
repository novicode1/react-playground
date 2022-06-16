import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import noop from 'utils/noop';
import Animation from '../Animation';
import './fade.css';

export default class Fade extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		if: Animation.propTypes.if,
		ifNot: Animation.propTypes.ifNot,
		onIn: PropTypes.func,
		onOut: PropTypes.func
	};
	static defaultProps = {
		children: null,
		className: '',
		if: Animation.defaultProps.if,
		ifNot: Animation.defaultProps.ifNot,
		onIn: noop,
		onOut: noop
	};
	render () {
		let { children, className, onIn, onOut	} = this.props;

		return (
			<Animation
				if={this.props.if}
				ifNot={this.props.ifNot}
				className={classnames('fade', className)}
				onEnter={onIn}
				onExited={onOut}
			>
				{children}
			</Animation>
		);
	}
}