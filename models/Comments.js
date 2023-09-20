const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username_fk: {
            type: DataTypes.STRING, // Assuming username is of type STRING
            allowNull: false,
            references: {
                model: 'user', // This should match the name of your User model
                key: 'username', // This should match the name of the column you want to reference
            },
        post_id: {
            type: DataTypes.INTEGER, // Assuming username is of type STRING
            allowNull: false,
            references: {
                model: 'post', // This should match the name of your User model
                key: 'id', // This should match the name of the column you want to reference
            },
        },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
);

module.exports = Comments;
