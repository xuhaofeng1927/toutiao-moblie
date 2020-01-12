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
  CellGroup,
  Dialog,
  List,
  Tab, Tabs,
  PullRefresh,
  Popup
} from 'vant' // 在引入Vant相关的组件模块

// 全局注册相关组件模块 （链式调用）
Vue.use(Button) // 注册button按钮
  .use(Icon) // 注册Icon图标
  .use(NavBar) // 注册NavBar导航栏
  .use(Field) // 注册Field 输入框
  .use(Toast) // 注册轻提示
  .use(CountDown) // 注册倒计时
  .use(Tabbar).use(TabbarItem) // 注册tabbar标签栏
  .use(Image) // 注册图片组件
  .use(Grid).use(GridItem) // 注册GridItem外包装组件
  .use(Cell).use(CellGroup) // 注册CellGroup外包装组件
  .use(Dialog) // 注册Dialog弹出框
  .use(List) // 注册List列表
  .use(Tab).use(Tabs)// 注册Tab标签栏
  .use(PullRefresh) // 注册PullRefresh下拉刷新
  .use(Popup) // 注册Popup弹出框
