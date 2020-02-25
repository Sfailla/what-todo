import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DelayLink from '../components/DelayLink';

import Button from '../components/Button';

const HomePage = () => {
	const [ copied, setCopy ] = useState(false);

	const changeCopyState = () => {
		setCopy(true);
		setTimeout(() => setCopy(false), 1500);
	};

	return (
		<div className="App-Layout homepage">
			<div className="homepage__layout">
				<h1 className="homepage__title">What TODO</h1>
				<div
					className={
						copied ? 'homepage__overlay show' : 'homepage__overlay'
					}
				/>
				<div className="homepage__button-wrapper">
					<DelayLink to="/register" delay={1500}>
						<Button
							onClick={() => changeCopyState()}
							name="REGISTER"
							className="button-gradient"
						/>
					</DelayLink>

					<DelayLink to="/login" delay={1500}>
						<Button
							onClick={() => changeCopyState()}
							name="LOGIN"
							className="button-gradient"
						/>
					</DelayLink>
				</div>
				<div className="homepage__footer-message">
					<p>Steven Failla &copy; 2018</p>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
