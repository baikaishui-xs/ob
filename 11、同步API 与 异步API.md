// 知识点：异步API
// 特性：当前API的执行不会阻塞后续代码的执行

console.log('before');

setTimeout(function (){
	console.log('last');
}, 2000)

console.log('after');

// 同步API, 异步API的区别（ 获取返回值 ）
// 特性：
//   - 同步API通过 return 拿到API执行的结果
//   - 异步API通过 回调函数（参数的形式）拿到API执行的结果

// 同步API通过返回值获取结果
	// function sum (n1, n2) {
	// 	return n1 + n2;
	// }
	// const result = sum (10, 20);

// 异步API通过返回值获取结果
	// function getMsg(callback) {
	// 	setTimeout(function () {
	// 		return{ 
	// 			msg: 'hello node.js'
	// 		}
	// 	}, 2000)
	// 	// 特性：异步API不会阻塞后续代码的执行，所以当函数执行完毕时，如果没有 return，系统会自动 return 一个 undefined 的结果，当定时器触发时，msg 已经拿到 undefined 这个结果，并输出了，所以为 undefined
	// 	//   - 如：return undefined
	// }
	// const msg = getMsg();
	// console.log(msg);
	// // 输出：undefined
	// // 异步API无法通过返回值获取结果

// 异步API通过回调函数获取返回结果
	// 回调函数的作用：让异步API的结果返回出去
	// 实现原理：异步API通过回调函数拿到结果：如果 getMsg API里有异步操作，可以调用 callback 函数，通过实参，把 123 传递给形参的方式，让匿名函数拿到这个结果 
	// callback 是形参的名字，对应的实参是一个匿名函数，callback 这个名字就相当于匿名函数的名字
	function getMsg(callback) {
		setTimeout(function () {
			callback({
				msg: 'hello node.js'
			})
		}, 2000)
	}
	// 通过这个回调函数就可以拿到异步 API 执行的结果
	getMsg(function (data) {
		console.log(data);
	});

