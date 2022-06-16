import React from 'react';

import If from './If';

export default class Visible extends React.PureComponent {
	static propTypes = {
		children: If.propTypes.children,
		if: If.propTypes.true,
		ifNot: If.propTypes.false
	};
	static defaultProps = {
		children: If.defaultProps.children,
		if: If.defaultProps.true,
		ifNot: If.defaultProps.false
	};
	render () {
		let { props } = this;
		let { children } = props;

		return <If true={props.if} false={props.ifNot}>{children}</If>;
	}
}