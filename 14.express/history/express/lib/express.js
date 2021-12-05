
const Application = require('./application')

// 创建应用的过程   创建路由系统
function createApplication(){// express函数  工厂函数
   return new Application()
}

module.exports = createApplication