import Sequelize from 'sequelize';
import config from '../config/config.js';
import board from './board.js';
import article from './article.js';
import comment from './comment.js';
import user from './user.js';

const env = process.env.NODE_ENV || 'development';

const db = {};

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Board = board(sequelize, Sequelize);
db.Article = article(sequelize, Sequelize);
db.Comment = comment(sequelize, Sequelize);
db.User = user(sequelize, Sequelize);

export default db;