import React from 'react';

import DelayLink from '../components/DelayLink';
import Button from '../components/Buttons';
import Overlay from '../components/Overlay';

const HomePage = ({
	location,
	setLocation,
	showOverlay,
	changeOverlayState
}) => {
	return (
		<div className="App-Layout homepage">
			<div className="homepage__layout">
				<Overlay showOverlay={showOverlay} location={location} />
				<div className="homepage__card center-block-absolute">
					<h1 className="homepage__title text-gradient">
						What TODO?
					</h1>
					<div className="homepage__text">
						<p className="homepage__description">
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Corrupti fugit et vero dolorum, unde perspiciatis
							suscipit consequuntur dolore exercitationem porro!
						</p>
					</div>
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
				</div>
				<div className="homepage__footer-message">
					<p>Steven Failla &copy; 2018</p>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
