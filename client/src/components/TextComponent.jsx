import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const TextComponent = ({ title, subtitle, location, button }) => {
	return (
		<div className="text">
			<h1 className="text__title">{title}</h1>
			<div>
				{subtitle.length &&
					subtitle.map((subtitle, index) => {
						return (
							<p key={index} className="text__subtitle">
								{subtitle}
							</p>
						);
					})}
			</div>
			{button ? (
				<Link to={location} className="text__button-wrap">
					<button className="form-button text__button">
						{button}
					</button>
				</Link>
			) : null}
			<p style={{ textAlign: 'center' }}>Steven Failla &copy; 2018</p>
		</div>
	);
};

TextComponent.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.oneOfType([
		PropTypes.array.isRequired,
		PropTypes.string
	]),
	location: PropTypes.string,
	needButton: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string
	]),
	footerMessage: PropTypes.string
};

export default TextComponent;
