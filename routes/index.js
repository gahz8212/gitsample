const express = require("express");
const router = express.Router();
router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
});
module.exports = router;
