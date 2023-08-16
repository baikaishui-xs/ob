**公共代码：**
  ```js
  // 导入 url 模块
  const url = require('url');
  ```

## 解析 url
  **语法：** url.parse()

  **参数一：** 要解析的 url 地址
  **参数二：** 是否将参数解析成对象形式（默认否）。boolean

  **属性**
  1、query：参数
  2、pathname：路径

  **例子：**
  ```js
  const demoUrl = 'http://127.0.0.1:8080/view/demo.index?name=zs&age=20'
  url.parse(demoUrl, true).query // 返回值：{ name: 'zs', age: '20' }
  url.parse(demoUrl, true).pathname // 返回值：'/view/demo.index'
  ```