require('./bootstrap');

window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform'
window.Form= Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter);

let routes=[
   
    {path : '/dashboard', component:()=>import('./components/dashboard.vue')},
    {path :'/profile', component:()=>import('./components/profile.vue')},
    {path :'/users', component:()=>import('./components/users.vue')}


]

const router= new VueRouter({
    routes,
    mode : 'history'
  });

 
  
const app = new Vue ({
    el : '#app',
    router
}); 