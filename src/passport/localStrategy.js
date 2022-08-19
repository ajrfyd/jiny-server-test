//로컬 로그인 전략 기능 정의
//회원가입시 입력한 아이디/암호 기반으로 패스포트 기능을 사용하는 경우의 인증전략
//passport-local 은 사용자아이디/암호를 직접 입력해서 로그인하는 방식을 제공한다.
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import db from '../../models/index.js';

//회원정보가 존재하는 모델 조회
// const { Member } = require('../models');


const local = passport => {
  //req.body내 비교 아이디/암호 html요소이름을 지정
  //new LocalStrategy({로그인폼의 아이디요소네임,암호요소네임지정},로그인인증처리함수(사용자가 입력한 아이디값,사용자가 입력한 암호값))
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId', // input name value
        passwordField: 'userPwd', // inpput name value
      },
      async (userId, userPWD, done) => {
        try {
          //로그인 화면에서 전달된 아이디/암호를 이용 DB사용자와 검증
          //done함수는 passport.authenticate의 콜백함수임
          //사용자 정보조회
          const exUser = await db.User.findOne({ where: { userId } });

          if (exUser) {
            const result = await bcrypt.compare(userPWD, exUser.userPwd);
            if (result) {
              const sessionUser = {
                userPSeq: exUser.id,
                userId: exUser.userId,
                userName: exUser.userName,
                userPhone: exUser.userPhone,
              };
              //사용자 정보 전달
              done(null, sessionUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '아이디가 존재하지 않습니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

export default local;


// //로컬 로그인 전략 기능 정의
// //회원가입시 입력한 아이디/암호 기반으로 패스포트 기능을 사용하는 경우의 인증전략
// //passport-local 은 사용자아이디/암호를 직접 입력해서 로그인하는 방식을 제공한다.
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// const db = require('../models');
// //회원정보가 존재하는 모델 조회
// const { Member } = require('../models');
// module.exports = passport => {
//   //req.body내 비교 아이디/암호 html요소이름을 지정
//   //new LocalStrategy({로그인폼의 아이디요소네임,암호요소네임지정},로그인인증처리함수(사용자가 입력한 아이디값,사용자가 입력한 암호값))
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: 'userId',
//         passwordField: 'userPwd',
//       },
//       async (userId, userPWD, done) => {
//         try {
//           //로그인 화면에서 전달된 아이디/암호를 이용 DB사용자와 검증
//           //done함수는 passport.authenticate의 콜백함수임
//           //사용자 정보조회
//           const exUser = await Member.findOne({ where: { userid: userId } });
//           if (exUser) {
//             const result = await bcrypt.compare(userPWD, exUser.userpwd);
//             if (result) {
//               var sessionUser = {
//                 userPSeq: exUser.id,
//                 userId: exUser.userid,
//                 userName: exUser.username,
//                 userTelephone: exUser.usertelephone,
//               };
//               //사용자 정보 전달
//               done(null, sessionUser);
//             } else {
//               done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
//             }
//           } else {
//             done(null, false, { message: '아이디가 존재하지 않습니다.' });
//           }
//         } catch (error) {
//           console.error(error);
//           done(error);
//         }
//       },
//     ),
//   );
// };