exports.getUsers = () => {
  return [{ id: 1, name: "Van Khai" }];
};

/** hiếu hiếu additional */

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
