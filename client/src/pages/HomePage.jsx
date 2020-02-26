import React from 'react';

import DelayLink from '../components/DelayLink';
import Button from '../components/Button';
import Overlay from '../components/Overlay';

const HomePage = ({
	showOverlay,
	location,
	setLocation,
	changeOverlayState
}) => {
	return (
		<div className="App-Layout homepage">
			<div className="homepage__layout">
				<h1 className="homepage__title">What TODO</h1>
				<Overlay showOverlay={showOverlay} location={location} />
				<div className="homepage__button-wrapper">
					<DelayLink to="/register" delay={1499}>
						<Button
							onClick={() => {
								setLocation('REGISTER');
								changeOverlayState();
							}}
							name="REGISTER"
							className="button-gradient"
						/>
					</DelayLink>

					<DelayLink to="/login" delay={1500}>
						<Button
							onClick={() => {
								setLocation('LOGIN');
								changeOverlayState();
							}}
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
