import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginForm from '../components/Login-Form';
import TextComponent from '../components/TextComponent';
import Authorize from '../utils/MyAuth';

export default class LoginPage extends Component {
	static defaultProps = {
		subtitle: [
			'-This is the login page for the Todo App, in this app you will be able to create, update, read, or delete todos from a list. enjoy!!',
			'-If you are logged in the dashboard button will be enabled and you can click it to get back to dashboard'
		]
	};

	state = {
		email: '',
		password: '',
		success: [],
		errors: []
	};

	Authorize = new Authorize();

	handleOnSubmit = event => {
		event.preventDefault();

		const { login, setToken } = this.Authorize;
		const { email, password } = this.state;

		if (email && password) {
			login(email, password)
				.then(res => {
					console.log(res);
					if (res.status >= 400 || res.status > 350) {
						let error = 'invalid credentials';
						this.setState(() => ({ errors: [ ...this.state.errors, error ] }));
						this.props.history.push('/login');
					} else if (res.status >= 200 && res.status <= 350) {
						return res.json();
					}
				})
				.then(data => {
					try {
						const token = data.tokens[0].token;
						if (token) {
							setToken(token);
							setTimeout(() => {
								this.props.history.push('/dashboard');
							}, 300);
						} else {
							this.props.history.push('/login');
						}
					} catch (error) {
						console.log(error);
						this.props.history.push('/login');
					}
				})
				.catch(err => {
					if (err) throw err;
				});
		} else {
			let error = 'Please fill out the form';
			this.setState(prevState => ({ errors: [ ...prevState.errors, error ] }));
		}
	};

	handleOnChange = event => {
		const { name, value } = event.target;
		this.setState(() => ({ [name]: value }));
	};

	componentDidUpdate = prevState => {
		if (this.state.errors.length > 0) {
			setTimeout(() => {
				return this.setState(() => ({ errors: [] }));
			}, 1500);
		}
	};

	render() {
		return (
			<div className="App-Layout login">
				<div className="login--left-box">
					<TextComponent
						title="LOGIN PAGE"
						subtitle={this.props.subtitle}
						needButton={false}
						footerMessage="...You're almost there. Login to get started!"
					/>
				</div>
				<div className="login--right-box">
					<h2 className="Form-Type">Enter email and password to login</h2>
					<a href="/dashboard" className="login__link">
						<button className="login__dashboard-button" disabled={!this.Authorize.isLoggedIn()}>
							Dashboard
						</button>
					</a>
					{this.state.errors.length ? (
						this.state.errors.map(error => {
							return console.error(error);
						})
					) : null}
					<LoginForm
						email={this.state.email}
						password={this.state.password}
						errors={this.state.errors}
						redirectTo={this.state.redirectTo}
						handleOnSubmit={this.handleOnSubmit}
						handleOnChange={this.handleOnChange}
					/>
					<p style={{ textAlign: 'center' }}>
						Are you registered? if not click <Link to="/">here</Link>
					</p>
				</div>
			</div>
		);
	}
}
