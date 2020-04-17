require('./config/config.js');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/todos', todos);
app.use('/users', users);

app.use(
	express.static(path.resolve(__dirname, '..', 'client', 'build'))
);

if (process.env.NODE_ENV === 'production') {
	//Serving the files on the CLIENT folder
	app.use((req, res, next) => {
		// if not an https server, the site will be redirected to https
		if (req.header('x-forwarded-proto') !== 'https') {
			res.redirect(`https://${req.header('host')}${req.url}`);
		} else {
			next();
		}
	});
}

app.get('*', (req, res) => {
	res.sendFile(
		path.resolve(__dirname, '..', 'client', 'public', 'index.html'),
		err => {
			if (err) res.status(500).send(err);
		}
	);
});

app.listen(process.env.PORT, () =>
	console.log(`express server running on port: ${process.env.PORT}`)
);

module.exports = { app };
