<template>
    <div id="register">
        <section class="form_container">
                <span class="title">REGISTER</span>
            <div class="manage_tip">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="Email" prop="email" :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input type="email" v-model="ruleForm2.email" autocomplete="off" placeholder="Enter Email"></el-input>
                </el-form-item>
                <el-form-item label="User" prop="name"
                :rules="{required: true, message: '用户名不能为空', trigger: 'blur'}">
                    <el-input type="text" v-model="ruleForm2.name" autocomplete="off" placeholder="Enter User"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" autocomplete="off" placeholder="Enter Password"></el-input>
                </el-form-item>
                <el-form-item label="confirm" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="Confirm Password"></el-input>
                </el-form-item>
                <el-form-item label="choose" :rules="{required:true}">
                    <el-select  v-model="ruleForm2.identity" placeholder="choose">
                        <el-option value="manager">manager</el-option>
                        <el-option value="employee">employee</el-option>

                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">Register</el-button>
                     <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
               
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
    export default{
        name:'register',
         data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
      return {
        ruleForm2: {
          password: '',
          checkPass: '',
          age: '',
          name:'',
          email:'',
          identity:''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' ,required: true}
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' ,required: true}
          ],          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios.post('http://localhost:3000/api/users/register',this.ruleForm2)
            .then(response => {
                // success register
                console.log(response);
                

                
                    this.$message({
                    message:'registion success',
                    type:'success'
                    });    
                    this.$router.push('/login');

            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName){
          this.$refs[formName].resetFields();   
      }
    }
    }
</script>
<style scope>
    #register{
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
        border-radius: 10px;
        box-shadow: 4px 4px 10px gray;
        

    }
    .manage_tip{
        width: 400px;
        height: auto;
        margin-left: 15px;
        padding: 6px; 
    }
    .submit-btn{
        position: relative;
        left: 0;
    }
</style>