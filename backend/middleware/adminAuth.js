const adminAuthMiddleware = (req, res, next) => {
    // Check if the user is authenticated as an administrator
    if (req.user && req.user.isAdmin) {
      // User is an administrator, allow access
      next();
    } else {
      // User is not an administrator, deny access
      res.status(403).json({ message: "Access denied. Administrator privileges required." });
    }
  };
  
  module.exports = adminAuthMiddleware;
