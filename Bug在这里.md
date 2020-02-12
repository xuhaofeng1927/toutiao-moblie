#### 逻辑非"！"的位置判断
错误案例：

``` JS
 if (Channelslist.find(i => i.id !== item.id)) {
     // console.log(11111)
     channels.push(item) // 遍历每一项不等与用户列表数据的值
 }
```

出现问题逻辑：函数内部的非语句不可以在函数外面进行替换，作用域不同
正确代码：

``` JS
if (!Channelslist.find(i => i.id === item.id)) {
    // console.log(11111)
    channels.push(item) // 遍历每一项不等与用户列表数据的值
}
```

#### 子父传值参数传递问题

错误案例：

``` JS
 this.$emit('switch', index)
```

``` HTML
<!-- 频道编辑组件 接收父组件传过来的值Channelslist-->
<Channels-list :Channelslist="Channelslist" @switch="showSwitchChannels(params)"></Channels-list>
<!-- /频道编辑组件 -->
```

``` JS
showSwitchChannels(index) {
    this.isChannelEditShow = false // 关闭弹窗
    // this.active = this.$store.state.index // 展示当前点击页面
    this.active = index // 展示当前点击页面
}
```

出现问题逻辑：子父传值时不需要形式上形参值，直接在事件方法括号内添加相应的参数
正确代码：

``` JS
 this.$emit('switch', index)
```

``` HTML
<!-- 频道编辑组件 接收父组件传过来的值Channelslist-->
<Channels-list :Channelslist="Channelslist" @switch="showSwitchChannels"></Channels-list>
<!-- /频道编辑组件 -->
```

``` JS
showSwitchChannels(index) {
    this.isChannelEditShow = false // 关闭弹窗
    // this.active = this.$store.state.index // 展示当前点击页面
    this.active = index // 展示当前点击页面
}
```

#### Vuex容器 mapState 映射数据(知识点)

``` JS
import {mapState} from 'vuex'
```

``` JS
computed: {
    // mapState 方法返回一个对象，对象中就是映射过来的容器中的数据成员
    // ... 操作符就是把一个对象展开，混入当前对象中
    ...mapState(['user'])
    // this.user、this.a、this.b
    // computed: mapState(['user', 'a', 'b']),
    // computed: {
    //   // 优化获取容器中的数据（方式一）：this.user
    //   // user () {
    //   //   return this.$store.state.user
    //   // }
    // },
},
```

``` HTML
<!-- 1，如果用户没有登录    2，如果当前文章作者不是当前登录用户 这两个条件下不能显示关注按钮-->
<van-button 
+     v-if="!user || ArticleList.aut_id !== user.id" 
      class="follow-btn" 
      :type="ArticleList.is_followed?'info':'default'" 
      size="small" 
      round 
      :loading="isfollowed" 
      @click="onFollow(ArticleList.is_followed)"
>
{{ ArticleList.is_followed ? '已关注' : '+ 关注' }}
</van-button>
```

#### 路由传参（知识点）

``` JS
router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
```

- params参数（严格）
    - 配置路由路径规则 例如： /login/:abc
    - 在组件中获取参数 例如：this.$route.params.abc 或者通过 props
* query 参数
    * 不需要配置路由规则 例如：/login/?a=b&foo=b&n=10
    * 在组件中获取参数 例如：this.&route.query.xxx
* 使用建议
    * 把非必须参数配置为query参数
    * 把必须参数配置为params参数