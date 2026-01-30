/**
 * ================================
 *  API 
 * ================================
*/

/**
 * GET – list users
*/
app.get("/users", (req, res) => {
  res.status(200).json(users);
});
/**
 * app.get("/users", ...): Khi server nhận được một HTTP request có method là GET và đường dẫn là /users 
 * Express lúc này đóng vai trò:Nghe request, So khớp method (GET), So khớp URL (/users)
 * (req, res) => { ... }: chứa toàn bộ thông tin client gửi lên (params, query, body, headers…)
 * res.status(200): Request đã được handle thành công
 * .json(users): Chuyển biến users thành JSON, Gửi JSON đó về cho client, Kết thúc response
*/

/**
 * GET – dùng req.params
*/
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});
/**
 * /users/:id là một route động, trong đó :id đại diện cho giá trị client truyền vào URL. Khi client call GET /users/5, Express sẽ lấy số 5 và gán vào req.params.id. Nhờ vậy, server biết chính xác đang thao tác với user cụ thể nào, nên req.params luôn được dùng để định danh tài nguyên.
 * Dòng const id = Number(req.params.id); dùng để ép kiểu giá trị lấy từ URL sang số, vì mọi data trong req.params mặc định đều là string. Trong khi đó, id trong dữ liệu hệ thống thường được lưu dưới dạng number, nên nếu không ép kiểu thì việc so sánh sẽ sai, ví dụ "5" === 5 trả về false. Việc ép kiểu giúp so sánh chính xác, tránh các bug ngầm khó phát hiện khi xử lý logic search hoặc update date.
 * const user = users.find(...) : duyệt list users sau đó search user có id trung trong params
 * if (!user) { ... }: nếu user không tồn tại trả về 404 not found
 * return res.status(404)... : có vai trò stops function handle ngay lập tức,Nếu không có return, code phía dưới vẫn tiếp tục chạy và có thể dẫn đến việc server cố gắng gửi thêm một response nữa.
*/

/**
 * POST – dùng req.body
*/
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});
/** 
 * destructuring { name } giúp lấy trực tiếp trường cần dùng từ 
 * if (!name): validate dữ liệu đầu vào, Nếu client không gửi name hoặc gửi rỗng, request bị coi là không hợp lệ và server trả về 400 Bad Request
 * const newUser: ạo ra một object user mới từ dữ liệu hợp lệ. id được sinh tạm dựa trên số lượng user hiện có, còn name lấy từ request body
 * users.push(newUser);User mới được them vào list users
 * res.status(201).json(newUser): server trả về 201 Created để báo rằng tài nguyên đã được tạo thành công,
*/

/**
 * PUT – cập nhật user
*/
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  /**
   * const user = users.find(u => u.id === id): kiểm tra trong mảng gặp user có id trùng với id cần tìm nó sẽ output user và dừng lại
   * server search user tương đương với id 
   */

  user.name = name;
  /**gán giá trị mới cho thuộc tính name của user. */
  res.status(200).json(user);
});
/** 
 * const id = Number(req.params.id): Route này handle request PUT /users/:id, dùng để update thông tin của một user cụ thể. id được lấy từ req.params để xác định user cần cập nhật
*/

/**
 * DELETE – xoá user
*/
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: "User deleted" });
});

/**
 * ===========
 * Middleware
 * ===========
 */

/** Log request middleware */
const logRequest = (req, res, next) => {
  /** này sẽ run trước các route và có thể cho request đi tiếp bằng next() */
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  /** 
   * new Date().toISOString(): thời điểm request
   * req.method: HTTP method (GET, POST, PUT…)
   * req.url: đường dẫn client gọi
  */
  next();
  /**cho phép request tiếp tục đi xuống các middleware */
};

app.use(logRequest);
/** đăng ký middleware logRequest cho toàn bộ app, mọi request đi vào server đều sẽ được log trước khi xử lý */


