// 知识点：
// router 第三方模块
	// 下载：npm install router
	// 作用：传统的创建路由需要获取请求方式和请求地址，然后在对请求方式和请求地址进行判断。传统方式创建路由缺点：难以阅读，且不方便维护
	// 解决：传统方式创建路由，导致难以阅读，且不方便维护的问题
	// 使用步骤：
	//   1、获取路由对象
	//   2、路由接收的请求方式
	//   3、启用路由
	// 语法：
		// const getRouter = require('router')
		// （1）获取路由对象
		// const router = getRouter();

		// （2）路由接收的请求方式
		// 通过 router.get 和 router.post 来区分不同的请求方式
		// router.get('请求地址', (req, res) => {
		//  res.end('Hello World!')
		// })

		// server.on('request', (req, res) => {
		// （3）启用路由
		// 原理：在方法内部会判断当前请求的方式和请求地址是什么，然后执行请求对应的处理函数
		// 特性：第三个参数（回调函数）是必填参数，所以可以传个空回调函数
		//  router(req, res, () => {})

// 引入router模块
const getRouter = require('router');
// 获取路由对象
const router = getRouter();
// 学生信息集合
const Student = require('../model/user');
// 引入模板引擎
const template = require('art-template');
// 引入querystring模块
const querystring = require('querystring');

// 呈递学生档案信息页面
router.get('/add', (req, res) => {
	let html = template('index.art', {});
	res.end(html);
})

// 呈递学生档案信息列表页面
router.get('/list', async (req, res) =>{
	// 查询学生信息
	let students = await Student.find();
	console.log(students);
	let html = template('list.art', {
		students: students
	})
	res.end(html)
})
// 实现学生信息添加功能路由
router.post('/add', (req, res) => {
	// 接收post请求参数
	let formData = '';
	req.on('data', param => {
		formData += param;
	});
	req.on('end', async () => {
		await Student.create(querystring.parse(formData))
		res.writeHead(301, {
			Location: '/list'
		});
		res.end()
	})
});

module.exports = router;