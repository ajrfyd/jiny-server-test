import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import c from 'chalk';
import path from 'path';
import boardRouter from './routes/board.js';
import userRouter from './routes/user.js';
import layOuts from 'express-ejs-layouts';
import db from '../models/index.js';
import session from 'express-session';

const { log } = console;

const app = express();
db.sequelize.sync();

app.use(
  session({
    resave: false,//세션을 항상 저장할지여부
    saveUninitialized: true, //세션이 저장되기전 초기화 안된상태로 미리 저장공간을 만들지여부
    secret: "testsecret", //세션키값을 암호할때 사용할 키값
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge:1000 * 60 * 5
    },
  }),
);

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

const routes = [...boardRouter, ...userRouter];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

// boardRouter.forEach(({ method, route, handler }) => {
//   app[method](route, handler);
// });

// userRouter.forEach(({ method, route, handler }) => {
//   app[method](route, handler);
// })

app.listen(PORT, () => {
  log(c.red(`Server Listening on ${PORT}`))
});
