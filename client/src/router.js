import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import Register from './views/Register'
import NotFound from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import Profile from './views/Profile'
import Fund from './views/Fund'
Vue.use(Router)

const route = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {path:'',component:Home},
        {path:'/home',component:Home},
        {path:'/profile',component:Profile},
        {path:'/fund',component:Fund}
      ]
    },  
    {
      path:'/register',
      name:'register',
      component:Register
    },{
      path:'*',
      name:'404',
      component:NotFound
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
});

// 路由守卫
// 每次触发路由在进入心页面之前会调用此方法
route.beforeEach((to,from,next) => {
  const isEleToken = localStorage.getItem('eleToken')?true:false;
  console.log(isEleToken);
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    isEleToken ? next() : next('/login');
  }
});
export default route;