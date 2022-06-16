import React from 'react';

import { LightTheme } from 'components/common/theme';
import { Icon } from 'components/common/icon';
import { Button } from 'components/common/button';
import { Fade } from 'components/common/transition';
import { Tooltip } from 'components/common/tooltip';
import { Tip } from 'components/common/tip';

import './index.css';

export default class Index extends React.PureComponent {
	render () {
		return (
			<LightTheme>
				<section className="spotlight-section">
					<Fade>
						<h1>Spotlight</h1>
					</Fade>

					<Icon className="spotlight-icon" name="arrow-down" />

					<Button loading icon="arrow-down">Loading</Button>
					<Button disabled icon="arrow-down">Disabled</Button>
					<Button href="https://google.com/" icon="arrow-down">Href</Button>
					<Button link="/">Link</Button>

					<hr />

					<Tooltip description={<span>Hi everyone</span>}>
						<span>Toltip</span>
					</Tooltip>
					<hr />

					<Tip title="Hi everyone">
						<span>Tip ewdqw dq d wd d d qqw d dqw d123 e 21e12 </span>
					</Tip>
				</section>
			</LightTheme>
		);
	}
}