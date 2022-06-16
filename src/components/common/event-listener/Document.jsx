import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Element from './Element';

export default class Document extends PureComponent {
	static getDerivedStateFromProps (props) {
		const {
			onMouseDown, onMouseUp, onMouseMove, onClick, onScroll
		} = props;

		return {
			mousedown: onMouseDown,
			mouseup: onMouseUp,
			mousemove: onMouseMove,
			click: onClick,
			scroll: onScroll
		};
	}

	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		const { capture, passive } = this.props;

		return (
			<Element
				node={document}
				handlers={this.state}
				capture={capture}
				passive={passive}
			/>
		);
	}
}

Document.propTypes = {
	onMouseDown: PropTypes.func,
	onMouseUp: PropTypes.func,
	onMouseMove: PropTypes.func,
	onClick: PropTypes.func,
	onScroll: PropTypes.func,
	capture: PropTypes.bool,
	passive: PropTypes.bool
};

Document.defaultProps = {
	onMouseDown: undefined,
	onMouseUp: undefined,
	onMouseMove: undefined,
	onClick: undefined,
	onScroll: undefined,
	capture: false,
	passive: false
};