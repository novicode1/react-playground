import React from 'react';
import PropTypes from 'prop-types';

import { getReactProps, toSvgDom, fillSvg } from './utils';

const DATA_URI_REGEXP = /^data:image\/svg\+xml,/;

export default class Svg extends React.PureComponent {
	static propTypes = {
		// id: PropTypes.string,
		src: PropTypes.string.isRequired,
		className: PropTypes.string,
		fill: PropTypes.string
	};
	static defaultProps = {
		// id: ''
		className: '',
		fill: 'currentColor'
	};

	static isSvgUrl (url) {
		return DATA_URI_REGEXP.test(url);
	}
	render () {
		let { src, className, fill } = this.props;
		let svgXml = decodeURI(src.replace(DATA_URI_REGEXP, '')).replace(/%23/g, '#');
		let svgDom = toSvgDom(svgXml);
		let coloredSvgDom = fill ? fillSvg(svgDom, fill) : svgDom;
		let svgProps = getReactProps(coloredSvgDom);
		let svgInnerXml = coloredSvgDom.innerHTML;

		return (
			<svg
				{...svgProps}
				className={className}
				aria-hidden="true"
				focusable="false"
				dangerouslySetInnerHTML={{ __html: svgInnerXml }} // eslint-disable-line react/no-danger
			/>
		);
	}
}