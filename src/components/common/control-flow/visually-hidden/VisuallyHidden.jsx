import React from 'react';
import PropTypes from 'prop-types';

import './visually-hidden.css';

export default class VisuallyHidden extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node
	};
	static defaultProps = {
		children: PropTypes.node
	};

	render () {
		let { props } = this;
		let { children } = props;

		return <span className="visually-hidden">{children}</span>;
	}
}