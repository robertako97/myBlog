const Post = require('./Post');
const Comments = require('./Comments');
const User = require('./User');

Post.hasMany(Comments, {
    foreignKey: 'comments_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'username_fk'
});

Post.belongsTo(User, {
    foreignKey: 'username_fk'
});

Comments.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comments };
