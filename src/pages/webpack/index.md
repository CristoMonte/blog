---
title: learn webpack
date: '2020-01-16'
spoiler: webpack学习
---

### 学习目标
1 一个礼拜学习基本的webpack配置

2 由浅入深

3 从局部到整体，再从整体到局部细节。

### 开始
1 output最低要求是一个含有filename的对象，webpack默认将打包后的文件命名为filename对应的属性，默认在dist文件下。

2 rimraf是node环境下的rm -rf 

3 webpack只能理解js文件和json文件，如果需要打包处理其他文件，需要使用相应的loader去处理， loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。

4 [loader从右往左地取值执行](https://webpack.docschina.org/concepts/loaders)

5 `process.cwd()`, `__dirname`,` __filename`, 分别代表工作目录的绝对路径， 当前文件所在目录的绝对路径， 当前文件的绝对路径

6 path.resolve和path.join
`path.join('/bar', '/baz', 'foo') // /bar/baz/foo`
`path.resolve('/bar', '/baz', 'foo') // /baz/foo`