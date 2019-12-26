// 数据劫持
function Observe(data) {
  for(key in data) {
    let val = data[key]
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        console.log('get:', val)
        return val
      },
      set(newVal){
        if(val === newVal) {
          return false
        }
        val = newVal
        observe(newVal)
      }
    })
  }
}

// 入口
function observe(data) {
  if(!data || typeof data !== 'object') {
    return false
  }
  new Observe(data)
}
// var foo = { name: 'pdeng', age: 20, hobby: ['lol', 'movie'] }