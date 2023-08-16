// 知识点：模板引擎（第三方模块）
// 下载：npm install art-template
// 作用：让开发者以更加友好的方式拼接字符串，使项目代码更加清晰、更加易于维护
// 特性：后缀名为 art

// 导入模板引擎
const template = require('art-template');
const path = require('path');

// views 目录：用于存放模板文件
const views = path.join(__dirname, 'views', 'index.art');

// template方法 是用来拼接字符串的
// 参数一：模板路径（绝对路径）
// 参数二：要在模板中显示的数据，以对象的形式
// 返回值：返回拼接好的字符串
const html = template(views, {
	name: '张三',
	age: 20
})

console.log(html);

// 语法：
	// 演示：01.art 文件，请打开查看

	// 将数据输出到模板中：
		// 标准语法：{{ 数据 }}
			// 特性：更容易读写
		// EJS模板语法：<%=数据 %>
			// 特性：拥有强大的逻辑处理能力


	// 原文输出：不会解析标签
		// 标准语法：{{@ 数据 }}
		// EJS模板语法：<%-数据 %>

	const views = path.join(__dirname, 'views', '01.art');
	const html = template(views, {
		name: '张三',
		age: 20,
		content: '<h1>我是标题</h1>'
	})
	console.log(html);

// 条件判断：
	// 演示：02.art 文件，请打开查看

	// 	<!-- 标准语法 -->
		// {{if 条件}} ... {{/if}}
		// {{if v1}} ... {{else if v2}} ... {{/if}}
	// <!-- EJS模板语法 -->
		// <% if (value) { %> ... <% } %>
		// <% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>

	const views = path.join(__dirname, 'views', '02.art');
	const html = template(views, {
		name: '张三',
		age: 17
	})
	console.log(html);
	
// 循环：
	// 演示：03.art 文件，请打开查看

	// 	<!-- 标准语法 -->
		//  {{each 数据}}
			//  {{$index}} {{$value}}
		//  {{/each}}
	//  <!-- EJS模板语法 -->
		//  <% for(var i = 0; i < 数据.length; i++){ %>
			//  <%= i %> <%= 数据[i] %>
		//  <% } %>

	const views = path.join(__dirname, 'views', '03.art');
	const html = template(views, {
		users: [{
			name: '张三',
			age: 20,
			sex: '男'
		},{
			name: '李四',
			age: 30,
			sex: '男'
		},{
			name: '玛丽',
			age: 15,
			sex: '女'
		}]
	});
	console.log(html);

// 导入子模板
	// 作用：将网站公共区块(头部、底部)抽离到单独的文件中
	// 演示：04.art 文件，请打开查看

	// 	<!-- 标准语法 -->
		//  {{include './header.art'}}
	//  <!-- EJS模板语法 -->
		//  <% include('./header.art') %>

	const template = require('art-template');
	const path = require('path');

	const views = path.join(__dirname, 'views', '04.art');

	const html = template(views, {
		msg: '我是首页'
	});

	console.log(html);

// 模板继承
	// 作用：将网站公共区块(HTML骨架)抽离到单独的文件中
	// 特性：子模板不能抽离的公共部分，可以使用 模板继承来完成
	// 使用步骤：
		// 1、预留位置：{{block '预留位置名'}}{{/block}}
		// 2、继承模板：{{extend '继承的模板路径/名字'}}
		// 2、填充内容：{{block '预留位置名'}}填充内容{{/block}}
		
	// （1）预留位置
		/* （layout.art）html 骨架：
		<!doctype html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>HTML骨架模板</title>
				{{block 'head'}}{{/block}}
			</head>
			<body>
				{{block 'content'}}{{/block}}
			</body>
		</html>
		*/

	// （2）继承模板（3）填充模板
		/*（index.art）首页模板
			{{extend './layout.art'}}
			{{block 'head'}} <link rel="stylesheet" href="custom.css"> {{/block}}
			{{block 'content'}} <p>This is just an awesome page.</p> {{/block}}
		*/

// 模板配置
	//（1）template.defaults.imports.自定义属性 = 导入的方法
		// 作用：将别人写好的方法通过变量导入到模板中，这样就可以在模板中使用该方法了
	//（2）template.defaults.root = 模板根目录
		// 作用：设置模板根目录。解决模板文件路径拼接代码冗余的问题
	//（3）template.defaults.extname = '.art'
		// 作用：设置模板默认后缀，这样后期使用直接写文件名就可以，不需要加后缀了，系统内部自动添加

	// 需求：获取文字的时间，并呈现给用户
	//   - 问题：从数据库中获取文字的发布时间，但是文字的发布时间是原始的格式，所以需要对文章时间进行格式化
	//   - 解决：使用别人写好的时间格式化方法

	const template = require('art-template');
	const path = require('path');

	// 使用 npm install dateformat 下载
	// dateFormat 第三方模块：对时间进行格式化
	const dateFormat = require('dateformat');

	// 模板文件路径拼接

		// 冗余写法：
		// const views1 = path.join(__dirname, 'views', '06.art');
		// const views2 = path.join(__dirname, 'views', '07.art');
		// const views3 = path.join(__dirname, 'views', '08.art');

		// （2）设置模板的根目录
		// 使用方法：只要设置好模板文件的根目录，后期使用直接写模板文件的名字就可以使用
		template.defaults.root = path.join(__dirname, 'views');

	// （1）导入模板变量
	// 语法：template.defaults.imports.自定义属性 = 导入的方法
	template.defaults.imports.dateFormat = dateFormat;

	// （3）配置模板的默认后缀
	template.defaults.extname = '.art';

	// const html = template(views1, {
	const html = template('06.art', {
		// 创建原始格式的时间 
		time: new Date()
	});

	console.log(template('07', {}));
	console.log(html);