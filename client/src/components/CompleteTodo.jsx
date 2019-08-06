import React from 'react';

import { Icon25 } from '../utils/SVGComponent';

const CompleteTodo = ({ todoText, todoID, handleRemoveTodo }) => {
	return (
		<div className="completed__div">
			<h4 className="Form-Type completed__todo">{todoText}</h4>
			<button
				className="completed__button-trash"
				onClick={() => handleRemoveTodo(todoID)}
			>
				<Icon25 icon="trash" />
			</button>
		</div>
	);
};
export default CompleteTodo;
