const express = require('../express');

let router = express.Router(); // 创建一个独立的路由系统 

router.get('/add',function(req,res){ // /user/add
    res.end('user - add')
})
router.get('/remove',function(req,res){
    res.end('user - remove')
})

module.exports = router;