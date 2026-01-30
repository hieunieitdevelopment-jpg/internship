/** hiếu additional */
/** Auth middleware – check JWT */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // req.headers.authorization: lấy header chứa token (thường dạng Bearer <token>)

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  // authHeader.split(" ")[1]: tách lấy JWT thuần, bỏ chữ Bearer

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // jwt.verify(token, SECRET_KEY): kiểm tra token có hợp lệ và có bị sửa không.
    req.user = decoded; // gắn user vào request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};