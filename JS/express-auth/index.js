const { User } = require('./db')
const express = require('express')
// 实例化express创建服务
const app = new express();
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
  const data = await User.create({
    username: req.body.username,
    password: req.body.password
  });
  console.log('------:' ,data)
  res.send({
    code: 0,
    data: null,
    msg: '注册成功'
  })
});

app.post("/api/login", function(req, res) {
  console.log('-----------')
});



app.listen(3000, function() {
  console.log('服务启动了, http://localhost:3000')
})

