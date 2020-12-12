require('./bootstrap');

window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar,{
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    height:'2px'
});

import Swal from 'sweetalert2'
window.Swal= Swal;
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
    
  });

  window.toast=toast;


window.Form= Form;
window.Fire = new Vue();
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter);

let routes=[
   
    {path : '/dashboard', component:()=>import('./components/dashboard.vue')},
    {path :'/profile', component:()=>import('./components/profile.vue')},
    {path :'/developer', component:()=>import('./components/developer.vue')},
    {path :'/users', component:()=>import('./components/users.vue')}


]

const router= new VueRouter({
    routes,
    mode : 'history'
  });

 Vue.filter('upText', function(text){
return text.charAt(0).toUpperCase()+text.slice(1)
 });
  
 Vue.filter('myDate', function(created){
     return moment(created).format('MMMM Do YYYY')
 });
const app = new Vue ({
    el : '#app',
    router,
    data:{
        search:""
    },
    methods:{
        searchit(){
            Fire.$emit('searching');
        }
    }
}); 