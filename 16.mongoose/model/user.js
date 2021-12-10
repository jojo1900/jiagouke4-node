const mongoose = require('./index')
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

module.exports = mongoose.model('User', UserSchema, 'users');