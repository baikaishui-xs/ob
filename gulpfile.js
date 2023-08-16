// Gulp（第三方模块）

    // 下载：npm install gulp-cli -g
    // 作用：前端构建工具（将机械化操作编写成任务, 想要执行机械化操作时执行一个命令，任务就能自动执行，用机器代替手工，提高开发效率）
    // 使用方法：
    // 1、在项目根目录 新建 gulpfile.js，并在该文件中编写任务
	// 2、在项目根目录 执行 gulp 任务名称
	// 特性：src目录 放置原代码文件 dist目录 放置构建后文件

// 引用gulp模块
const gulp = require('gulp');

// gulp 中的插件

	// 压缩 html 文件
		// 下载：npm install --save gulp-htmlmin
		const htmlmin = require('gulp-htmlmin');

	// 引入 html 公共部分
		// 下载：npm install gulp-file-include
		// 使用方法：
		//   1、在 src 目录中创建一个 common 目录，并创建一个 html 文件，一个 html 文件对应一个公共部分，如有公共头部和公共尾部，公共头部放一个 html 文件，公共尾部放一个 html 文件
		//   2、然后把公共的部分删掉
		//   3、通过 @@include('公共文件路径') 引入公共文件
		const fileinclude = require('gulp-file-include');

	// less 语法转换
		// 下载：npm install gulp-less
		const less = require('gulp-less');
		
	// 压缩 css 文件
		// 下载：npm install gulp-less
		const csso = require('gulp-csso');
		
	// js 语法转换（ES6 转 SE5）
		// 下载：npm install --save-dev gulp-babel @babel/core @babel/preset-env
		//   - @babel/core @babel/preset-env：gulp-babel 依赖的插件
		const babel = require('gulp-babel');

	// 压缩 js 文件
		// 下载：npm install gulp-uglify
		const uglify = require('gulp-uglify');

	// 扩展：
	//   1、--save：在最新的 html 版本中，这个参数已经没有作用了，可以省略
	//   2、--save-dev：这个参数是有用的，后续课程会讲解
	//   3、npm install 后面跟多个名字，并且以空格隔开，代表同时下载多个插件

// 建立任务
	// 语法：gulp.task('任务的名称', 回调函数)

	// 例子：
		gulp.task('first', () => {
			console.log('我们人生中的第一个gulp任务执行了');

			// gulp.src：获取要处理的文件
			gulp.src('./src/css/base.css')
				
			// pipe：处理
			// 语法：.pipe(要处理的代码)
			// 不能使用 .dest，因为 .dest 是文件处理的一种方式
			
			// gulp.dest()：输出文件
			// 特性：如果没有这个 目录/文件 会自动创建这个 目录/文件
				.pipe(gulp.dest('dist/css'));
		});

	// htmlmin 任务
		// 功能：
		//   1、压缩 html 文件
		//   2、引入 html 公共部分
		gulp.task('htmlmin', () => {
			gulp.src('./src/*.html')
				.pipe(fileinclude())
				// collapseWhitespace：是否压缩空格
				.pipe(htmlmin({ collapseWhitespace: true }))
				.pipe(gulp.dest('dist'));
		});

	// cssmin 任务
		// 功能：
		//   1、less语法转换
		//   2、压缩 css 文件
		gulp.task('cssmin', () => {
			// 选择多个文件，可以用数组的形式
			gulp.src(['./src/css/*.less', './src/css/*.css'])
				.pipe(less())
				.pipe(csso())
				.pipe(gulp.dest('dist/css'))
		});

	// jsmin 任务
		// 功能：
		//   1、es6 代码转换
		//   2、压缩 js 文件
		gulp.task('jsmin', () => {
			gulp.src('./src/js/*.js')
				.pipe(babel({
					presets: ['@babel/env']
				}))
				.pipe(uglify())
				.pipe(gulp.dest('dist/js'))
		});

	// copy 任务
		// 功能：拷贝文件夹
		// 作用：将 src 目录下的 images 和 lib 文件夹复制到 dist 中
		gulp.task('copy', () => {
			gulp.src('./src/images/*')
				.pipe(gulp.dest('dist/images'));
			gulp.src('./src/lib/*')
				.pipe(gulp.dest('dist/lib'))
		});

	// default（构建任务）：执行一个任务，其它任务也会依次执行
	//   - 当任务名为 default 时，可以省略，直接写 gulp 即可
		gulp.task('default', ['htmlmin', 'cssmin', 'jsmin', 'copy']);