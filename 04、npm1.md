ad**作用：** 第三方包管理根据asasa

**科普：** 能直接使用的模块即第三方模块，由于第三方模块通常都是由多个文件组成并且被放置 在一个文件夹中，所以又名包

**类型：**
  1、库文件。以js文件的形式存在，提供实现项目具体功能的API接口
  2、命令行。以命令行工具形式存在，辅助项目开发

**全球最大的第三方包共享平台：** http://npmjs.com

**node_modules 文件夹：** 用来存放所有已安装到项目中的包

**查看全局第三方包存放路径（mac）：** npm root -g

# 常用命令
  **创建 package，json：** npm init -y
  **安装 package-lock.json 配置文件的 dependencies 配置项中记录的所有包：** npm install
  **安装 开发环境 中的第三方模块：** npm install 包名 --save-dev。简写：npm i 包名 -D
  **安装 开发环境、生成环境 中的第三方模块：** npm install 包名。简写：npm i 包名
  **安装 全局第三方模块：** npm install 包名 -g
  **安装 指定版本号：** 模块名称@版本号（如：webpack@5.42.1）
  **卸载 第三方模块：** npm uninstall 包名
  **卸载 全局第三方模块：** sudo npm uninstall 包名 -g
  **使用局部 插件：** 在 package.json 中的 scripts 配置项中设置一个别名。如："scripts": { "build": webpack}

# npx（5.2 新增）
  **作用：** 从服务器中查找最新的版本，并执行，所以不需要安装包也可以执行，而且不会下载包

  **解决：** npm 必须要下载包才可以执行，并且只能使用下载时的版本，版本更新后，不能自动使用最新版本的问题

# 版本规范
  `vue-router@3.2.0`
  
  1、第 1 位数字：大版本
  2、第 2 位数字：功能版本
  3、第 3 位数字：Bug 修复版本

  **规范：** 只要前面的版本号增长，后面的版本号就要归零

# 包规范
  1、包必须是单独的文件夹
  2、包的顶级目录必须包含 package.json
  3、package.json 中必须包含 name（包名）、version（版本）、main（包入口） 属性

# package-lock.json 配置文件
  **作用：** 用来记录 node_modules 文件夹下的每一个包的下载信息

  ## dependencies 配置项
  **作用：** 记录使用 npm install 包名 --save-dev 安装的包

  ## devDependencies 配置项
  **作用：** 记录使用 npm install 包名 安装的包