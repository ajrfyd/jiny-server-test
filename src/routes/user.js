import c from 'chalk';
import bcrypt from 'bcryptjs';
import db from '../../models/index.js';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from './middlewares.js';
import jwt from 'jsonwebtoken';

const { log } = console;
const BASE = '/user';

const userRouter = [
  {
    method: 'get',
    route: BASE + '/entry',
    handler: async (req, res, next) => {
      log(c.red(bcrypt));
      res.render('./user/entry');
    }
  },
  {
    method: 'post',
    route: BASE + '/entry',
    handler: async (req, res, next) => {
      const { userId, userPwd, userPwdConfirm, userName, userPhone } = req.body;

      const encPwd = await bcrypt.hash(userPwd, 12);

      const newUser = {
        userId,
        userPwd: encPwd,
        userName,
        userPhone
      }

      await db.User.create(newUser);

      res.redirect('/board/list');
    }
  },
  {
    method: 'get',
    route: BASE + '/login',
    handler: async (req, res, next) => {
      res.render('./user/login', { loginMsg: '', loginError: req.flash('loginError') });
    }
  },
  {
    method: 'post',
    route: BASE + '/login',
    handler: async (req, res, next) => {
      const { userId, userPwd } = req.body;
      let loginMsg = '';

      const user = await db.User.findOne({ where: { userId }});
      if(!user) {
        loginMsg = 'Not Found User Id';
        res.render('./user/login', { loginMsg });
        return;
      } else {
        const isCorrectPwd = await bcrypt.compare(userPwd, user.userPwd);

        log(c.bgBlue(isCorrectPwd));
        if(isCorrectPwd) {
          
          req.session.isLogin = true;
          req.session.loginUser = {
            userSeq: user.id,
            userId: user.userId,
            userName: user.userName,
            userPhone: user.userPhone
          }
          log(c.bgYellowBright(req.session.loginUser.userName));
          req.session.save(() => {
            
            res.redirect('/board/list');
          });

        } else {
          loginMsg = 'Not match password';
          res.render('./user/login', { loginMsg });
        }
      }
    }
  },
  {
    // passort
    method: 'post',
    route: BASE + '/login2',
    handler: async (req, res, next) => {
      log(c.red(req));

      //???????????? ????????????: ????????????????????? ??????
      // authError: error , user: session userinfo, info: done's message
      passport.authenticate('local', (authError, user, info) => {
        //?????? ????????? ??????(localStrategy.js) ???????????? ?????? ?????????
        //???????????? ?????????
        if (authError) {
          console.error(authError);
          return next(authError);
        }
        //????????? session??? ????????? ????????? ????????????
        if (!user) {
          //localStrategy.js ????????? DB????????? ???????????? ????????? ??????
          req.flash('loginError', info.message);
          return res.redirect('/user/login');
        }
        //req.login ????????? ?????? ????????? ????????????
        //req.log(user,????????????????????????)
        //user?????????????????? ???????????? express-session??? ?????????.req.session.passport.user = user
        return req.login(user, (loginError) => {
          //????????? ???????????????
          if (loginError) {
            console.error(loginError);
            return next(loginError);
          }
          //?????? ???????????? ??????????????? ??????
          return res.redirect('/board/list');
        });
      })(req, res, next); // ???????????? ?????? ?????????????????? (req, res, next)??? ????????????.
      // res.redirect('/board/list');
    }
  },
  {
    method: 'get',
    route: BASE + '/profile',
    handler: async (req, res, next) => {
      // Not login => Login Page

      // if(req.session.passport === undefined) {
      //   res.redirect('/user/login');
      // }


      // const userData = req.session.passport.user;

      // log(c.red(bcrypt));



      res.render('./user/profile', { userData });
    }
  },
  {
    method: 'get',
    route: BASE + '/makejwt',
    handler: (req, res, next) => {
      res.render('./user/makejwt');
    }
  },
  {
    method: 'post',
    route: BASE + '/makejwt',
    handler: (req, res, next) => {

      const { email, tel, company, userName } = req.body;

      const userData = {
        email,
        tel,
        company,
        userName
      }

      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '240h', // 60m,10s,24h
        issuer: 'ajrfyd'
      });

      log(c.red(token));


      const result = {
        token,
        userData
      }

      res.json(result);
    }
  },
  {
    method: 'get',
    route: BASE + '/token',
    handler: (req, res, next) => {
      const { token } = req.query;
      log(c.blue(token));
      const data = jwt.verify(token, process.env.JWT_SECRET, {});

      res.json(data)
    }
  }
]

export default userRouter;