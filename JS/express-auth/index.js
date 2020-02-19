const { User } = require('./db')
const express = require('express')
const JWT = require("jsonwebtoken");
// 实例化express创建服务
const app = new express();
const PRIVATE_KEY = 'justdoit'

app.use(express.json())

app.get('/', function(req, res) {
  res.send("<h3>This is a express auth project demo .</h3>");
})

app.get('/api/users', async function(req, res){
  const data = await User.find()
  res.send({
    code: 0,
    data: data,
    msg: "用户列表获取成功"
  });
})

app.post("/api/register", async function(req, res) {
  await User.create({
    username: req.body.username,
    password: req.body.password
  });
  res.send({
    code: 0,
    data: null,
    msg: '注册成功'
  })
});

app.post("/api/login", async function(req, res) {
  const data = await User.findOne({
    username: req.body.username
  })
  if(data === null) {
    res.status(422).send({
      code: 1,
      data: data,
      msg: "用户名错误"
    });
  }else{
    const isValid = require('bcryptjs').compareSync(req.body.password, data.password)
    // 生成 token
    const token = JWT.sign({
      id: data._id
    }, PRIVATE_KEY) 
    res.send({
      code: isValid ? 0 : 1,
      data: isValid ? { username: data.username, id: data._id } : null,
      token,
      msg: isValid ? "登录成功" : "密码错误"
    });
  }
});


app.get('/api/profile', async function(req, res){
  const token = req.headers.authorization.split("Bearer ").pop()
  const {id} = JWT.verify(token, PRIVATE_KEY)
  const data = await User.findById(id)
  res.send({
    code: 0,
    data: data,
    msg: "用户个人信息返回成功"
  });
})



app.listen(3000, function() {
  console.log('服务启动了, http://localhost:3000')
})

