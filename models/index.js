const Post = require('./Post');
const Comment = require('./Comments'); // Corrected import name
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'username_fk',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'username_fk',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'username_fk',
    onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'username_fk',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment }; // Corrected export name
