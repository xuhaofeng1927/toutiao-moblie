#### 逻辑非"！"的位置判断
错误案例：

``` 
 if (Channelslist.find(i => i.id !== item.id)) {  
            // console.log(11111)
            channels.push(item) // 遍历每一项不等与用户列表数据的值
          }
```

出现问题逻辑：函数内部的非语句不可以在函数外面进行替换，作用域不同
正确代码：

``` 
if (!Channelslist.find(i => i.id === item.id)) {  
            // console.log(11111)
            channels.push(item) // 遍历每一项不等与用户列表数据的值
          }
          ```

