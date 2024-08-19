module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      foreignKey: {
        name: "postId", // Define the foreign key column name
        allowNull: false,
      },
      onDelete: "CASCADE",
      as: "comments", // Ensure this alias is used consistently
    });
  };

  return Post;
};
