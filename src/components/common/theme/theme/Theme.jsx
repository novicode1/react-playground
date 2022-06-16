import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Props } from 'components/common/control-flow';
import './theme.css';

export default class Theme extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string
	};

	static defaultProps = {
		children: undefined,
		className: ''
	};

	render () {
		let {
			children,
			className
		} = this.props;

		return (
			<Props
				className={classnames('theme', className)}
			>
				{children}
			</Props>
		);
	}
}