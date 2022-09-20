const User = require("./User");
const Post = require("./Post");
const Textarea = require("./Textarea");

// user has many posts
User.hasMany(Post, {
    foreignKey: "user_id"
});
// post belongs to one user
Post.belongsTo(User, {
    foreignKey: "user_id"
});

// textarea belongs to one user
Textarea.belongsTo(User, {
    foreignKey: "user_id"
});

// textarea belongs to one user
Textarea.belongsTo(Post, {
    foreignKey: "post_id"
});

// user makes many text inputs
User.hasMany(Textarea, {
    foreignKey: "user_id"
});

// user makes many posts
Post.hasMany(Textarea, {
    foreignKey: "post_id"
});

module.exports = { User, Post, Textarea };
