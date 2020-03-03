import React, { Component } from 'react';

import authorize from '../utils/MyAuth';
import TodoComponent from '../components/TodoComponent';
import { Icon25 } from '../utils/SVGComponent';

export default class Dashboard extends Component {
	state = {
		todos: [],
		errors: [],
		completedTodos: [],
		todoText: '',
		completed: false
	};

	handleOnSubmit = event => {
		event.preventDefault();

		const option = event.target.elements.text.value.trim();
		const error = this.handleAddTodo(option);
		if (!error) {
			event.target.elements.text.value = '';
		}
		this.setState(prevState => ({
			errors: [ ...prevState.errors, error ]
		}));
	};

	handleOnChange = event => {
		const { value } = event.target;
		this.setState(() => ({ todoText: value }));
	};

	handleGetTodos = () => {
		authorize
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
			authorize
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
		authorize
			.authFetch(`/todos/${id}`, { method: 'delete' })
			.then(res => res.json())
			.then(data => {
				return this.setState(prevState => ({
					todos: [ ...prevState.todos ].filter(
						todo => todo._id !== data._id
					),
					completedTodos: [ ...prevState.completedTodos ].filter(
						todo => todo._id !== data._id
					)
				}));
			})
			.catch(err => console.log(err));
	};

	handleLogOut = () => {
		authorize.logout();
		setTimeout(() => {
			return this.props.history.push('/');
		}, 250);
	};

	handleRemoveAll = () => {
		authorize
			.authFetch(`/todos/removeAll`, {
				method: 'DELETE'
			})
			.then(res => res.json())
			.then(todo => {
				const todos = todo.todos;
				return this.setState(() => ({
					todos,
					completedTodos: todos
				}));
			});
	};

	handleCompletedTodos = id => {
		authorize
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
						todos: [ ...this.state.todos ].filter(
							todo => todo._id !== id
						),
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
				<div className="dashboard__todo-wrapper">
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
					<div className="dash__upper-container">
						<button
							className="circle-button dash__button--logout"
							onClick={() => this.handleLogOut()}
						>
							<Icon25 icon="logout" className="logout" />
						</button>
						<button
							className="square-button dash__button--remove-all"
							onClick={() => this.handleRemoveAll()}
						>
							REMOVE ALL
						</button>
					</div>
					<div className="dashboard__text-wrapper">
						<h1 className="dashboard__title">Todo Component</h1>
					</div>
					{/* <DashboardComponent
						handleLogOut={this.handleLogOut}
						handleRemoveAll={this.handleRemoveAll}
						handleRemoveTodo={this.handleRemoveTodo}
						completedTodos={this.state.completedTodos}
					/> */}
				</div>
			</div>
		);
	}
}
