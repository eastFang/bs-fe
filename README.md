# 博客系统前端
- 博客系统，样式仿照ant(ps: 个人喜好，感觉ant 样式蛮好看的；基础、业务组件都是自己写的，不喜勿喷~~~)

# 栈
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
3、withRouter高阶组件包裹component,防止层层传递history

# 启动
- npm i
- npm run start（如果无法启动成功，恭喜你，你入坑了，请找eastFang）

# TODO
- component
  - select、datepicker、cascader onblur 关闭弹框选择 done
  - 增加二次确认弹框、成功提示、失败提示 done
  - Pagination完善 表单筛选 当前页码正确显示 done

## react