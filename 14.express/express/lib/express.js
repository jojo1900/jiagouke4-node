
const Application = require('./application')
const Router = require('./router');

function createApplication(){ // express
   return new Application()  // let app = express()
}
createApplication.Router = Router; // new Router()   express.Router()

module.exports = createApplication