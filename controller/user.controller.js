const User = require("../model/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      throw new Error("모든 정보를 입력해 주세요.");
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("이미 가입된 유저입니다.");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "성공입니다." });
  } catch (err) {
    res.status(400).json({ status: "실패입니다", message: err.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMath = bcrypt.compareSync(password, user.password);
      if (isMath) {
        const token = await user.generateToken();
        return res.status(200).json({ status: "성공", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (err) {
    res.status(400).json({ status: "실패", message: err.message });
  }
};

module.exports = userController;
