const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		require: true,
	},
	cloudinaryId: {
		type: String,
		require: true,
	},
	caption: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: function () {
			return new Date();
		},
	},
});
module.exports = mongoose.model('Post', PostSchema);
