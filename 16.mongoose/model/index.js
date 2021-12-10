const mongoose = require('mongoose');
// mongo --host mongodb://127.0.0.1:27017/school
mongoose.connect('mongodb://127.0.0.1:27017/school', function (err) {
    if (err) {
        return console.log('链接失败')
    }
    console.log('链接数据成功')
});

module.exports = mongoose;