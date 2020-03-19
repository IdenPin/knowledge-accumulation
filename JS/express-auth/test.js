var data = [{"path":"/system","name":"System","redirect":"/system/user","meta":{"title":"系统管理","icon":"password"},"children":[{"path":"user","name":"User","meta":{"title":"用户管理","icon":"ball","noCache":true}},{"path":"role","name":"Role","meta":{"title":"角色管理","icon":"ball","noCache":true}},{"path":"menu","name":"Menu","meta":{"title":"菜单管理","icon":"ball","noCache":true}},{"path":"manage","name":"Manage","meta":{"title":"组织管理","icon":"ball","noCache":true}}]},{"path":"/eco","name":"Eco","meta":{"title":"环保生态圈","icon":"international"},"redirect":"/eco/sp-manager","children":[{"path":"sp-manager","name":"Sp-manager","meta":{"title":"服务商管理","icon":"0","noCache":true},"children":[{"path":"sp-manager-list","name":"Sp-manager-list","meta":{"title":"服务商列表","icon":"0","noCache":true}},{"path":"sp-menu-role","name":"Sp-menu-role","meta":{"title":"权限配置","icon":"0","noCache":true}}]},{"path":"eco-web-page","name":"Eco-web-page","meta":{"title":"Web页面","icon":"0","noCache":true},"children":[{"path":"eco-page-banner","name":"Eco-page-banner","meta":{"title":"首页配置","icon":"0","noCache":true}},{"path":"eco-hot-news","name":"Eco-hot-news","meta":{"title":"热点聚焦","icon":"0","noCache":true}}]}]},{"path":"/log","name":"Log","meta":{"title":"日志管理","icon":"education"},"children":[{"path":"admin","name":"Admin","meta":{"title":"后端服务","icon":"ball","noCache":true}},{"path":"web","name":"Web","meta":{"title":"前端服务","icon":"ball","noCache":true}}]},{"path":"/about","name":"About","meta":{"icon":"people","title":"个人设置"}}]

// 添加deepLevel
var filterPermissionRoutes = (data) => {
  data.forEach(v => {
    // 第一层菜单
    v.deepLevel = 1;
    console.log("path->1：" + v.path);
    if (v.children) {
      v.children.forEach(vv => {
      // 第二层菜单
        vv.deepLevel = 2;
        console.log("path-->2：" + v.path + "/" + vv.path);
        if (vv.children) {
          vv.children.forEach(vvv => {
        // 第三层菜单
            vvv.deepLevel = 3;
            console.log("path--->3：" + v.path + "/" + vv.path + "/" + vvv.path);
          });
        }
      });
    }
  });
};


filterPermissionRoutes(data);
// console.log(data);






