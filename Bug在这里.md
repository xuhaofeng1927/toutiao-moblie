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
showSwitchChannels (index) {
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
showSwitchChannels (index) {
      this.isChannelEditShow = false // 关闭弹窗
      // this.active = this.$store.state.index // 展示当前点击页面
      this.active = index // 展示当前点击页面
    }
```