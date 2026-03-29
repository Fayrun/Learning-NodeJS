const User = require("../models/User"); // đường dẫn tùy project

module.exports = {
  requireLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/auth/login");
    next();
  },

  // Chạy global cho mọi route
  // authMiddleware.js
  async setCurrentUser(req, res, next) {
    if (req.session.user?.id) {
      try {
        const user = await User.findById(req.session.user.id).lean();
        console.log("currentUser:", user); // ← thêm dòng này
        res.locals.currentUser = user;
      } catch (err) {
        console.log("setCurrentUser error:", err); // ← và dòng này
        res.locals.currentUser = null;
      }
    } else {
      console.log("No session user, session:", req.session); // ← và dòng này
      res.locals.currentUser = null;
    }
    next();
  },
};
