const UserModel = require('./model/user');
const ArticleModel = require('./model/article');
const mongoose = require('./model/index');

(async () => {
    // let article = await ArticleModel.create({
    //     title: '学习mongo',
    //     content: 'xxx',
    //     user_id: '61b35951558da74a348c147d'
    // });
    // console.log(article);
    // mongoose.disconnect();

    // 已知61b35e3efb932c4b281986fe 怎么知道username是谁？
    // let article = await ArticleModel.findById('61b35e3efb932c4b281986fe')
    // let user = await UserModel.findById(article.user_id);
    // console.log(user)

    // let article = await ArticleModel.findById('61b35e3efb932c4b281986fe',{title:1}).populate("user_id",{username:1}); // 会将最终的结果转成用户的信息
    // console.log(article)


    // 原生的mongo就支持 聚合查询 （可以实现mongo的复杂查询 类似于管道操作）

    let r = await ArticleModel.aggregate([ // 写法不简单
        {
            $match: { // 查询条件  调用的是内置的mongo语法
                _id: mongoose.Types.ObjectId('61b35e3efb932c4b281986fe')
            }
        },
        {
            $lookup: {
                from: 'users', // 集合名
                localField: 'user_id', // 我引入的是user_id
                foreignField: '_id',
                as: 'user'
            }
            // 文章的user_id 关联的是User._id
        },
        {
            $project: { // find({},{显示或者隐藏})
                user: 1
            }
        },
        // 按照某个字段分类 求平均值 求和...
        {
            $group:{
                // 可以引用谁 进行数据的分组
            }
        }
    ])
    console.log(JSON.stringify(r))

})()
