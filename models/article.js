const article = (sequelize, dataTypes) => {
  return sequelize.define('article', {
    articleId: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    boardId: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    viewCnt: {
      type: dataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ipAddress: {
      type: dataTypes.STRING(15),
      allowNull: false,
    },
    displayYn: {
      type: dataTypes.STRING(1),
      allowNull: false,
    },
    registUser: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    modifyUser: {
      type: dataTypes.STRING(100),
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  })
};

export default article;