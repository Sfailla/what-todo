import React, { Fragment } from 'react';

const Overlay = ({ showOverlay, location }) => {
	return (
		<Fragment>
			<div className={showOverlay ? 'overlay show' : 'overlay'} />
			<div
				className={
					showOverlay ? 'overlay-message show' : 'overlay-message'
				}
			>
				<h1>{location ? location.toUpperCase() : null}</h1>
			</div>
		</Fragment>
	);
};

export default Overlay;
