<template>
    <div id="login">
        <section class="form_container">
                <span class="title">LOGIN</span>
            <div class="manage_tip">
                <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Email" prop="email" :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input type="email" v-model="ruleForm2.email" autocomplete="off" placeholder="Enter Email"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password" :rules="{required:true,trigger:'blur'}">
                    <el-input type="password" v-model="ruleForm2.password" autocomplete="off" placeholder="Enter Password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit-btn" @click="login('ruleForm2')">Login</el-button>
                </el-form-item>
                <div class="reg-div">
                    <p>no root?<router-link to="/register">sign up</router-link></p>
                </div>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
    export default{
        name:'register',
         data() {
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //     callback(new Error('请输入密码'));
            //     } else {
            //     if (this.ruleForm2.checkPass !== '') {
            //         this.$refs.ruleForm2.validateField('checkPass');
            //     }
            //     callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //     callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm2.password) {
            //     callback(new Error('两次输入密码不一致!'));
            //     } else {
            //     callback();
            //     }
            // };
      return {
        ruleForm2: {
          password: '',
          email:'',
        },
        // rules2: {
        //   password: [
        //     { validator: validatePass, trigger: 'blur' ,required: true}
        //   ],
        //   checkPass: [
        //     { validator: validatePass2, trigger: 'blur' ,required: true}
        //   ],          
        // }
      };
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:3000/api/users/login',this.ruleForm2)
            .then(response => {
                // console.log(response);
                const { token } = response.data;
                const decode = jwt_decode(token);
                console.log(decode);
                //save on localstroage
                localStorage.setItem('eleToken',token);
                
                // token save on vuex
                this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
                this.$store.dispatch('setUser',decode);
                
                this.$message({
                        message:'login success',
                        type:'success'
                    });  
                this.$router.push('/index');  
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reg(){
          this.$router.push('/register');
      },
      isEmpty(value){
          return(value === undefined || value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
          );
      },
      isAuthenzation(){
          if(localStorage.getItem('eleToken')){
              this.$router.push('/index');
          }
      }
    },
    created() {
        this.isAuthenzation();
    },
}
</script>
<style scope>
    #login{
        height: 100%;
        width: 100%;
        background:url(../assets/adorable.jpg) no-repeat center center;
        background-size: 100% 100%;
        /* filter: blur(1.4px); */
        position: relative;
    }
    .title{
        font-size: 30px;
        color: rgb(212, 133, 133);
        font-weight: bolder;
        padding:20px 0;
        display: block;
    }
    .form_container{
        width: 500px;
        height: auto;
        background: rgb(252, 252, 252);
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 4px 4px 10px gray;
        transform:translateY(25%);

    }
    .manage_tip{
        width: 400px;
        height: auto;
        margin-left: 15px;
        padding: 6px;
    }
    .submit-btn{
        width: 300px;
    }
    .reg-div{
        text-align: right;
    }
</style>