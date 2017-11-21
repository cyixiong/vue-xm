//1.0导入vue.js
import Vue from 'vue';
//2.0导入app.vue组件对象
import App from './App.vue';//当前目录下面查找app.vue这个组件
//导入vue-router这个包
import VueRouter from 'vue-router';
//将VueRouter对象通过Vue.usr()使用一下
Vue.use(VueRouter);
//导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';

//商品相关的组件
import goodslist from './components/goods/goodslist.vue'
//实例化对象并且定义路由规则
var router = new VueRouter({
  routes:[
    //默认跳转的路由规则
    {name:'default',path:'/',redirect:'/admin'},
    //登录
    {name:'logiin',path:'/login',component:login},
    //布局
    {name:'layout',path:'/admin',component:layout,
    children:[
      {name:'goodslist',path:'goodslist',component:goodslist}
    ]
  }
  ]
});

//导入vue的一个组件库
import elementUI from 'element-ui';
//导入默认样式
import '../staict/theme_rms/index.css';

//导入自己编写的全局样式
import '../staict/css/stie.css';
import '../staict/css/stie.less';

//导入axios
import axios from 'axios';
//设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL='http://127.0.0.1:8899';
//5.0.2 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;

//绑定到vue中
Vue.use(elementUI);
//实例化对象并且定义路由规则
new Vue({
  el:'#app',
  router,//绑定路由对象使他生效
  //将app组件编译将这个组件中的内容填充到el：指向的app这个div中
  render:create=>create(App)
})
