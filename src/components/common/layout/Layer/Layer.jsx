import React from 'react';
import PropTypes from 'prop-types';

import { Props } from 'components/common/control-flow';

import styles from './layer.css';

export const LAYER_NAME = Object.freeze({
	SIDE_PANEL: 'SidePanel',
	FLYOUT: 'Flyout',
	OVERLAY: 'Overlay',
	NOTIFICATION: 'Notification',
	LOCK: 'Lock',
	CRITICAL: 'Critical'
});

export default class Layer extends React.PureComponent {
	name = '';

	render () {
		const { children } = this.props;
		const { name } = this;

		return <Props className={styles[`layer${name}`]}>{children}</Props>;
	}
}

Layer.propTypes = {
	children: PropTypes.node
};
Layer.defaultProps = {
	children: null
};