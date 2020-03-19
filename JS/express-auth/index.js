const express = require('express')
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
// 实例化express创建服务
const app = new express();
app.use(cors());
app.use(express.json());
require('./routes')(app)




const swaggerDefinition = {
  info: {
    title: "express auth demo",
    version: 0.1,
    description: "express auth user 接口文档"
  },
  host: "http://localhost:3000",
  basePath: '/'
};


app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send({
    swaggerDefinition,
    apis: ["./routes.js"]
  });
})

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJSDoc({
      swaggerDefinition,
      apis: ["./routes.js"]
    })
  )
);

app.listen(3000, function() {
  console.log('服务启动了, http://localhost:3000')
})

