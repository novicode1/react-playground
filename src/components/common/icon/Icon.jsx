import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Svg from '../svg/Svg';
import './icon.css';
import icons from './icons';

export default class Icon extends React.PureComponent {
	static propTypes = {
		name: PropTypes.oneOf(Object.keys(icons)).isRequired,
		className: PropTypes.string,
		fill: PropTypes.string
	};

	static defaultProps = {
		className: '',
		fill: ''
	};

	render () {
		let { name, className, fill } = this.props;
		let src = icons[name];

		return (
			<Svg
				src={src}
				className={classnames('component-icon', className)}
				fill={fill}
			/>
		);
	}
}