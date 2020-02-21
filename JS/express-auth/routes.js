
module.exports = (app) => {

const { User } = require("./db");
const JWT = require("jsonwebtoken");
const PRIVATE_KEY = "justdoit";


  
  app.get("/", function(req, res) {
    res.send("<h3>This is a express auth project demo .</h3>");
  });

  app.get("/api/users", async function(req, res) {
    const data = await User.find();
    res.send({
      code: 0,
      data: data,
      msg: "用户列表获取成功"
    });
  });

  app.post("/api/register", async function(req, res) {
    await User.create({
      username: req.body.username,
      password: req.body.password
    });
    res.send({
      code: 0,
      data: null,
      msg: "注册成功"
    });
  });

  
  app.post("/api/login", async function(req, res) {
    const data = await User.findOne({
      username: req.body.username
    });
    if (data === null) {
      res.status(422).send({
        code: 1,
        data: data,
        msg: "用户名错误"
      });
    } else {
      const isValid = require("bcryptjs").compareSync(
        req.body.password,
        data.password
      );
      // 生成 token
      const token = JWT.sign(
        {
          id: data._id
        },
        PRIVATE_KEY
      );
      res.send({
        code: isValid ? 0 : 1,
        data: isValid ? { username: data.username, id: data._id } : null,
        token,
        msg: isValid ? "登录成功" : "密码错误"
      });
    }
  });

  const authMiddleWare = function(req, res, next) {
    req.token = req.headers.authorization.split("Bearer ").pop();
    next()
  };

  app.get("/api/profile", authMiddleWare, async function(req, res) {
    try {
       const { id } = JWT.verify(req.token, PRIVATE_KEY);
       const data = await User.findById(id);
       if (data) {
         res.send({
           code: 0,
           data: data,
           msg: "用户个人信息返回成功"
         });
       }
    } catch (error) {
       res.send({
         code: -1,
         data: null,
         msg: error.message
       });
    }
  });
}