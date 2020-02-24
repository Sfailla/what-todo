import React from 'react';

import { Link } from 'react-router-dom';

const Button = ({ name, location }) => {
	return (
		<div>
			<Link to={location} className="text__button-wrap">
				<button className="form-button text__button">{name}</button>
			</Link>
		</div>
	);
};

export default Button;
