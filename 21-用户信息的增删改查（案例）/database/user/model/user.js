const mongoose = require('mongoose');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	age: {
		type: Number,
		min: 18,
		max: 80
	},
	password: String,
	email: String,
	// 值必须是一个数组，且数组里面的值为字符串
	hobbies: [ String ]
});

// 创建集合 返回集合构造函数
const User = mongoose.model('User', userSchema);

// 将 User 开放出去
module.exports = User;