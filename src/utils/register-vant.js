import Vue from 'vue' // 先引入Vue实例对象
import {
  Button,
  Icon,
  NavBar,
  Field,
  Toast,
  CountDown,
  Tabbar, TabbarItem,
  Image,
  Grid,
  GridItem,
  Cell,
  CellGroup
} from 'vant' // 在引入Vant相关的组件模块

Vue.use(Button) // 全局注册相关组件模块
  .use(Icon) // （链式调用）注册Icon图标
  .use(NavBar) // 注册NavBar导航栏
  .use(Field) // 注册button按钮
  .use(Toast) // 注册轻提示
  .use(CountDown) // 注册倒计时
  .use(Tabbar).use(TabbarItem) // 注册tabbar标签栏
  .use(Image) // 注册图片组件
  .use(Grid).use(GridItem) // 注册GridItem外包装组件
  .use(Cell).use(CellGroup) // 注册CellGroup外包装组件
