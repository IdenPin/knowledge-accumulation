const Mock = {
          code: 0,
          msg: "操作成功！",
          data: [
            {
              path: "/home",
              name: "Home",
              meta: {
                title: '首页',
                icon: 'table'
              }
            },
            {
              path: "/system",
              name: "System",
              redirect: "/system/user",
              meta: {
                title: '系统管理',
                icon:'password'
              },
              children: [
                {
                  path: "user",
                  name: "User",
                  meta: { title: "用户管理", icon: 'ball', noCache: true }
                },
                {
                  path: "role",
                  name: "Role",
                  
                  meta: { title: "角色管理", icon: 'ball', noCache: true }
                },
                {
                  path: "menu",
                  name: "Menu",
                  
                  meta: { title: "菜单管理", icon: 'ball', noCache: true }
                },
                {
                  path: "manage",
                  name: "Manage",
                  
                  meta: { title: "组织管理", icon: 'ball', noCache: true }
                }
              ]
            },
            {
              path: "/eco",
              name: "Eco",
              meta: {
                title: '环保生态圈',
                icon: 'international'
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
                },
                {
                  path: "mall",
                  name: "Mall",
                  
                  meta: { title: "环保超市", icon: "0", noCache: true },
                  children: [
                    {
                      path: "eco-statistical-analysis",
                      name: "Eco-statistical-analysis",
                      
                      meta: { title: "统计分析", icon: "0", noCache: true }
                    },
                    {
                      path: "goods-list",
                      name: "Goods-list",
                      
                      meta: { title: "商品列表", icon: "0", noCache: true }
                    },
                    {
                      path: "goods-arrange",
                      name: "Goods-arrange",
                      
                      meta: { title: "商品归类", icon: "0", noCache: true }
                    },
                    {
                      path: "goods-tag",
                      name: "Goods-tag",
                      
                      meta: { title: "标签管理", icon: "0", noCache: true }
                    },
                    {
                      path: "category-list",
                      name: "Category-list",
                      
                      meta: { title: "条目管理", icon: "0", noCache: true }
                    },
                    {
                      path: "goods-detail",
                      name: "Goods-detail",
                      
                      meta: { title: "商品详情", icon: "0", noCache: true }
                    }
                  ]
                },
                {
                  path: "hospital",
                  name: "Hospital",
                  
                  meta: { title: "环境医院", icon: "0", noCache: true },
                  children: [
                    {
                      path: "hospital-expert-list",
                      name: "Hospital-expert-list",
                      
                      meta: { title: "专家列表", icon: "0", noCache: true }
                    },
                    {
                      path: "hospital-category",
                      name: "Hospital-category",
                      
                      meta: { title: "条目管理", icon: "0", noCache: true }
                    },
                    {
                      path: "programme-list",
                      name: "Programme-list",
                      
                      meta: { title: "普通方案", icon: "0", noCache: true }
                    },
                    {
                      path: "programme-superior",
                      name: "Programme-superior",
                      
                      meta: { title: "优选方案", icon: "0", noCache: true }
                    },
                    {
                      path: "online-price-system",
                      name: "Online-price-system",
                      
                      meta: { title: "询价系统条目", icon: "0", noCache: true }
                    },
                    {
                      path: "consultation-list",
                      name: "Consultation-list",
                      
                      meta: { title: "资讯列表", icon: "0", noCache: true }
                    },
                    {
                      path: "online-price-list",
                      name: "Online-price-list",
                      
                      meta: { title: "在线询价列表", icon: "0", noCache: true }
                    },
                    {
                      path: "online-price-detail",
                      name: "Online-price-detail",
                      
                      meta: { title: "在线询价详情", icon: "0", noCache: true }
                    },
                    {
                      path: "online-price-area",
                      name: "Online-price-area",
                      
                      meta: { title: "治理范围条目", icon: "0", noCache: true }
                    },
                    {
                      path: "programme-detail",
                      name: "Programme-detail",
                      
                      meta: { title: "方案详情", icon: "0", noCache: true }
                    },
                    {
                      path: "hospital-industry-room",
                      name: "Hospital-industry-room",
                      
                      meta: { title: "行业科室", icon: "0", noCache: true }
                    }
                  ]
                },
                {
                  path: "environment-wiki",
                  name: "Environment-wiki",
                  
                  meta: { title: "环保百科", icon: "0", noCache: true },
                  children: [
                    {
                      path: "environment-clauses-list",
                      name: "Environment-clauses-list",
                      
                      meta: { title: "百科条目", icon: "0", noCache: true }
                    },
                    {
                      path: "environment-policy-rules",
                      name: "Environment-policy-rules",
                      
                      meta: { title: "政策法规", icon: "0", noCache: true }
                    },
                    {
                      path: "environment-wiki-list",
                      name: "Environment-wiki-list",
                      
                      meta: { title: "环保百科列表", icon: "0", noCache: true }
                    },
                    {
                      path: "environment-wiki-detail",
                      name: "Environment-wiki-detail",
                      
                      meta: { title: "环保百科详情", icon: "0", noCache: true }
                    }
                  ]
                }
              ]
            },
            {
              path: "/bigData",
              name: "BigData",
              meta: {
                title: '大数据平台',
                icon: 'chart'

              },
              redirect: "/bigData/home-website",
              children: [
                {
                  path: "home-website",
                  name: "Home-website",
                  
                  meta: { title: "官网管理", icon: "0", noCache: true },
                  children: [
                    {
                      path: "home-website-banner",
                      name: "Home-website-banner",
                      
                      meta: { title: "banner管理", icon: "0", noCache: true }
                    },
                    {
                      path: "home-website-product",
                      name: "Home-website-product",
                      
                      meta: { title: "产品体系管理", icon: "0", noCache: true }
                    },
                    {
                      path: "home-website-case",
                      name: "Home-website-case",
                      
                      meta: { title: "案例管理", icon: "0", noCache: true }
                    },
                    {
                      path: "home-website-consultation",
                      name: "Home-website-consultation",
                      
                      meta: { title: "资讯管理", icon: "0", noCache: true }
                    }
                  ]
                },
                {
                  path: "bigdata-user",
                  name: "Bigdata-user",
                  
                  meta: { title: "用户管理", icon: "0", noCache: true }
                },
                {
                  path: "bigdata-menu",
                  name: "Bigdata-menu",
                  
                  meta: { title: "功能管理", icon: "0", noCache: true }
                },
                {
                  path: "product",
                  name: "Product",
                  
                  meta: { title: "产品管理", icon: "0", noCache: true }
                }
              ]
            },
            {
              path: "/marketMgr",
              name: "MarketMgr",
              hidden: false,
              meta: {
                title: '营销管理',
                icon: 'money'
              },
              redirect: "/marketMgr/saveOrderTemplate",
              children: [
                {
                  path: "saveOrderTemplate",
                  name: "SaveOrderTemplate",
                  
                  meta: { title: "订单模板", icon: "0", noCache: true }
                },
                {
                  path: "gridManager",
                  name: "GridManager",
                  
                  meta: { title: "网格管理", icon: "0", noCache: true }
                },
                {
                  path: "short-message-manager",
                  name: "Short-message-manager",
                  
                  meta: { title: "短信管理", icon: "0", noCache: true }
                },
                {
                  path: "daily-manager",
                  name: "Daily-manager",
                  
                  meta: { title: "日报管理", icon: "0", noCache: true }
                },
                {
                  path: "trialList",
                  name: "TrialList",
                  
                  meta: { title: "试用申请", icon: "0", noCache: true }
                },
                {
                  path: "spread",
                  name: "Spread",
                  
                  meta: { title: "平台推广", icon: "0", noCache: true }
                },
                {
                  path: "daily-notice",
                  name: "Daily-notice",
                  
                  meta: { title: "通告管理", icon: "0", noCache: true }
                }
              ]
            },
            {
              path: "/log",
              name: "Log",
              meta: {
                title: '日志管理',
                icon: 'education'

              },
              children: [
                {
                  path: "admin",
                  name: "Admin",
                  meta: { title: "后端服务", icon: 'ball', noCache: true }
                },
                {
                  path: "web",
                  name: "Web",
                  meta: { title: "前端服务", icon: 'ball', noCache: true }
                }
              ]
            },
            {
              path: "/about",
              name: "About",
              meta: {
                icon: 'people',
                title: '个人设置'
              },
            },
          ]
        }