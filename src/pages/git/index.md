---
title: learn git
date: '2019-08-08'
spoiler: a simple game tic-tac-toe
---

## 什么是Git

- 被最广泛应用的现代软件管理系统
- github上成熟且活跃的开源社区
- 分布式架构
- 支持绝大多数的操作系统和IDE

### 对分布式架构的理解

```
分布式和集中式，典型代表Git/SVN
集中式，中心化的系统，有一个中心服务器，所有的操作都要基于中心服务器，一旦服务器挂了，或者没网了，开发者就没有办法提交
分布式，去中心化，每个人都有又一个完整的库，就是我们的本地仓库，在离线情况下，仍然可以进行提交。
虽然我们平时的工作流程是，每个人的本地仓库提交之后推送到远程仓库，远程仓库看起来好像是一个中心，但其实远程仓库也不过是一个用户而已，实际上你也可以pull张三的库，push给李四等等。
```

##  Git的基本用法

> 再说基本用法之前，我们先理解几个基本概念。

### 工作区（Working Directory）&& 暂存区(stage)/索引(index) && 版本库 && 远程仓库

- 工作区就是你的工作目录

- 版本库，当你执行了git init命令之后，会产生一个隐藏文件，.git，这个就是版本库,下面是.git的目录

```
-rw-r--r--    1  staff     9B Aug  8 17:21 COMMIT_EDITMSG
-rw-r--r--    1  staff    89B Aug  9 10:23 FETCH_HEAD
-rw-r--r--    1  staff    23B Aug  9 10:01 HEAD
-rw-r--r--    1  staff    41B Aug  8 17:21 ORIG_HEAD
-rw-r--r--    1  staff   361B May 29 18:28 config
-rw-r--r--    1  staff    73B May 29 18:26 description
drwxr-xr-x   13  staff   416B May 29 18:26 hooks
-rw-r--r--    1  staff    19K Aug  8 17:21 index
drwxr-xr-x    3  staff    96B May 29 18:26 info
drwxr-xr-x    4  staff   128B May 29 18:27 logs
drwxr-xr-x  150  staff   4.7K Aug  8 17:21 objects
drwxr-xr-x    5  staff   160B May 29 18:28 refs
```

- index就是暂存区，是Git中的重要概念，当对工作区修改/新增文件执行git add 命令之后，就会产生一个新纪录存入暂存区中。

- HEAD是一个游标，当我们创建版本库的时候，git会主动为我们传创建一个分支，master, 此时HEAD指向master,如果你切换到dev分支了，那么HEAD指向的就是dev。

- 

