---
title: react-native
date: '2019-12-17'
spoiler: react-native开发过程中遇到的一些问题
---

> 记录一些在使用rn的时候遇到的问题，不限于rn，也包括一些rn生态

### 无法实现ScrollView嵌套ScrollView的结构
ScrollView竖向滚动无法嵌套ScrollView竖向滚动，但是ScrollView竖向滚动可以嵌套ScrollView横向滚动；如果只是简单的实现一种顶部固定，下面内容可滚动的布局，FlatList有一个ListHeaderComponent的属性，可以实现这种布局，但是如果要实现，上中下，整体可滚动，中间部分滚动吸顶，下面内容可滚动，这种布局，就需要使用一些小技巧了，使用的是SectionList

```jsx
<SectionList
  stickySectionHeadersEnabled
  ListHeaderComponent={<Header />}
  sections={[{ title: '', data: list }]}
  renderSectionHeader={title => <stickHeader/>}
  renderItem={({ item }) => <ItemComponent/>}
></SectionList>
```

### FlatList和SectionList的onEndReached上拉一次执行多次
1 onEndReached上拉一次，回调方法调用多次。原因没有去深究，SectionList和FlatList都是继承的VirtualList， 所以两者都存在这样的问题，通过结合onMomentumScrollBegin来实现控制调用多次。

2 onMomentumScrollBegin这个事件是一帧滚动开始的时候调用，这个时候控制一个参数来达到控制onEndReached事件调用的目的

```jsx
<FlatList
  onMomentumScrollBegin={_onMomentumScrollBegin}
  onEndReached={loadmore}
  onEndReachedThreshold={0.1}
></FlatList>
...

loadmore () {
  if (this.state.onEndReached) {
    this.setState({
      onEndReached: false
    })
    // 数据加载方法
  }
}

```

### react-native-scrollable-tab-view这个库，如果宽度不是全屏的话，渲染完成就会马上触发tabClick事件（这个事件本来需要用户通过点击事件来触发）

### react-native-image-crop-picker,在安装这个库的时候，依赖了RSKImageCropper,但是这个库使用国内镜像是没有办法下载下来的

解决方案这个问题需要[为git配置代理](https://www.zhihu.com/question/27159393)，但是尽量不要配置全局代理，配置全局代理之后如果忘记取消会影响下载国内的库


