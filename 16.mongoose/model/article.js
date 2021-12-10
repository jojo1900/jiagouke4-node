const mongoose = require('./index');


let ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    updateTime: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        //  ref: 'User' // 外键 这种方式是强制产生关联 不太好
    }
})
module.exports = mongoose.model('Article', ArticleSchema)

// 怎么关联呢？ 用户写了某个文章  文章得知道哪个用户写的