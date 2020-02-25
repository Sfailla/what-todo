const mongoose = require('mongoose');

mongoose.Pomise = global.Promise;

mongoose
	.connect(process.env.MONGOOSE_URI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('connection to MLAB established...'))
	.catch(err =>
		console.log(
			`${err.name} \n there is an error with mongoose connect: ${err.errMsg}`
		)
	);

module.exports = mongoose;
