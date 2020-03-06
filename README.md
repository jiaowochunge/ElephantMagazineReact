Elephant Magazine on React

--------

### 关于项目
大象公会的仿制版。是对项目 https://github.com/jiaowochunge/DemoWebApp 的实践。<br/>
组件库用的material-ui，路由用的react-router。都是名声在外的库，就不介绍了。<br/>
![gif](https://github.com/jiaowochunge/ElephantMagazineReact/blob/master/em.gif)

### 运行项目
1. 确保你已经安装Cordova，如果你不用在移动端运行，只用在浏览器上看效果，那么不是必须
2. 你必须有node.js环境
3. 项目根目录下运行 `npm install` 。根目录就是 README.md 文件的同级目录
4. 所有依赖安装完毕后，运行 `npm start` 。将自动打开浏览器运行，浏览器中打开开发者工具，窗口调整为移动开发视图
5. 如果你要打包到手机上运行，请参考Cordova教程。

### 开发中遇到的问题
- file-loader无法加载json文件  https://github.com/webpack/webpack/issues/6586
- 微信外链图片无法访问 https://blog.csdn.net/qq_38122518/article/details/78538121
- TODO list: 非常多，不列举了
