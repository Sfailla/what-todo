import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';

// import TextComponent from '../components/TextComponent';
{
	/* <TextComponent text="This is a todo app that displays an express backend api and authentication using web tokens" />
			<TextComponent text="to get started just register and then you will have access to the todo app" />
			<TextComponent text="if you already registered than just click on the button below to login and go straight to the app" /> */
}

const HomePage = () => (
	<div className="App-Layout homepage">
		<div className="homepage__layout">
			<h1 className="homepage__title">What TODO</h1>
			<div className="homepage__button-wrapper">
				<Link to="/register">
					<Button name="REGISTER" className="button-gradient" />
				</Link>

				<Link to="/login">
					<Button name="LOGIN" className="button-gradient" />
				</Link>
			</div>
			<div className="homepage__footer-message">
				<p>Steven Failla &copy; 2018</p>
			</div>
		</div>
	</div>
);

export default HomePage;
