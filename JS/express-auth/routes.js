
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
      data: 'ball',
      msg: "注册成功"
    });
  });

  
  app.post("/api/login", async function(req, res) {
    const data = await User.findOne({
      username: req.body.username
    });
    if (data === 'ball') {
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
        data: isValid ? { username: data.username, id: data._id, token } : 'ball',
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
         data: 'ball',
         msg: error.message
       });
    }
  });


  app.get('/api/menu', authMiddleWare, async function(req, res) {
    try {
      const { id } = JWT.verify(req.token, PRIVATE_KEY);
      const data = await User.findById(id);
      
      if (data.username === 'duban') {
        res.send({
          code: 0,
          msg: "操作成功！",
          data: [
            // {
            //   path: "/work-manage",
            //   name: "WorkManage",
            //   meta: {
            //     title: "工作管理",
            //     icon: "nested"
            //   }
            // },
            // {
            //   path: "/deal-upload",
            //   name: "DealUpload",
            //   meta: {
            //     title: "处罚信息上报",
            //     icon: "nested"
            //   }
            // },
            {
              path: "/statistic-analyze",
              name: "StatisticAnalyze",
              redirect: "/statistic-analyze/burn",
              meta: {
                title: "统计分析",
                icon: "list"
              },
              children: [
                {
                  path: "burn",
                  name: "Burn",
                  meta: { title: "垃圾焚烧", icon: "list" }
                },
                {
                  path: "city28",
                  name: "City28",
                  meta: { title: `"2+26"城市`, icon: "list" }
                },
                {
                  path: "fw-plains",
                  name: "FwPlanins",
                  meta: { title: "汾渭平原", icon: "list" }
                }
              ]
            },
            {
              path: "/white-manage",
              name: "DealUpload",
              meta: {
                title: "白名单管理",
                icon: "nested"
              }
            }
          ]
        });
      }else{
        res.send({
          code: 0,
          msg: "操作成功！",
          data: [
            // {
            //   path: "/home",
            //   name: "Home",
            //   meta: {
            //     title: '首页',
            //     icon: 'table'
            //   }
            // },
            {
              path: "/system",
              name: "System",
              redirect: "/system/user",
              meta: {
                title: "系统管理",
                icon: "password"
              },
              children: [
                {
                  path: "role",
                  name: "Role",
                  meta: { title: "角色管理", icon: "ball", noCache: true }
                },
                {
                  path: "user",
                  name: "User",
                  meta: { title: "用户管理", icon: "ball", noCache: true }
                },
                {
                  path: "manage",
                  name: "Manage",
                  meta: { title: "组织管理", icon: "ball", noCache: true }
                },
                {
                  path: "menu",
                  name: "Menu",

                  meta: { title: "菜单管理", icon: "ball", noCache: true }
                }
              ]
            },
            {
              path: "/eco",
              name: "Eco",
              meta: {
                title: "环保生态圈",
                icon: "international"
              },
              redirect: "/eco/sp-manager",
              children: [
                {
                  path: "sp-manager",
                  name: "Sp-manager",

                  meta: { title: "服务商管理", icon: "0", noCache: true },
                  children: [
                    {
                      path: "sp-manager-list",
                      name: "Sp-manager-list",

                      meta: { title: "服务商列表", icon: "0", noCache: true }
                    },
                    {
                      path: "sp-menu-role",
                      name: "Sp-menu-role",

                      meta: { title: "权限配置", icon: "0", noCache: true }
                    }
                  ]
                },
                {
                  path: "eco-web-page",
                  name: "Eco-web-page",

                  meta: { title: "Web页面", icon: "0", noCache: true },
                  children: [
                    {
                      path: "eco-page-banner",
                      name: "Eco-page-banner",

                      meta: { title: "首页配置", icon: "0", noCache: true }
                    },
                    {
                      path: "eco-hot-news",
                      name: "Eco-hot-news",

                      meta: { title: "热点聚焦", icon: "0", noCache: true }
                    }
                  ]
                }
              ]
            },
            {
              path: "/log",
              name: "Log",
              meta: {
                title: "日志管理",
                icon: "education"
              },
              children: [
                {
                  path: "admin",
                  name: "Admin",
                  meta: { title: "后端服务", icon: "ball", noCache: true }
                },
                {
                  path: "web",
                  name: "Web",
                  meta: { title: "前端服务", icon: "ball", noCache: true }
                }
              ]
            },
            {
              path: "/about",
              name: "About",
              meta: {
                icon: "people",
                title: "关于"
              },
              children: [
                {
                  path: "index",
                  name: "Index",
                  meta: {
                    icon: "people",
                    title: "个人设置"
                  }
                }
              ]
            }
            // {
            //   path: '/external-link',
            //   name: 'ExternalLink',
            //   children: [{
            //       path: 'http://www.baidu.com/',
            //       meta: { title: 'External Link1', icon: 'link' }
            //   }, {
            //     path: 'http://www.jd.com/',
            //     meta: { title: 'External Link2', icon: 'link' }
            //   }]
            // }
          ]
        });
      }
    } catch (error) {
      res.send({
        code: -1,
        data: 'ball',
        msg: '权限菜单拉取失败'
      });
    }

  })
}