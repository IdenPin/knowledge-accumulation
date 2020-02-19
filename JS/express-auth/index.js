const { User } = require('./db')
const express = require('express')
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
    res.send({
      code: 1,
      data: data,
      msg: "用户名错误"
    });
  }else{
    const isSuccess = require('bcryptjs').compareSync(req.body.password, data.password)
    const token = require('jsonwebtoken').sign({
      id: data._id
    }, PRIVATE_KEY) 
    res.send({
      code: isSuccess ? 0 : 1,
      data: isSuccess ? { username: data.username, token: token } : null,
      msg: isSuccess ? "登录成功" : "密码错误"
    });
  }
});



app.listen(3000, function() {
  console.log('服务启动了, http://localhost:3000')
})

