const board = (sequelize, dataType) => {
  return sequelize.define('board', {
    boardId: {
      type: dataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    boardName: {
      type: dataType.STRING(50),
      allowNull: false,
    },
    boardDesc: {
      type: dataType.STRING(200),
      allowNull: true,
    }
  }, {
    timestamps: true,
    paramoid: true
  })
};

export default board;