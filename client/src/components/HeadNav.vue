<template>
    <div id="head-nav">
        <el-row class="rows">
            <el-col :span="7" class="head-title"><h1>Sydeny Mannage System</h1></el-col>
            <el-col :span="4" :offset="13" class="user">
                <div class="user-img">
                    <img src="../assets/avatar0.jpg" alt="avatar" class="avatar">
                </div>
                <div class="user-name">
                    <p>{{user.name}}</p>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom el-icon--right icon-color"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="profile">Profile</el-dropdown-item>
                        <el-dropdown-item @click.native="signOut">Sign Out</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        name:'head-nav',
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        methods:{
            signOut(){
                 localStorage.removeItem('eleToken');
                this.$router.push('/login');
            },
            profile(){
                console.log('profile');
                this.$router.push('/profile');
            }

        }
    }
</script>
<style scope>
    #head-nav{
        width: 100%;
        height: 60px;
        min-width: 600px;
        background: #324057;
        color:#fff;
        border-bottom: 1px solid #1f2d3d;
    }    
    #head-nav .head-title{
        font-size: 24px;
        /* text-align: left; */
        /* padding-left: 16px; */
    }
    #head-nav .rows{
        line-height: 60px;
    }
    #head-nav .user .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: relative;
        top: 10px;
    }
    #head-nav .user .user-name p{
        margin-left: 10px;
    }
    #head-nav .user .user-img,.user-name{
        display: inline-block;
    }
    .icon-color{
        color: #fff;
    }
</style>