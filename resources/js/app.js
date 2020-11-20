require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes=[
    
    {path : '/dashboard', component:require('./components/dashboard.vue')},
    {path :'/profile', component:require('./components/profile.vue')}

]

const router= new VueRouter({
    routes,
    mode : 'history'
  });

const app = new Vue ({
    el : '#app',
    router
}); 