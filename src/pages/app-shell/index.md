---
title: appShell 模型使用后感
date: '2019-05-28'
spoiler: 是否真的需要页面过渡动画
---

[appShell模型](https://developers.google.com/web/fundamentals/architecture/app-shell?hl=zh-cn)

其实简单来讲就是transition + keepAlive， transition包裹路由组件，实现页面之间的过渡动画，keepAlive实现页面级缓存

实现过程中发现了一系列的问题

- 😣存在两个transition，使得动画存在问题
```jsx{8,18}
  <transition
    :name="pageTransitionName"
    @before-enter="handleBeforeEnter"
    @after-enter="handleAfterEnter"
  >

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="app-wrapper"/>
    </keep-alive>

  </transition>
  <transition
    :name="pageTransitionName"
    @before-enter="handleBeforeEnter"
    @after-enter="handleAfterEnter"
  >

    <router-view v-if="!$route.meta.keepAlive" class="app-wrapper"/>

  </transition>
```

- 😣keepAlive失效, 由于keepAlive和非keepAlive页面使用的不是同一个router-view，导致keepAlive失效，只有切换的两个页面同时都是keepAlive的才能达到想要的效果

```jsx{8, 10}
  <transition
    :name="pageTransitionName"
    @before-enter="handleBeforeEnter"
    @after-enter="handleAfterEnter"
  >

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="app-wrapper"/>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="app-wrapper"/>

  </transition>
```

综上， 为了这个页面间的过渡效果，要规避的问题还是挺多的，尤其当页面明明不需要keepAlive，而且逻辑复杂的时候，需要权衡一下是否需要这个过渡效果。
