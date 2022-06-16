// eslint-disable-next-line filenames/match-exported
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import noop from 'lodash/noop';
import debounce from 'lodash/debounce';

import { findScrollParent } from 'helpers/dom';
import Element from './Element';

const SCROLL_DELAY = 200;

class ScrollEmitter extends React.PureComponent {
	// eslint-disable-next-line lodash-fp/no-extraneous-args
	handleScrollStart = debounce(
		elem => {
			const { onScrollStart } = this.props;

			onScrollStart(elem);
		},
		SCROLL_DELAY,
		{ leading: true, trailing: false }
	);


	// eslint-disable-next-line lodash-fp/no-extraneous-args
	handleScrollEnd = debounce(
		details => {
			const { onScrollEnd } = this.props;

			onScrollEnd(details);
		},
		SCROLL_DELAY,
		{ leading: false, trailing: true }
	);

	constructor (props) {
		super(props);
		this.marker = createRef();
		this.scrollElemRef = props.innerRef || createRef();
		this.state = {
			scrollParent: undefined,
			scrollEmitter: undefined,
			mountParent: undefined
		};
	}

	componentDidMount () {
		const { className, onMount } = this.props;
		const marker = this.marker.current;
		const scrollParent = findScrollParent(marker);
		const scrollEmitter
			= scrollParent === document.documentElement
			|| scrollParent === document.body ?
				document :
				scrollParent;
		const mountParent
			= scrollParent === document.documentElement ? document.body : scrollParent;

		if (className) {
			mountParent.classList.add(className);
		}

		this.scrollElemRef.current = scrollParent;
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({ scrollParent, scrollEmitter, mountParent }, () => {
			onMount(scrollParent);
		});
	}

	componentDidUpdate (prevProps) {
		const { mountParent } = this.state;
		const { className } = this.props;
		const classNameChanged = className !== prevProps.className;

		if (mountParent && classNameChanged) {
			if (prevProps.className) {
				mountParent.classList.remove(prevProps.className);
			}
			if (className) {
				mountParent.classList.add(className);
			}
		}
	}

	componentWillUnmount () {
		const { mountParent } = this.state;
		const { className } = this.props;

		this.handleScrollStart.cancel();
		this.handleScrollEnd.cancel();

		if (mountParent && className) {
			mountParent.classList.remove(className);
		}
	}

	handleScroll = () => {
		const { onScroll, onScrollStart, onScrollEnd } = this.props;
		const { scrollParent } = this.state;

		if (onScroll) {
			onScroll(scrollParent);
		}
		if (onScrollStart) {
			this.handleScrollStart(scrollParent);
		}
		if (onScrollEnd) {
			this.handleScrollEnd(scrollParent);
		}
	};

	render () {
		const {
			children,
			onScroll,
			onScrollStart,
			onScrollEnd,
			capture
		} = this.props;
		const { mountParent, scrollEmitter } = this.state;
		const handleScroll
			= onScroll || onScrollStart || onScrollEnd ? this.handleScroll : undefined;

		if (mountParent) {
			return (
				<>
					<Element
						node={scrollEmitter}
						handlers={{
							scroll: handleScroll
						}}
						capture={capture}
					/>
					{createPortal(children, mountParent)}
				</>
			);
		}

		return <mark ref={this.marker} style={{ display: 'none' }} />;
	}
}

ScrollEmitter.propTypes = {
	children: PropTypes.node,
	onScroll: PropTypes.func,
	onScrollStart: PropTypes.func,
	onScrollEnd: PropTypes.func,
	onMount: PropTypes.func,
	className: PropTypes.string,
	capture: PropTypes.bool,
	innerRef: PropTypes.shape({})
};

ScrollEmitter.defaultProps = {
	children: null,
	onScroll: undefined,
	onScrollStart: undefined,
	onScrollEnd: undefined,
	onMount: noop,
	className: '',
	capture: false,
	innerRef: undefined
};

const ScrollEmitterWithRef = React.forwardRef((props, ref) =>
	<ScrollEmitter {...props} innerRef={ref} />);

ScrollEmitterWithRef.displayName = 'ScrollEmitter';

export default ScrollEmitterWithRef;