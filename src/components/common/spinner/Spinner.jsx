import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { VisuallyHidden } from 'components/common/control-flow';
import './spinner.css';

export default class Spinner extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object
	};
	static defaultProps = {
		className: '',
		style: {}
	};
	render () {
		let { className, style } = this.props;

		return (
			<div className={classnames('spinner', className)} style={style}>
				<div className="circle">
					<VisuallyHidden>
						Loading…
					</VisuallyHidden>
				</div>
			</div>
		);
	}
}