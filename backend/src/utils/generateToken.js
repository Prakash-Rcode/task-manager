import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "mysecretkey12344", { expiresIn: "30d" }); 
};

export default generateToken;