/** check auth middleware */
const checkAuth = (req, res, next) => {
  /**dùng để kiểm tra quyền truy cập trước khi request đi vào route chính. Nó nhận req, res và next để có thể chặn hoặc cho request đi tiếp */
  const token = req.headers.authorization;
  /** lấy token từ header Authorization của request, client sẽ gửi token (ví dụ JWT) trong header này để chứng minh đã đăng nhập */

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // giả lập token hợp lệ
  if (token !== "Bearer secrettoken") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

/** 
 * =================
 * Project structure
 * =================
*/
/** routes/user.routes.js */
const express = require("express");
const router = express.Router();
/**Tạo một router riêng. Router này hoạt động như một “app con”, dùng để nhóm các route liên quan đến cùng một tài nguyên */
const userController = require("../controllers/user.controller");
/**Import controller chứa logic xử lý request. Route sẽ không tự xử lý, mà chỉ gọi controller tương ứng. */

router.get("/", userController.getUsers);
/**chuyển request sang getUsers trong controller */
router.post("/", userController.createUser);
/** route chỉ map URL với hàm createUser trong controller  */

module.exports = router;



/** controllers/user.controller.js */
const userService = require("../services/user.service");
/**import userService để gọi business logic. Controller không tự handle và wolk với database */

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    /** Controller gọi service để lấy list users. Việc dùng async/await giúp handle logic bất đồng bộ (DB, API) */
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
  /** Nếu có lỗi xảy ra, controller không tự handle mà đẩy lỗi cho error-handling middleware thông qua next(err) */
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};


/** services/user.service.js */
const userModel = require("../models/user.model");
/** Service import userModel để wolk với data, nhưng không quan tâm HTTP hay response. */

exports.getUsers = async () => {
  return userModel.findAll();
};
/** lấy list user” bằng cách call model truy vấn DB và output data về cho controller */

exports.createUser = async (data) => {
  if (!data.name) {
    throw new Error("Name is required");
  }
  /** Nếu sai, ném lỗi để controller / error middleware handle */

  return userModel.create(data);
  /** service gọi model để tạo user trong DB và trả kết quả */
};



/** models/user.model.js */
// Giả lập DB
let users = [];

exports.findAll = async () => {
  return users;
};
// cung cấp hàm read data: trả về toàn bộ users từ DB

exports.create = async (user) => {
  users.push(user);
  return user;
  // cung cấp function read data: lưu user new vào DB và output kết quả
};

/** middlewares/error.middleware.js */
module.exports = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Internal Server Error" });
  // output lỗi chuẩn cho client, tránh làm crash server.
};

/**
 * ===========
 * AUTH
 * ===========
*/

/** Hash password */
const bcrypt = require("bcrypt");
// require("bcrypt"): import thư viện bcrypt để handle hash password

const hashPassword = async (password) => {
  // hashPassword là hàm async vì bcrypt hash mất time
  const saltRounds = 10;
  // saltRounds = 10: số vòng xử lý, càng cao thì hash càng khó bị brute-force
  return bcrypt.hash(password, saltRounds);
  //tạo ra chuỗi hash không thể đảo ngược từ password gốc
};


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

/** ENV – CONFIG – SECURITY */

/** Dùng config trong app */
const config = require("./config");
// require("./config"): import file config đã đọc từ .env hoặc theo NODE_ENV

app.listen(config.port, () => {
  // config.port: port được cấu hình theo môi trường, không hardcode trong code.
  console.log(`Server running on port ${config.port}`);
  // config.port: port được cấu hình theo môi trường, không hardcode trong code.
});

/** Dùng config cho JWT */
const jwt = require("jsonwebtoken");
// require("jsonwebtoken"): thư viện tạo và verify JWT
const config = require("./config");

const token = jwt.sign(
  //jwt.sign(...): tạo token cho user.
  { userId: 1 },
  // { userId: 1 }: payload – thông tin đại diện user
  config.jwtSecret,
  //config.jwtSecret: secret key lấy từ env, dùng để ký token
  { expiresIn: "1h" }
  // token hết hạn 1h
);






