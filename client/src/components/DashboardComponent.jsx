import React from 'react';

import { Icon25, Icon50 } from '../utils/SVGComponent';
import CompleteTodo from './CompleteTodo';

const DashboardComponent = props => (
	<div className="dash__wrapper">
		<div className="dash__header">
			<div className="dash__title-container">
				<h1 className="Form-Type dash__title">Dashboard</h1>
			</div>
			<span className="dash__svg-span--user">
				<Icon50 icon="user" className="user" />
			</span>
			<p className="dash__subtitle">what would you like to do?</p>
		</div>
		<div className="dash__container">
			<div className="dash__upper-container">
				<button
					className="circle-button dash__button--logout"
					onClick={() => props.handleLogOut()}
				>
					<Icon25 icon="logout" className="logout" />
				</button>
				<button
					className="square-button dash__button--remove-all"
					onClick={() => props.handleRemoveAll()}
				>
					REMOVE ALL
				</button>
			</div>
			<div className="dash__lower-container">
				<div className="completed">
					<h3 className="Form-Type">completed</h3>
				</div>
				<div className="completed__results">
					{!props.completedTodos.length ? (
						<h4 className="Form-Type completed__no-todo">
							No Todos Completed Yet
						</h4>
					) : (
						props.completedTodos.map(todo => {
							return (
								<CompleteTodo
									key={todo._id}
									todoID={todo._id}
									todoText={todo.text}
									handleRemoveTodo={props.handleRemoveTodo}
								/>
							);
						})
					)}
				</div>
			</div>
		</div>
	</div>
);

export default DashboardComponent;
