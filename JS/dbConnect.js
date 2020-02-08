// 定义一个操作数据库的库，要求支持mysql,mongodb...
// 都具有CURD操作，约束统一规范，代码复用
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Sql = /** @class */ (function () {
    function Sql() {
    }
    Sql.prototype.insert = function (data) {
        console.log(data);
        return true;
    };
    Sql.prototype.update = function (data) {
        return true;
    };
    Sql.prototype.select = function (data) {
        return true;
    };
    Sql.prototype["delete"] = function (data) {
        return [];
    };
    return Sql;
}());
var mySql = new Sql();
mySql.insert({
    userName: 'admin',
    userPwd: '123456'
});
