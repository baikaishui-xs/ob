/*
    知识点：mongoDB数据库
    下载地址：https://www.mongodb.com/download-center/community
    作用：
        1、存储 动态网站中的数据
        2、存储 表单收集的用户信息
        3、对数据进行高效的管理
    操作数据库方式：
        1、通过 数据库提供的 API
        2、通过 图形界面

    MongoDB数据库下载安装（MacOS系统）
        使用 Homebrew 方法进行安装：
            作用：苹果系统的软件包管理器
            安装方法：复制官网的下载命令，到终端里进行安装
            命令失败的解决方法：
                - BUG：curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
                - 原因：这个地址被禁了，需要梯子才能访问
                - 解决方法：使用镜像下载 https://gitee.com/cunkai/HomebrewCN
                - 在终端下载完成后，会在桌面上生成一个 Old_Homebrew 文件夹，无论之前有没有安装过 Homeberw ，会把之前通过
            提示：Homeberw 安装过的东西备份到这个文件夹，如果 Old_Homebrew 里面没有你需要的文件，直接删除 Old_Homebrew 即可
            提示：终端输入 brew，会显示 brew 的使用命令
            2、使用 brew 安装 MongoDB：https://www.runoob.com/mongodb/mongodb-osx-install.html
            测试：如果可以访问 http://localhost:27017/ 代表安装成功
            - 提示：安装完成后系统自动启动了 MongoDB，无需手动启动

    嵌套关系：database > collection > document > field
        1、database 数据库
        2、collection 集合，一组数据的集合，可以理解为JavaScript中的数组
        3、document 文档，一条具体的数据，可以理解为JavaScript中的对象
        4、field 字段，文档中的属性名称，可以理解为JavaScript中的对象属性
 */
    
    // mongoose 第三方模块
        // 下载：npm install mongoose
        // 作用：
            // 1、让 Node.js 可以操作 MongoDB数据库
            // 2、连接 / 创建 mongodb 数据库

        // （1）启动数据库
            // window：
                // 命令：net start mongoDB
                // 停止数据库：net stop mongoDB
            // MacOS
                // 命令：brew services start mongodb-community@4.4

        // （2）连接数据库
            // 语法：mongoose.connect('mongodb://要连接的数据库地址及名字', { useNewUrlParser: true })
            //   - 如果要连接的这个数据库不存在，则自动创建这个数据库
            //   - useNewUrlParser: true 作用：使用新的解析器。解决 url 解析器已被废弃，将来的版本也会被删除掉的错误信息的问题
            // 返回值：promise 对象

            const mongoose = require('mongoose');
            
            // 链接数据库
            mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true})
                // 连接成功
                .then(() => console.log('数据库连接成功'))
                // 连接失败
                .catch(err => console.log(err, '数据库连接失败'));

        // （2）创建集合
            // 1、创建集合规则
            // 2、创建集合

                // （1）mongoose.Schema
                    // 作用：创建集合规则（设置字段的类型）
                    // 特性：mongoose.Schema 是一个构造函数
                    const courseSchema = new mongoose.Schema({
                        name: String,
                        author: String,
                        isPublished: Boolean,
                        hobbies: [String]
                    });

                // （2）mongoose.model('集合名称', 集合规则)
                    // 作用：创建集合
                    // 特性：这里集合名称首字母必须要大写，但是数据库创建出来的集合名称其实是小写的，后面还会跟一个s
                    // 返回值：一个构造函数
                    const Course = mongoose.model('Course', courseSchema) // courses

            // 注意：即使创建了集合，没有文档（数据），在 mongodb 图形界面里也不会显示 playground 这个数据库

        // （3）创建文档
            // 方法一：创建集合的同时创建文档
            // 1、创建集合实例
            // 2、将数据插入到数据库中
            
                // （1）创建集合实例
                    const course = new Course({
                        name: 'node.js基础',
                        author: '黑马讲师',
                        isPublished: true,
                    });
                
                // （2）将数据插入到数据库中 
                    // save()：将数据插入到数据库中 
                    course.save(); 	
        
            // 方法二 集合.create
                // 接收异步 API 结果的方式：
                //   1、使用回调函数
                //   2、使用 promise 对象

                    // 1）使用回调函数
                    // Course.create({name: 'Javascript123', author: '黑马讲师', isPublished: false}, (err, doc) => {
                    // 	// 错误对象
                    // 	console.log(err)
                    // 	// 当前插入的文档
                    // 	console.log(doc)
                    //    });

                    // 2）使用 promise 对象（推荐）
                    Course.create({name: 'Javascript123', author: '黑马讲师', isPublished: false})
                    .then(doc => console.log(doc))
                    .catch(err => console.log(err))


        // 测试：
            // 打开图形界面，
            // 终端输入 node 02.js，
            // 点击刷新按钮，出现 playground 这个数据库代表创建集合成功

        // 提示：_id ObjectId 字段是数据库自动生成的，表示当前数据的唯一标识
            
        // （4）导入数据
            // 配置环境变量（MacOS无需设置）：找到 mongodb 数据库的安装目录，将安装目录下的bin目录放置在环境变量中。
            
            // 方法：mongoimport –d 数据库名称 –c 集合名称 –file 要导入的数据文件
            // 例子：mongoimport -d playground -c users --file ./user.json
            // 提示：导入数据完成后，记得去图形界面中查看是否添加正确

            // 命令行提示：
                // onnected to: mongodb://localhost/   （连接本机数据库）
                // 6 document(s) imported successfully. 0 document(s) failed to import    （已成功导入6个文档。0个文档导入失败）