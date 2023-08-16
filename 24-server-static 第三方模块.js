// 知识点：
// server-static 第三方模块
	// 下载：npm install server-static
	// 作用：静态资源服务功能。解决静态资源服务的代码之前写过，在做项目的时候我们更希望把项目的关注点放在项目的逻辑上，如果在考虑项目逻辑的同时，还要考虑开发静态服务功能这样的底层代码，项目的开发进度就会被拖慢的问题
	// 使用步骤：
	//   1、获取server-static方法
	//   2、调用方法创建静态资源服务并指定静态资源服务目录
	//   3、启用静态资源服务功能
	// 语法：
		// （1）获取server-static方法
		// const serveStatic = require('serve-static')
		// （2）调用方法创建静态资源服务并指定静态资源服务目录
		// const serve = serveStatic('public')
		// server.on('request', () => {
		// （2）启用静态资源服务功能
		// 原理：在方法内部会判断当前请求是不是静态资源，如果是静态资源，则直接将这个静态资源响应给客户端
		// 特性：第三个参数（回调函数）是必填参数，所以可以传个空回调函数
		//  serve(req, res, () => {})
		// })
		// server.listen(3000)

// public 用于存放静态资源，所以将 css 目录放到 public 中

// 引入http模块
const http = require('http');
// 引入模板引擎
const template = require('art-template');
// 引入path模块
const path = require('path');
// 引入静态资源访问模块
const serveStatic = require('serve-static');
// 引入处理日期的第三方模块
const dateformat = require('dateformat');

const router = require('./route/index');
// 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'))

// 配置模板的根目录
template.defaults.root = path.join(__dirname, 'views');
// 处理日期格式的方法
template.defaults.imports.dateformat = dateformat;

// 数据库连接
require('./model/connect');

// 创建网站服务器
const app = http.createServer();
// 当客户端访问服务器端的时候
app.on('request', (req, res) => {
	// 启用路由功能
	router(req, res, () => {})
	// 启用静态资源访问服务功能
	serve(req, res, () => {})
});
// 端口监听
app.listen(80);
console.log('服务器启动成功');