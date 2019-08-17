<template>
  <div id="app" class="app">
    <h1>{{msg}}</h1>
    <img src="../assets/img/log.png" alt="">
    <input type="text" v-model="msg">
  </div>
</template>
<script>
import {getData} from '../util'
export default {
  name:'app',
  data(){
    return {
      msg:'Welcome to Your Vue.js'
    }
  },
  created(){
    console.log(222)
    this.fetchData()
  },
  methods:{
    async fetchData(){
      const data = await getData()
      this.msg = data
    }
  }
}
</script>
<style lang="scss" scoped>
  .app{
    font-family:'Avenir',Helvetica,Arial,ssns-serif;
    h1{
      color:red;
    }
    input{
      margin: 0 0 20px;
      font-size: 32px;
      line-height: 32px;
      letter-spacing: 1px;
    }
  }
</style>
