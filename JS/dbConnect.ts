// 定义一个操作数据库的库，要求支持mysql,mongodb...
// 都具有CURD操作，约束统一规范，代码复用

interface Db<T> {
  insert(data:T):boolean
  update(data:T):boolean
  select(data:T):boolean
  delete(data:T):any []
}

class User {
  userName: string
  userPwd: string
}

class Sql<T> implements Db<T>{
  insert(data: T): boolean {
    console.log(data)
    return true
  }
  update(data: T): boolean {
    return true
  }
  select(data: T): boolean {
    return true
  }
  delete(data: T): any[] {
    return []
  }
}

let mySql = new Sql<User>()
mySql.insert({
  userName: 'admin',
  userPwd:'123456'
})