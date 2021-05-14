const Post = require('../models/Posts');

module.exports = {
	getProfile: async (req, res, next) => {
		try {
			const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' });

			res.render('profile.ejs', { user: req.user, posts });
		} catch (error) {
			console.log(error);
		}
	},
};
