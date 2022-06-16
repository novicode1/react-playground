import React, { lazy } from 'react';
import PropTypes from 'prop-types';

import noop from 'utils/noop';

export default class Wait extends React.PureComponent {
	static propTypes = {
		promise: PropTypes.instanceOf(Promise),
		async: PropTypes.func,
		delay: PropTypes.number,
		onDone: PropTypes.func,
		onError: PropTypes.func
	};
	static defaultProps = {
		promise: undefined,
		async: undefined,
		delay: undefined,
		onDone: noop,
		onError (err) { throw err; }
	};
	static timeout (time = 0) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}
	static importify (promise) {
		return promise.then(function () {
			return {	default: Wait.renderEmpty };
		});
	}
	static renderEmpty () {
		return null;
	}
	promise () {
		let { importify } = Wait;
		let { promise, onDone, onError } = this.props;

		return lazy(() => importify(promise.then(onDone).catch(onError)));
	}
	async () {
		let { importify } = Wait;
		let { onDone, onError } = this.props;

		return lazy(() => importify(
			this.props.async()
				.then(onDone)
				.catch(onError)
		));
	}
	delay () {
		let { importify, timeout } = Wait;
		let { delay } = this.props;

		return lazy(() => importify(timeout(delay)));
	}

	render () {
		let { renderEmpty } = Wait;
		let { promise, delay } = this.props;
		let WaitPromise = promise === undefined ? renderEmpty : this.promise();
		let WaitAsync = this.props.async === undefined ? renderEmpty : this.async();
		let WaitDelay = delay === undefined ? renderEmpty : this.delay();

		return (
			<React.Fragment>
				<WaitPromise />
				<WaitAsync />
				<WaitDelay />
			</React.Fragment>
		);
	}
}