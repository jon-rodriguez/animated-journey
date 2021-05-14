const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config/.env' });

const main = async () => {
	try {
		await mongoose.connect(process.env.MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = mongoose.connection.db;

		db.dropDatabase();

		// Add initial user
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash('1234abcd', salt);

		const result = await db
			.collection('users')
			.insertOne({ userName: 'Morgan', email: 'morgan@email.com', password: hash });

		const result2 = await db.collection('users').insertOne({ username: 'Test', email: 'test@email.com', password: hash });

		const user = result.ops[0];
		const user2 = result2.ops[0];

		for (let i = 0; i < 5; i++) {
			const res = await db.collection('posts').insertOne({
				title: `Test Post ${i}`,
				caption: `This is the caption for test post ${i}`,
				user: user._id,
			});
			console.log(res.ops[0]);
		}
		for (let i = 0; i < 5; i++) {
			const res = await db.collection('posts').insertOne({
				title: `Test Post ${i}`,
				caption: `This is the caption for test post ${i}`,
				user: user2._id,
			});
			console.log(res.ops[0]);
		}

		mongoose.connection.close();
	} catch (error) {
		console.log(error);
	}
};

main();
