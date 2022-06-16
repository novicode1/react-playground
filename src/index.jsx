import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import 'normalize.css';
import './styles/fonts.css';
import './styles/typography.css';
import './styles/variables.css';

import { Index } from './screens';

export default function () {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
				</ul>

				<Switch>
					<Route path="/">
						<Index />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}