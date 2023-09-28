const studentAuthMiddleware = (req, res, next) => {
    // Check if the user is authenticated as a student
    if (req.user && req.user.isStudent) {
      // User is a student, allow access
      next();
    } else {
      // User is not a student, deny access
      res.status(403).json({ message: "Access denied. Student privileges required." });
    }
  };
  
  module.exports = studentAuthMiddleware;
  