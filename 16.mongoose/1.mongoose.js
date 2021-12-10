const mongoose = require('mongoose');

// mongo --host mongodb://127.0.0.1:27017/school
mongoose.connect('mongodb://127.0.0.1:27017/school', function (err) {
    if (err) {
        return console.log('链接失败')
    }
    console.log('链接数据成功')
})
// mongoose 要求按照规则来存储数据 （核心目的就是为了让非关系型数据库 更像关系型数据库）

// 1.创建schema 类似于vue中的props 像属性校验

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true, // 用户写的大写的 但是全部转换成小写存储
        trim: true,
        required: true
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        default: 0,
        min: 0,
        max: 120
    },
    gender: {
        type: Number,
        enum: [0, 1],
        validate() { } // 自己校验 返回true 就是校验成功
    },
    timer: {
        type: Date,
        default: Date.now // 默认当前插入的时间
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

// 需要通过集合来操作数据 db.students.insert()  在mongoose中我们称之为模型
// 2.通过schema 来创建模型

let UserModel = mongoose.model('Users', UserSchema, 'users'); // 自动会被命名为 转小写+s

// 3.插入数据

let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push({ username: 'zf', password: '123', age: i, gender: 1 })
}


; (async () => {
    // 1.插入数据
    //     let users = await UserModel.create(arr);
    //     console.log(users);


    // 2.查询一个
    //    let user =  await UserModel.findById('61b35951558da74a348c147d');
    //    let user =  await UserModel.find({_id:'61b35951558da74a348c147d'}); //查询多条

    // 这些find中的查询方式都可以采用原生的写法
    // let user = await UserModel.findOne({ age: { $gt: 5 } });


    // 3.分页查询 

    // const limit = 3;
    // const currentPage = 2;
    // 这里limit 和 skip之间是没有先后的  最终会转化成 先倒叙 跳过多少限制多少
    // let users = await UserModel.find({}).limit(limit).skip((currentPage-1) * limit).sort({age:-1});

    // 关联表查询  类似于关系型数据库 （mongo中不用建立关联）
    


    mongoose.disconnect(); // 操作数据库后自动断开连接

})()
