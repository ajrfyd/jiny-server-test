const user = (sequelize, dataTypes) => {
  return sequelize.define('user', {
    userId: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    userPwd: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    userName: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    userPhone: {
      type: dataTypes.STRING(100),
      allowNull: true
    },
  })
}

export default user;