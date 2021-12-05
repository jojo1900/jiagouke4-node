const express = require('../express');
const path = require('path')
let router = express.Router(); // 创建一个独立的路由系统 

router.get('/add',function(req,res){ // /user/add
    res.sendFile(path.resolve(__dirname,'../note.md'));
})
router.get('/remove',function(req,res){
    res.end('user - remove')
})

module.exports = router;