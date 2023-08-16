作用：包管理配置文件

生成：npm init
  - 快速生成（询问信息全部采用默认）：npm init -y

解决：
  1、将项目整体拷贝给别人的时候，传输速度会很慢
     - 原理：不用传递 node_modules 文件夹，而是通过传递 package.json 文件
     - 使用方法：将传递过来的 package.json 文件放在项目根目录，并使用 npm install
     - 原理：npm 工具会自动去项目根目录去找 package.json 文件里的 "dependencies" 选项，并下载对应的第三方模块
  2、需要手动记录复杂的模块依赖关系，确保模块的版本和当前保持一致，否则会导致当前项目运行报错
     - 解决原理：使用 npm install 下载时，会产生 package-lock.json 文件，这个文件记录了模块与模块的依赖关系 和 模块的版本

特性：

  项目依赖：使用 npm install 下载插件时，自动记录到 package.json 文件中，并生成一个 "dependencies" 选项
    - 使用方法：npm install 包名 --save（作用：下载 项目依赖 和 开发依赖 中的所有第三方模块）
    - 提示：--save 可以简写为 -S，也可以不写，默认就是这个参数（更推荐使用完整写法，省略不写有些老版本的项目不会生效）

  开发依赖：使用 npm install 下载插件时，自动记录到 package.json 文件中，并生成一个 "devDependencies" 选项
    - 使用方法：npm install 包名 --save-dev（作用：下载 开发依赖 中的所有第三方模块）
    - 提示：--save-dev 可以简写为 -D

询问信息

    项目名字
    package name：(默认当前文件夹的名字)

    项目版本
    version：（默认 1.0.0）

    项目描述
    description：（默认空）

    ...
    默认空

    最后会询问是否确定：直接回车表示 yes

配置参数

    项目主入口文件（主模块）
        说明：采用模块化开发的项目中，都会有一个主入口文件（主模块）
        "main": "index.js"

    命令的别名
        作用：当命令比较长的时候，可以给它取个别名
        语法："别名": "命令"
        "scripts": {
            "build": "nodemon app.js"  功能：执行 app.js 文件
        }
        使用方法：命令行输入 npm run build
          - run：执行

    关键字
        说明：允许使用关键字描述当前项目
         "keywords": []

    项目作者
        "author": "",

    项目遵循的协议（默认 ISC）
      - ISC：开放源代码
        "license": "ISC"

    记录当前项目依赖的第三方模块和版本（项目依赖）
        "dependencies": {
            "formidable": "^1.2.1",
            "mime": "^2.3.1"
        }

    记录当前项目依赖的第三方模块和版本（开发依赖）
        "devDependencies": {
            "gulp": "^3.9.1"
        }

package-lock.json 文件
作用：
    1、锁定包的版本，确保再次下载时不会因为包版本不同而产生问题
    2、加快下载速度，因为该文件中已经记录了项目所依赖第三方包的树状结构和包的下载地址，重新安装时只需下载即可，不需要做额外的工作

特性：会和 package.json 文件进行版本号的对比，版本号不一致，才会根据 package.json 进行更新，修改包版本时，只需修改 package.json 中的版本号即可，无需修改 package-lock.json 文件
*/
// ---------------------------------
console.log('app.js文件被执行了')