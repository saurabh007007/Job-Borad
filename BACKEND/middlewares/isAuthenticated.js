import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", Success: false });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized invaild token", Success: false });
    }
    req.id = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", Success: false });
  }
};
export default isAuthenticated;
