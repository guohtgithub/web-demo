import {say} from './util'
import Vue from 'vue'
import App from './component/App.vue'
import './assets/css/common.scss'
import './rem'
say(' guoht')

// Vue.component('my-img',{
//   template:'<img :src="url">',
//   data(){
//     return{
//       url:require('./assets/img/log.png')
//     }
//   }
// })

var app = new Vue({
  el:'#app',
  // data:{
  //   msg:'hello Vue!'
  // },
  // methods:{
  //   async fetchData(){
  //     const data = await getData();
  //     this.msg = data;
  //   }
  // },
  // created(){
  //   this.fetchData()
  // }
  template:'<App />',
  components:{App}
})