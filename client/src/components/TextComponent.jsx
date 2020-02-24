import React from 'react';
import PropTypes from 'prop-types';

const TextComponent = ({ text }) => {
	return (
		<div className="text">
			<p className="text__message">{text}</p>
		</div>
	);
};

TextComponent.propTypes = {
	text: PropTypes.string
};

export default TextComponent;
