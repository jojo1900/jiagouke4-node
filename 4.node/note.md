## npm的使用
> 模块分为三种 （文件模块、内置模块核心模块、第三方模块）



## npm  node package manager 
> node中的包管理器,可以管理我们的第三方模块  （全局模块，局部模块）

## 全局模块
只能在命令行中使用，不能在项目中使用 nrm （安装后可以在任何路径下使用）
```
npm install nrm -g
```

> 怎么自己编写一个全局模块， 去使用。 因为所有的可执行命令都被配置到了环境变量里

> C:\Users\test1\AppData\Roaming\npm\http-server -> C:\Users\test1\AppData\Roaming\npm\node_modules\http-server\bin\http-server 我们全局安装的模块都被放到了 npm文件夹下 （快捷方式） npm下的文件都可以执行，我们写的模块可以直接映射到这个目录下即可


生成package.json
```
npm init -y
```
bin 命令 -》  指定要执行的文件
测试：npm link 将包映射到C:\Users\test1\AppData\Roaming\npm\  全局安装最终就放到这个目录下的 (link只是为了测试使用的)
增加执行文件标识 #! /usr/bin/env node


npm install xxx -g 是安装到了 C:\Users\test1\AppData\Roaming\npm\目录下
我们执行命令的时候  回去找 C:\Users\test1\AppData\Roaming\npm 这里对应的命令  
真正的执行文件 (直接下载的那就直接执行就好了，如果通过软链那么就执行软链后的代码)


## 局部模块
只能在代码中使用， 也有一部分可以在命令中使用  安装时不加 -g  直接被安装到当前目录
 
当前下载的mime 是具备可执行的功能 ，我先走把他安装到了项目目录中，希望能使用这个命令 可以通过npx 执行node_modules/.bin 下的文件

一般安装的webpack gulp 这些工具是放在全局 还是局部呢？ （基本上项目中的依赖都放到项目中，安装到本地保证版本号每个人都一致，这样不会出现问题 ， 需要通过使用 npx的方式调用安装的模块）


安装模块 有依赖方式 
开发依赖 在开发的时候使用  webpack gulp 都属于开发依赖 npm install webpack --save-dev  (上线的时候不需要)
项目依赖 开发上线都需要的依赖  npm install jquery  (默认就是项目依赖)


package-lock.json 可以保证所有用户的安装版本是一致的 
最终上传的git时候会忽略node_module 用户拉取代码后会根据需要安装依赖  （可以通过npm install 安装所有的模块 增加 --production 只安装项目依赖）


- 开发依赖  --save-dev
- 生产依赖  --save 
- 同等依赖 告诉你应该下载这样一个包 只是提醒
- 可选依赖
- 打包的时候打包哪些

## 版本号  （semver 分别由三部分组成  major.minor.patch）
^1.0.0  版本只能是1开头的 其他的可以高于这个版本 1.2.0  ~前两位固定 2.1.x  只要比2.1大就可以 
>= <=  1.0.0~2.0.0   vue@1.1.1-beta.1.1   beta 公测版本  rc版本   正式发布


## npm run 执行命令  npx
>  会将当前的执行路径 node_modules/bin 放到我们的环境变量中 只是临时的  可以留存到packahge.json中 
> npx  可以执行node_modules/bin 也是放到环境变量中 （命令执行完毕后就删除掉）  不能留存到 packahe.json中的