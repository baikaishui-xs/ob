const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true})
	.then(() => console.log('数据库连接成功'))
	.catch(err => console.log(err, '数据库连接失败'));

// 知识点： mongoose 验证
// 作用：设置字段的验证规则
// 特性：如果不准守字段的验证规则，则插入文档不成功，报错
// 字段的特性：默认情况下字段是可以传值和不传值的

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		// 必选字段：required: [true, '自定义报错信息']
		required: [true, '请传入文章标题'],
		// 规定字符串的最小长度
		minlength: [2, '文章标题长度不能小于2'],
		// 规定字符串的最大长度
		maxlength: [5, '文章标题长度最大不能超过5'],
		// 去除字符串两边的空格
		trim: true
	},
	age: {
		type: Number,
		// 数字的最小范围
		min: 18,
		// 数字的最大范围
		max: 100
	},
	// publishDate（发布时间）
	publishDate: {
		// Date：数字类型
		type: Date,

		// default：默认值。如果用户传值，则使用用户传过来的值，如果用户不传值，则使用默认的值
		// Date.now：获取当前时间 
		default: Date.now
	},
	category: {
		type: String,
		// enum：枚举。当前字段只能使用枚举中的值
		enum: {
			values: ['html', 'css', 'javascript', 'node.js'],
			// message：自定义错误信息
			message: '分类名称要在一定的范围内才可以'
		}
	},
	author: {
		type: String,
		// validate：自定义验证规则
		validate: {
			validator: v => {
			// 返回布尔值
			// true 验证成功
			// false 验证失败
			// v 接收用户传递的值

				// 验证用户传递的值
				// 如果用户传递了一个值，并且长度大于4，则验证通过
				return v && v.length > 4
			},
			message: '传入的值不符合验证规则'
		}
	}
});

const Post = mongoose.model('Post', postSchema);

// 报错，无法插入数据，因为 title 必须填写
// Post.create({}).then(result => console.log(result))

Post.create({title:'      aa      ', age: 60, category: 'java', author: 'bd'})
	.then(result => console.log(result))
	// 下列代码的作用：解决验证失败时，程序内部会自动把错误信息输出到控制台中，这个错误信息非常的多，不利于阅读的问题。只需要输出自定义的错误信息即可，不需要其它的信息
	.catch(error => {
		// 获取错误信息对象
		const err = error.errors;
		// 循环错误信息对象
		for (var attr in err) {
			// 将错误信息打印到控制台中
			console.log(err[attr]['message']);
		}
	})
