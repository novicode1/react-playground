import React from 'react';
import PropTypes from 'prop-types';

export default class Duplicate extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		times: PropTypes.number.isRequired
	};

	render () {
		let { children, times } = this.props;

		return Array.from(new Array(times)).map(function () {
			return children;
		});
	}
}