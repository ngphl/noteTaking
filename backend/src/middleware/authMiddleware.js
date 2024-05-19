// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract the token from the header

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" }); // If token is invalid, respond with Forbidden
      }

      req.user = user; // Attach the user object to the request
      next(); // Proceed to the next middleware/route handler
    });
  } else {
    res.status(401).json({ message: "Unauthorized" }); // If no token is provided, respond with Unauthorized
  }
};
