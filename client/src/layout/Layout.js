import React, { useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';

const checkAuth = () => {
	const token = localStorage.getItem('TOKEN');
	if (!token) {
		return false;
	}
	try {
		const { exp } = decode(token);
		if (exp > new Date().getTime() / 1000) {
			return false;
		}
	} catch (e) {
		return false;
	}
	return true;
};

// HOC for Authenticated
const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			checkAuth() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/login' }} />
			)}
	/>
);

const Layout = () => {
	const [ showOverlay, setShowOverlay ] = useState(false);
	const [ location, setLocation ] = useState(null);

	const changeOverlayState = () => {
		setShowOverlay(true);
		setTimeout(() => setShowOverlay(false), 1500);
	};

	return (
		<Switch>
			<Route
				exact
				path="/"
				render={props => (
					<HomePage
						{...props}
						showOverlay={showOverlay}
						location={location}
						setLocation={setLocation}
						changeOverlayState={changeOverlayState}
					/>
				)}
			/>
			<Route
				exact
				path="/register"
				render={props => (
					<RegisterPage
						{...props}
						showOverlay={showOverlay}
						location={location}
						setLocation={setLocation}
						changeOverlayState={changeOverlayState}
					/>
				)}
			/>
			<Route
				exact
				path="/login"
				render={props => (
					<LoginPage
						{...props}
						showOverlay={showOverlay}
						location={location}
						setLocation={setLocation}
						changeOverlayState={changeOverlayState}
					/>
				)}
			/>
			<AuthRoute
				exact
				path="/dashboard"
				render={props => <Dashboard {...props} />}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	);
};

export default Layout;
