import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import c from 'chalk';
import path from 'path';
import boardRouter from './routes/board.js';
import layOuts from 'express-ejs-layouts';
import db from '../models/index.js';

const { log } = console;

const app = express();
db.sequelize.sync();

dotenv.config();
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.resolve() + '/public'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.set('layout', 'main');
app.set("layout extractScripts", true);
app.use(layOuts);

const { PORT } = process.env || 4000;

const react = {
  active: false
};

app.get('/', (req, res) => {
  res.render('index', { react });
});

boardRouter.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.listen(PORT, () => {
  log(c.red(`Server Listening on ${PORT}`))
});
