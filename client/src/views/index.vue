<template>
    <div id="index">
        <!-- <button @click="signout">Sign Out</button> -->
        <HeadNav></HeadNav>
            <div style="height:91.9%">
                <LeftMenu></LeftMenu>
                <div class="pages"><router-view></router-view></div>
            </div>
    </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
import LeftMenu from '../components/LeftMenu'
    export default{
        name:'index',
        components:{
            HeadNav,LeftMenu
        },
        methods:{
            signout(){
                localStorage.removeItem('eleToken');
                this.$store.dispatch('clearState');
                this.$router.push('/login');
            },
            add(){
                // this.$store.commit({type:'increment',n:2});
                this.$store.dispatch('increment',2);
            }
        },
        computed:{
             count(){
                return this.$store.getters.filter;
             }
        },
    }
</script>
<style scope>
   #index{
       height: 100%;
       min-width: 1280px;
   }
   .pages{
    height: 100%;
   }
</style>