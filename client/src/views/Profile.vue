<template>
    <div id="profile">
        <div>
            <p>Name:{{users.name}}</p>
            <p>Identity:{{ users.identity }}</p>
        </div>
    </div>
</template>
<script>
    export default{
        name:'profile',
        data(){
            return {
                users:{}
            }
        },
        methods:{
            getuser(){
                this.users = this.$store.getters.user;
            }
        },
        created() {
            this.getuser();
        },
    }
</script>   
<style scoped>
    #profile div p{
        padding: 10px;
        font-size: 60px;
        margin: 0 auto;
    }
</style>