---
title: first meet react
date: '2019-06-05'
spoiler: a simple game tic-tac-toe
---

### 写在前面
vue在众多小型公司中比较吃香，所以项目中也一直是使用vue，久而久之，感觉不自觉就变成了vue的忠实用户。这也是我首次使用接触react，使用过程中会情不自禁的将两大框架做一些对比，但其实两个框架各有各的优势，都是很优秀的框架。

#### 😊单文件组件和函数式组件

- vue虽然也提供了函数式组件，但是相信大部人都更加习惯单文件组件的写法，毕竟这更加接近我们一开始的编写html的习惯。react是完全的函数式，这一点需要一点点时间去适应和改变。

- react推荐使用jsx来描述用户界面，jsx是JavaScript的语法扩展，所以可以在jsx中使用js表达式

```jsx
if (show) {
  <div>show</div>
} else {
  <div>!show</div>
}

const number = [1, 2, 3, 4, 5]
const listElement = number.map((item, index, arr) => {
  return <li key={index}>{item}</li>
})
```

#### 😊单向数据流和状态提升

- vue的组件编写中，一个重要的概念是单向数据流，数据是自上而下的，事件是自下而上的，父组件通过props向子组件传递数据，子组件通过emit通知父组件事件的发生。

- react的概念是状态提升，这个概念和单向数据流其实本质上差不多，通过将子组件的状态提升到父组件，打造一个统一的数据流入口，让子组件能够实现不同状态的展示，而不是局限在自己的私有状态之中。

- vue中的data是可以直接更改的，但是react中state是不能直接更改的，必须通过setState才能更新state。

- props, react中的props可以传递任何东西，包括基本类型，react对象以及函数，因为这一特性，react没有slot的概念

```jsx{4,5,16,17,18}
// Comment.js
render () {
  return (
    if (this.props.children) {
      <div>{this.props.children}</div>
    } else {
      <div>hello world</div>
    }
  )
}

// CommentList.js
render () {
  return (
    <Comment>
      <div className="children">
        <span>hello from children</span>
      </div>
    </Comment>
  )
}
```

#### 😊事件

- vue中通过v-on来监听原生事件和自定义事件

```html
<div @click="handleCLick"></div>

<my-component @my-event="handleMyevent"></my-component>

// 在myComponent.vue组件中emit一个自定义的事件出去
...
this.$emit('my-event')
...
```

- react中使用的是合成事件，是通过SyntheticEvent事件池包装之后的，但是包含了大部分的原生事件的属性。

- onChange事件被react改写之后和input事件表现类似，这一点上，react认为原声的onchange事件表现和名字不符合，所以进行了改写。用户输入导致值被改变的时候就回被触发

#### 😊表单

- 在vue.js中，表单最重要的是双向数据绑定，v-model其实就是个语法糖，实际上是通过绑定value和监听对应的input或者change事件实现的。

- react中，表单分为受控表单和非受控表单，被React控制取值的表单输入元素就叫做`受控组件`，直接使用DOM方式取值的就叫`非受控组件`

```jsx{14,23}
// 受控组件
constructor () {
  this.state = {
    value: ''
  }
}

handleChange (event) {
  this.setState({
    value: event.target.value
  })
}
...
<input value={this.state.value} onChange={this.handleChange.bind(this)}/>

// 非受控组件
static _vlaue = ''

...
handleRefChange () {
  this._value = this._value.value
}
<input ref={input => this._value = input} onChange={handleRefChange}/>


```
