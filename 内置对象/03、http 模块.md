**公共代码：**
```js
// 导入 http 模块
const Http = require('http');
```

**作用：** 创建 web 服务器

# 创建 Web 服务器
  ## 1、创建 Web 服务器实例
  ```js
  const server = Http.createServer()
  ```

  ## 2、为服务器实例绑定 request 事件
  **request 事件：** 服务器收到请求后触发
  
  ```js
  server.on('request', (req, res) => {
    /* req：请求对象
    1、req.url：请求的 URL 地址
    2、req.method：请求方式
    */

    /* req：响应对象
    1、res.end()：将数据响应给客户端，并结束当前请求的处理
    */

    console.log('服务器收到请求，正在处理中...')
    console.log(req.url)
    console.log(req.method)
    res.end(req.url + req.method)
  })
  ```

  ## 3、启动服务器
  **方法：** server.listen()

  **参数一：** 端口号
  **参数二：** 回调函数。服务器启动成功后触发

  ```js
  server.listen(8080, () => {
    console.log('服务器启动成功：http://127.0.0.1:8080')
  })
  ```

# 【BUG】解决响应中文导致乱码的问题
  **解决方式：** 将响应头的 Content-Type 的值设置为 text/html; charset=utf-8
  ```js
  server.on('request', (req, res) => {
    const str = '我是中文数据'
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(str)
  })
  ```

  ## 设置响应头
  **语法：** 响应对象.setHeader()
  
  **参数一：** 响应头中的属性名。string
  **参数二：** 响应头中的属性值。string

# 路由（客户端的请求和服务器处理函数的对应关系）
  ```js
  server.on('request', (req, res) => {
    const url = req.url
    let resData = '<h1>404 Not found!</h1>'
    if (url === '/' || url === '/index.html') {
      resData = '<h1>首页</h1>'
    }
    if (url === '/demo.html') {
      resData = '<h1>测试页</h1>'
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(resData)
  })
  ```

# 将【文件操作模块】笔记的案例一中存放在 clock 文件夹中的三个文件放到服务器中，并响应给客户端
  **需求：** 浏览器请求以下路径要响应对应的数据
  1、http://127.0.0.1:8080/index.html
  2、http://127.0.0.1:8080/index.css
  3、http://127.0.0.1:8080/index.js

  ## 1、导入模块
  ```js
  const Http = require('http')
  const Fs = require('fs')
  const Path = require('path')
  ```

  ## 2、创建 Web 服务器
  ```js
  const server = Http.createServer()
  server.on('request', (req, res) => {})
  server.listen(8080, () => {
    console.log('服务器启动成功：http://127.0.0.1')
  })
  ```

  ## 3、将资源的请求 url 地址映射为文件的存放路径
  ```js
  server.on('request', (req, res) => {

    -- 增
    const url = req.url
    let = resDataPath = ''

    // 判断请求的是否为首页
    if (url === '/') {
      resDataPath = Path.join(__dirname, './clock/index.html')
    } else {
      resDataPath = Path.join(__dirname, '/clock', url)
    }
    --

  })
  ```

  ## 4、读取文件的内容并响应给客户端
  ```js
  server.on('request', (req, res) => {

    -- 增
    Fs.readFile(resDataPath, 'utf8', (err, content) => {
      if (err) return res.end('404 Not fount')
      res.end(content)
    })
    --

  })
  ```