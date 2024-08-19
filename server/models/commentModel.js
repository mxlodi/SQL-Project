module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        name: "postId", // Define the foreign key column name
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Comment;
};
