// 请求参数
// 作用：携带客户信息

// （1）GET 请求参数
    // 特性：数据存放在 地址栏中
        // 例子：http://localhost:3000/?参数
            // http://localhost:3000/?name=zhangsan&age=20
    // 请求途径：
        // 1、地址栏
        // 2、link标签 的 href属性     <link rel="stylesheet" href="base.css">
        // 3、script标签 的 src属性    <script src="index.js"></script>
        // 4、img标签 的 src属性       <img src="login.png">
        // 5、Form 表单 提交           <form action="example.cn"></form>

    // 获取 GET 请求参数
        // url.parse(要解析的url地址, 【是否将参数解析成对象形式（默认否）】)
        //   - 参数默认是字符串格式，转换成对象格式更方便使用
        // 作用：解析 url 地址（包含 路径、参数  等信息）
        // url.parse.query：只存储参数
        // url.parse.pathname：只存储路径
        const url = require('url');
        let { query, pathname } = url.parse(req.url, true);

// （2）POST 请求参数
    // 特性
        // 1、数据存放在 请求体中
        // 2、理论上 post 参数的数据量可以是无限的，所以为了减轻服务器的压力，post 参数并不是一次接收完，而是分多次接收
    // 请求途径：Form 表单提交
        /*
            method: 指定当前表单提交的方式
                - GET（不写该属性默认 GET）：在地址栏中与参数的形式进行参数
                - POST：在请求报文中进行传输

            action: 指定当前表单提交的地址（一般都填服务端的地址）
            每个表单必须要有名字，因为服务器通过名字来获取内容
            <form method="post" action="http://localhost:3000">
                <input type="text" name="username">
                <input type="password" name="password">
                <input type="submit">
            </form>
        */
    // 获取 POST 请求参数
    // 接收方式：data 事件 + end 事件
    // querystring.parse(post 参数))
        // 作用：将 post 请求中以字符串显示的参数，转换为对象
        
        const querystring = require('querystring');
        app.on('request', (req, res) => {
            let postData = '';
            // data 事件：当请求参数传递的时候触发
            req.on('data', (chunk) => postData += chunk);
            // end  事件：当请求参数传递完成的时候触发
            req.on('end', () => {
                console.log(querystring.parse(postData));
            });
        });


// （3）路由
    // 作用：根据不同的地址响应不同的内容

    const http = require('http');
    const url = require('url');

    const app = http.createServer();

    app.on('request', (req, res) => {
        
        // 获取请求方式
        // 为了在判断的时候方便，通常会转换为小写
        const method = req.method.toLowerCase();

        // 获取请求地址
        const pathname = url.parse(req.url).pathname;

        // 定义响应内容的解析方式
        res.writeHead(200, {
            'content-type': 'text/html;charset=utf8'
        });

        // 根据不同的请求方式，响应不同的内容
        if (method == 'get') {
            if (pathname == '/' || pathname == '/index') {
                res.end('欢迎来到首页')
            }else if (pathname == '/list') {
                res.end('欢迎来到列表页')
            }else {
                res.end('您访问的页面不存在')
            }
        } else if (method == 'post') {
        }
    });

    app.listen(3000);
    console.log('服务器启动成功')
    
// （4）静态资源
    // 概念：服务器端不需要处理，可以直接响应给客户端的资源就是静态资源
    // public 目录下存放的都是静态资源

    const http = require('http');
    const url = require('url');
    const path = require('path');
    const fs = require('fs');

    // 引入 mime 第三方模块
    const mime = require('mime');

    const app = http.createServer();

    app.on('request', (req, res) => {
        // 获取用户的请求路径
        let pathname = url.parse(req.url).pathname;

        // 功能：用户什么都不输入访问的是 default.html
        pathname = pathname == '/' ? '/default.html' : pathname;

        // 将用户的请求路径转换为实际的服务器真实路径
        // 注意：因为跨平台的兼容性，不建议使用 / 进行拼接，推荐使用 __dirname
        let realPath = path.join(__dirname,  'public' + pathname); 

        // mime 第三方模块
        // 下载：npm install mime
        // mime.getType(路径)
        // 作用：根据当前请求的路径，去响应这个请求的类型
        // 解决：浏览器执行 HTML 文件，当执行到外链文件的代码（如 link、script、img 等）时，会自动向服务器端发送请求，而服务器端会去读取这个文件，并做出响应，但是每次读取的文件类型可能是不一样的，导致 content-type 的值无法写死的问题
        //   - 在控制台中的 Network 中可以查看请求的外链文件
        // console.log(mime.getType(realPath));
        let type = mime.getType(realPath)

        // 读取文件
        fs.readFile(realPath, (error, result) => {
            // 如果文件读取失败
            if (error != null) {
                res.writeHead(404, {
                    'content-type': 'text/html;charset=utf8' // 需要这段代码才可以输出 '文件读取失败'
                    // 提示：因为 HTML 文件内部已经设置了 utf-8，所以 HTML 不需要设置编码
                })
                res.end('文件读取失败');
                return;
            }

            res.writeHead(200, {
                'content-type': type
                // 浏览器隐患： 
                    // 如果设置了 content-type，响应报文中会显示这个选项，
                    // 如果没设置就不会有该选项，但是代码也可以正常运行，
                    // 因为高级浏览器会进行优化，
                    // 但是旧版本的浏览器可能会出现问题 
            })

            res.end(result);
        });
    });

    app.listen(3000);
    console.log('服务器启动成功')

    // 测试：
    //   - 浏览器地址栏输入 localhost: 3000/default.html 
    //   - 浏览器地址栏输入 localhost: 3000/artic le.html 
    