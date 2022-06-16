import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './button.css';
import noop from 'utils/noop';
import { Spinner } from 'components/common/spinner';
import { Icon } from 'components/common/icon';
import { Visible } from 'components/common/control-flow';

export default class Button extends React.PureComponent {
	static propTypes = {
		icon: PropTypes.string,
		href: PropTypes.string,
		link: PropTypes.string,
		children: PropTypes.node,

		loading: PropTypes.bool,
		disabled: PropTypes.bool,
		className: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		icon: undefined,
		href: undefined,
		children: undefined,
		loading: false,
		disabled: false,
		link: undefined,
		className: '',
		onClick: noop
	};

	render () {
		let {
			className,
			icon,
			children,
			href,
			disabled,
			loading,
			onClick,
			link
		} = this.props;

		let Component;

		if (link) {
			Component = Link;
		}
		else if (href) {
			Component = 'a';
		}
		else {
			Component = 'button';
		}

		return (
			<Component
				{...(link || href ? {} : { type: 'button' })}
				disabled={disabled || loading}
				href={disabled || loading ? undefined : href}
				to={disabled || loading ? undefined : link}
				tabIndex={disabled || loading ? '-1' : undefined}
				className={classnames('button', className)}
				onClick={disabled || loading ? noop : onClick}
			>
				<span className={classnames('content', loading ? 'hidden' : undefined)}>
					{children}
					<Visible if={Boolean(icon)}>
						<Icon name={icon} className="icon" />
					</Visible>
				</span>

				<Visible if={loading}>
					<Spinner className="spinner" />
				</Visible>
			</Component>
		);
	}
}