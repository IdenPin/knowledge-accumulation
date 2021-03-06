
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
             {
              path: "/work-manage",
              name: '工作管理',
            },
            {
              path: "/deal-upload",
              name: "处罚信息上报",
            },
            {
              path: "/statistic-analyze",
              name: "统计分析",
              children: [
                {
                  path: "burn",
                  name: '垃圾焚烧',
                },
                {
                  path: "city28",
                  name: `"2+26"城市`
                },
                {
                  path: "fw-plains",
                  name: '汾渭平原'
                }
              ]
            },
            {
              path: "/white-manage",
              name: "白名单管理",
              children: [
                {
                  path: "city28",
                  name: `"2+26"城市`
                },
                {
                  path: "fw-plains",
                  name: '汾渭平原'
                }
              ]
            },
            {
              path: '/account-report',
              name: '统计报表',
            },
            {
              path: '/user-manage',
              name: '用户管理',
            },
            {
              path: '/company-search',
              name: '企业用户查询',
            },
            {
              path: '/system-manage',
              name: '系统管理',
            },
            {
              path: '/work-notice',
              name: '工作通知',
            },
            {
              path: '/user-info',
              name: '我的信息',
            }
          ]
        });
      }else{
        res.send({
          code: 0,
          msg: "操作成功！",
          data: [
            {
              path: '/http://www.baidu.com',
              name: 'Baidu',
            },
             {
              path: "/profile",
              name: "Profile"
            },
            {
              path: "/system",
              name: "System",
              children: [
                {
                  path: "role",
                  name: "SystemRole",
                },
                {
                  path: "user",
                  name: "SystemUser",
                },
                {
                  path: "manage",
                  name: "SystemManage",
                },
                {
                  path: "menu",
                  name: "SystemMenu",
                }
              ]
            },
            {
              path: "/eco",
              name: "Eco",
              children: [
                {
                  path: "sp-manager",
                  name: "EcoSpManager",
                  children: [
                    {
                      path: "sp-manager-list",
                      name: "EcoSpManagerList",
                    },
                    {
                      path: "sp-menu-role",
                      name: "EcoSpManagerRole",

                    }
                  ]
                },
                {
                  path: "eco-web-page",
                  name: "EcoWebPage",

                  children: [
                    {
                      path: "eco-page-banner",
                      name: "EcoWebPageBanner",

                    },
                    {
                      path: "eco-hot-news",
                      name: "EcoWebPageNews",

                    }
                  ]
                }
              ]
            },
            // {
            //   path: "/log",
            //   name: "Log",
            //   meta: {
            //     title: "日志管理",
            //     icon: "education"
            //   },
            //   children: [
            //     {
            //       path: "admin",
            //       name: "Admin",
            //       meta: { title: "后端服务", icon: "ball", noCache: true }
            //     },
            //     {
            //       path: "web",
            //       name: "Web",
            //       meta: { title: "前端服务", icon: "ball", noCache: true }
            //     }
            //   ]
            // },
            // {
            //   path: "/about",
            //   name: "About",
            //   meta: {
            //     icon: "people",
            //     title: "关于"
            //   },
            //   children: [
            //     {
            //       path: "index",
            //       name: "Index",
            //       meta: {
            //         icon: "people",
            //         title: "个人设置"
            //       }
            //     }
            //   ]
            // }
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