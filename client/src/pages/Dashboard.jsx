import React, { Component } from 'react';

import Authorize from '../utils/MyAuth';

import TodoComponent from '../components/TodoComponent';
import DashboardComponent from '../components/DashboardComponent';

export default class Dashboard extends Component {
	state = {
		todos: [],
		errors: [],
		completedTodos: [],
		todoText: '',
		completed: false
	};

	Authorize = new Authorize();

	handleOnSubmit = event => {
		event.preventDefault();

		const option = event.target.elements.text.value.trim();
		const error = this.handleAddTodo(option);
		if (!error) {
			event.target.elements.text.value = '';
		}
		this.setState(prevState => ({ errors: [ ...prevState.errors, error ] }));
	};

	handleOnChange = event => {
		const { value } = event.target;
		this.setState(() => ({ todoText: value }));
	};

	handleGetTodos = () => {
		this.Authorize
			.authFetch('/todos', { method: 'GET' })
			.then(res => res.json())
			.then(todo => {
				let fetchTodos = todo.todos;

				fetchTodos.map(todos => {
					return this.setState(prevState => ({
						todos: [ todos ].concat([ ...prevState.todos ])
					}));
				});
				const filteredTodo = [ ...this.state.todos ].filter(
					todos => todos.completed === true
				);

				filteredTodo.map(todos => {
					return this.setState(prevState => ({
						todos: [ ...prevState.todos ].filter(
							todos => todos.completed !== true
						),
						completedTodos: [ ...this.state.completedTodos, todos ]
					}));
				});
			})
			.catch(err => console.log(err));
	};

	handleAddTodo = option => {
		const mappedTodos = this.state.todos.map(todo => todo.text);
		const mappedCompleteTodos = this.state.completedTodos.map(
			todo => todo.text
		);
		if (!option) {
			return 'please enter an option';
		} else if (
			mappedTodos.indexOf(option) !== -1 ||
			mappedCompleteTodos.indexOf(option) !== -1
		) {
			return `${option} already exists`;
		} else {
			this.Authorize
				.authFetch('/todos', {
					method: 'POST',
					body: JSON.stringify({ text: this.state.todoText })
				})
				.then(res => res.json())
				.then(todo => {
					return this.setState(prevState => ({
						todos: [ todo ].concat([ ...prevState.todos ])
					}));
				})
				.catch(err => console.log(err));
		}
	};

	handleRemoveTodo = id => {
		this.Authorize
			.authFetch(`/todos/${id}`, { method: 'delete' })
			.then(res => res.json())
			.then(data => {
				return this.setState(prevState => ({
					todos: [ ...prevState.todos ].filter(todo => todo._id !== data._id),
					completedTodos: [ ...prevState.completedTodos ].filter(
						todo => todo._id !== data._id
					)
				}));
			})
			.catch(err => console.log(err));
	};

	handleLogOut = () => {
		this.Authorize.logout();
		setTimeout(() => {
			return this.props.history.push('/login');
		}, 250);
	};

	handleRemoveAll = () => {
		this.Authorize
			.authFetch(`/todos/removeAll`, {
				method: 'DELETE'
			})
			.then(res => res.json())
			.then(todo => {
				const todos = todo.todos;
				return this.setState(() => ({ todos, completedTodos: todos }));
			});
	};

	handleCompletedTodos = id => {
		this.Authorize
			.authFetch(`/todos/${id}`, {
				method: 'PATCH',
				body: JSON.stringify({ completed: true })
			})
			.then(res => res.json())
			.then(data => {
				const filteredTodo = [ ...this.state.todos ].filter(
					todo => todo._id === data.todo._id
				);
				filteredTodo.map(todo => {
					return this.setState(prevState => ({
						todos: [ ...this.state.todos ].filter(todo => todo._id !== id),
						completedTodos: [ ...prevState.completedTodos, todo ]
					}));
				});
			})
			.catch(err => console.log(err));
	};

	componentDidUpdate = prevState => {
		if (this.state.errors.length) {
			setTimeout(() => {
				return this.setState(() => ({ errors: [] }));
			}, 2000);
		}
	};

	componentDidMount = () => {
		this.handleGetTodos();
	};

	render() {
		return (
			<div className="App-Layout dashboard">
				<div className="dashboard--left-box">
					<TodoComponent
						errors={this.state.errors}
						todos={this.state.todos}
						todoText={this.state.todoText}
						className={this.state.className}
						completed={this.state.completed}
						handleOnChange={this.handleOnChange}
						handleOnSubmit={this.handleOnSubmit}
						handleAddTodo={this.handleAddTodo}
						handleGetTodos={this.handleGetTodos}
						handleRemoveTodo={this.handleRemoveTodo}
						handleCompletedTodos={this.handleCompletedTodos}
					/>
				</div>
				<div className="dashboard--right-box">
					<DashboardComponent
						handleLogOut={this.handleLogOut}
						handleRemoveAll={this.handleRemoveAll}
						handleRemoveTodo={this.handleRemoveTodo}
						completedTodos={this.state.completedTodos}
					/>
				</div>
			</div>
		);
	}
}
