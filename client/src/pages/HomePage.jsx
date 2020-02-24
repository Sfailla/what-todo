import React from 'react';

import TextComponent from '../components/TextComponent';

const HomePage = () => (
	<div className="App-Layout homepage">
		<div className="homepage--left-box">
			<h1 className="homepage__title">What TODO</h1>
			<TextComponent text="This is a todo app that displays an express backend api and authentication using web tokens" />
			<TextComponent text="to get started just register and then you will have access to the todo app" />
			<TextComponent text="if you already registered than just click on the button below to login and go straight to the app" />
			<div className="homepage__footer-message">
				<p>Steven Failla &copy; 2018</p>
			</div>
		</div>
	</div>
);

export default HomePage;
