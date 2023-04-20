const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");
module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "passpword" },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const hash = bcrypt.compare(password, exUser.password);
            if (hash) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호 오류" });
            }
          }
          done(null, false, { message: "가입되지 않은 이메일" });
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};
