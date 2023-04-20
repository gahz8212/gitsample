const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/join", async (req, res, next) => {
  const nick = req.body.nick;
  const email = req.body.email;
  const password = req.body.password;
  const exUser = await User.findOne({ where: { email } });
  if (exUser) {
    return res.redirect("/join/?error=conflict");
  } else {
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      nick,
      email,
      password: hash,
    });
  }
});
module.exports = router;
