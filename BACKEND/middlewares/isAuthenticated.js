import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("middleware auth req.cookies", req.cookies);
    const token = req.cookies.token;
    console.log("middleware auth token", token);
    if (!token) {
      console.log("middleware auth token line 12", token);
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    console.log("middleware auth token line 14", token);
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
