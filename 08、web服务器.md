// 知识点：创建web服务器

// 创建web服务器 骨架：
    // const http = require('http');
    // const app = http.createServer();
    // app.on('request', (req, res) => {
    //        res.end('<h1>hi, user</h1>');
    // });
    // app.listen(3000);
    // console.log('服务器已启动，监听3000端口，请访问 localhost:3000')

// http 模块
    // 作用：创建网站服务器
    const http = require('http');

// url 模块
    // 作用：处理 url 地址
	const url = require('url');

// 创建网站服务器对象
	const app = http.createServer();

// app.on：请求事件。当接收到请求时触发
// 语法：app.on('请求事件名', 回调函数）
//   - 回调函数
//     - req：请求对象。包含了请求相关的信息
//     - res：响应对象。包含了响应相关的信息 

	// request 事件：当接收到请求时触发
	app.on('request', (req, res) => {
		
	// 响应
	// res.end('<h1>hi, user</h1>');
	
	// req.headers
	// 作用：获取请求报文
	// 获取请求报文里的属性：req.headers['属性名']
	// console.log(req.headers['accept']); 
	
	// res.writeHead(状态码，设置响应报文)
	// 作用：设置响应报文
	res.writeHead(200, {

		// 'content-type': '解析方式;【charset=解析编码】'
		// 作用：告诉浏览器响应的内容如何进行解析
			// 	'content-type': 'text/plain'				// 解析成纯文本
			// 	'content-type': 'text/html'					// 解析 html 标签
				'content-type': 'text/html;charset=utf8'	// 解析 html 标签，并且可以解析中文 
		
	});

	// req.url
	// 作用：获取请求地址
	// 使用场景：
	//   （1）根据不同的地址返回不同的内容
	//   （2）接收 GET 请求
	// 特性：没有请求地址时，返回 /
	//   - 如：localhost:3000，返回 /
		
	// （1）根据不同的地址响应不同的内容（这种方式也被称为路由）
	// BUG：如果地址栏带有参数，则只会返回 not found 的问题
	//   - 方法一：使用字符串截取
	//   - 方法二：使用 url 内置模块里的 url.parse 对象中的 pathname 属性进行判断
		
		// BUG 写法：
			// if (req.url == '/index' || req.url == '/') {
			// 	res.end('<h2>欢迎来到首页</h2>');
			// }else if (req.url == '/list') {
			// 	res.end('welcome to listpage');
			// }else {
			// 	res.end('not found');
			// }
		
		// 方法二：
			// url.parse(要解析的url地址, 【是否将参数解析成对象形式（默认否）】)
			//   - 参数默认是字符串格式，转换成对象格式更方便使用
			// 作用：解析 url 地址（包含 路径、参数  等信息）
				 
			// url.parse.query：只存储参数
			// url.parse.pathname：只存储路径
				
			let { query, pathname } = url.parse(req.url, true);
			console.log(query.name)
			console.log(query.age)
		
			if (pathname == '/index' || pathname == '/') {
				res.end('<h2>欢迎来到首页</h2>');
			}else if (pathname == '/list') {
				res.end('welcome to listpage');
			}else {
				res.end('not found');
			}
	
	// （2）接收 GET 请求
	// let { query, pathname } = url.parse(req.url, true);
	// console.log(query.name)
	// console.log(query.age)
		
	
	// req.method
	// 作用：获取请求方式
	// 使用场景：根据不同的请求方式，响应不同的内容 
		// if (req.method == 'POST') {
		// 	res.end('post')
		// } else if (req.method == 'GET') {
		// 	res.end('get')
		// }

	// res.end('<h2>hello user</h2>');
});
// app.listen：监听端口，启动成功后调用回调函数
app.listen(3000, () => {
	console.log('网站服务器启动成功');
});

// 测试：
//   - 命令行输入 nodemon app.js
//   - 打开浏览器，在地址栏输入 localhost:3000/?name=zhengcunrui&age=18
// 注意：
//   - 命令行工具看到两个相同的输出是因为地址栏和图标都发送了一次请求,
// 	   输出 undefined 是图标发出的请求
//   - 必须要输出 res.end ，浏览器才能正常访问