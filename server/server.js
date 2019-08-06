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

app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'), err => {
		if (err) res.status(500).send(err);
	});
});

app.listen(process.env.PORT, () =>
	console.log(`express server running on port: ${process.env.PORT}`)
);

module.exports = { app };
