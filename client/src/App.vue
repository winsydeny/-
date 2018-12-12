<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
  export default{
    name:'app',
    methods:{
      // 解决vuex在页面刷新后初始化的问题
      getInfo(){   
        if(localStorage.eleToken){
          const token = localStorage.eleToken;
            const info = jwt_decode(token);  
            this.$store.dispatch('setAuthenticated',!this.isEmpty(info));
            this.$store.dispatch('setUser',info);
        }
      },
       isEmpty(value){
          return(value === undefined || value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
          );
      },
    },
    created(){
        this.getInfo();
    }
  }
</script>
<style>
html,body,#app {
  height: 100%;
  /* overflow: hidden; */
  /* overflow-x: hidden; */
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
