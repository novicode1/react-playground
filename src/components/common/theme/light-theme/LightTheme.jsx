import React from 'react';
import PropTypes from 'prop-types';

import Theme from '../theme/Theme';

import './light-theme.css';

export default class LightTheme extends React.PureComponent {
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
				className="light-theme"
			>
				{children}
			</Theme>
		);
	}
}