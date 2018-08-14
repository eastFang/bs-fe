# 心路历程
- react、react-dom
- webpack、webpack-cli
- babel-loader、.babelrc
- html-loader、htmlwebpackplugin
- scss-loader、css-loader、style-loader
- eslint
- react-router
- redux、react-redux
- flyio、webpack-api-mocker
- prop-types
- file-loader
- braft-editor

# 优化

- 拆包
https://zhuanlan.zhihu.com/p/26710831<br>
1、将业务代码依赖的公共库代码抽离成 vendor.js(如react react-dom 等)<br>
2、用react-loadable结合webpack，支持import动态加载语法，实现按需加载

# 启动
- npm i
- npm run start（如果无法启动成功，恭喜你，你入坑了，请找eastFang）