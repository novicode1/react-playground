import React from 'react';

import If from './If';

export default class Hidden extends React.PureComponent {
	static propTypes = {
		children: If.propTypes.children,
		if: If.propTypes.false,
		ifNot: If.propTypes.true
	};
	static defaultProps = {
		children: If.defaultProps.children,
		if: If.defaultProps.false,
		ifNot: If.defaultProps.true
	};

	render () {
		let { props } = this;
		let { children } = props;

		return <If true={props.ifNot} false={props.if}>{children}</If>;
	}
}