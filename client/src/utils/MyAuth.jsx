class Authorize {
	register = (email, password) => {
		return fetch('/users', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify({ email, password })
		}).then(res => {
			return new Promise((resolve, reject) => {
				if (!res) {
					return reject();
				} else {
					return resolve(res);
				}
			});
		});
	};

	login = (email, password) => {
		return fetch('/users/login', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify({ email, password })
		}).then(res => {
			return new Promise((resolve, reject) => {
				if (!res) {
					return reject();
				} else {
					return resolve(res);
				}
			});
		});
	};

	authFetch = (url, options) => {
		let headers = {
			'Content-Type': 'application/json',
			'x-auth': `${this.getToken()}`
		};
		return fetch(url, {
			headers,
			...options
		}).then(res => {
			return new Promise((resolve, reject) => {
				if (!res) {
					return reject();
				} else {
					return resolve(res);
				}
			});
		});
	};

	isLoggedIn = () => {
		const token = this.getToken();
		return !!token;
	};

	setToken = token => {
		localStorage.setItem('TOKEN', token);
	};

	getToken = () => {
		return localStorage.getItem('TOKEN');
	};

	removeToken = () => {
		localStorage.removeItem('TOKEN');
	};

	logout = () => {
		this.authFetch('/users/me/token', {
			method: 'DELETE'
		});
		this.removeToken();
	};
}

let authorize = new Authorize();
export default authorize;
