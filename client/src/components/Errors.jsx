import React from 'react';
import { Icon25 } from '../utils/SVGComponent';

const Errors = ({ error, key }) => {
	return (
		<div key={key} className="error">
			<Icon25 icon="errorClose" className="error__icon" />
			<div className="error__wrapper">
				<span className="error__title">Error</span>
				<span className="error__message">{error}</span>
			</div>
		</div>
	);
};

export default Errors;
