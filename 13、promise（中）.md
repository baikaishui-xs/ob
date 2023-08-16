# 作用
	1、将异步 API 转换为同步 API

# 捕获异常的方式
	then()：接收 resolve() 传递出来的结果
	catch()：接收 reject() 传递出来的结果

# 静态方法
	all()：等待机制。发起并行的异步 API，等待所有的异步 API 返回结果，才会继续往下执行
	race()：赛跑机制。发起并行的异步 API，只要任何一个异步 API 返回结果，就会继续往下执行

# 扩展
	## 例子
	const fs = require('fs');
	（1）封装异步操作，并将异步 API 的结果返回出去
		let promise = new Promise((resolve, reject) => {
		// resolve 作用：把异步API执行成功的结果传递出去
		// reject  作用：把异步API执行失败的结果传递出去
		
			fs.readFile('./a.txt', 'utf8', (err, result) => {
				if (err != null) {
					reject(err);
				}else {
					resolve(result);
				}
			});
		});

		// promise.then (result => {}, error => {})：预先指定 成功 和 失败 的回调函数
			// result：失败 的回调函数
			// error：成功 的回调函数

		// promise.then： 输出异步API执行 成功的结果
		// promise.catch：输出异步API执行 失败的结果
		
		promise.then((resolve) => {
			// 通过参数拿到执行成功的结果
			console.log(resolve);
		}).catch((reject) => {
			// 通过参数拿到执行失败的结果
			console.log(reject);
		})

	// （2）弥补回调地狱的缺点
	// 需求：依次读取A文件、B文件、C文件
	// 原理：使用函数，来让文件依次读取
		function p1 () {
			return new Promise ((resolve, reject) => {
				fs.readFile('./a.txt', 'utf8', (err, result) => {
					resolve(result)
				})
			});
		}

		function p2 () {
			return new Promise ((resolve, reject) => {
				fs.readFile('./b.txt', 'utf8', (err, result) => {
					resolve(result)
				})
			});
		}

		function p3 () {
			return new Promise ((resolve, reject) => {
				fs.readFile('./c.txt', 'utf8', (err, result) => {
					resolve(result)
				})
			});
		}

		p1().then((r1) => {
			console.log(r1);
			// 因为使用了链式编程，要想让下一个 then 拿到 p2 的结果，需要在这里把 p2 的结果 return 出去
			// return 出去的是一个 Promise 对象
			return p2();
		})
		.then((r2) => {
			console.log(r2);
			return p3();
		})
		.then((r3) => {
			console.log(r3)
		})
