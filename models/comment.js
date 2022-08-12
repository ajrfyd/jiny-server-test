const comment = (sequelize, dataTypes) => {
  return sequelize.define('comment', {
    commentId: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    articleId: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    commment: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    registUser: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    connectCommentId: {
      type: dataTypes.INTEGER,
      allowNull: true,
      comment: '댓글의 부모댓글 아이디'
    }
  }, {
    timestamps: true,
    paranoid: true
  })
};

export default comment;