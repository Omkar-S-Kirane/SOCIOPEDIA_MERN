import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the "Authorization" header
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied.");

    // Remove the "Bearer " prefix from the token if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user information to the request object
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle any errors that occur during token verification
    res.status(500).json({ error: err.message });
  }
};