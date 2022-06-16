import React from 'react';
import PropTypes from 'prop-types';

import Theme from '../theme/Theme';

import './dark-theme.css';

export default class DarkTheme extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: undefined
	};

	render () {
		let {
			children
		} = this.props;

		return (
			<Theme
				className="dark-theme"
			>
				{children}
			</Theme>
		);
	}
}