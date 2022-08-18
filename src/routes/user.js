import c from 'chalk';
import bcrypt from 'bcryptjs';
import db from '../../models/index.js';

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
      res.render('./user/login', { loginMsg: '' });
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
      res.redirect('/board/list');
    }
  }
]

export default userRouter;