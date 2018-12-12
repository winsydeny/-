<template>
    <div id="dialogs">
            <el-dialog
                title="资金管理"
                :visible.sync="shows"
                width="40%"
                center>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="资金描述" prop="describe">
                        <el-input v-model="form.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="收入" prop="income">
                        <el-input v-model="form.income"></el-input>
                    </el-form-item>
                    <el-form-item label="支出" prop="expend">
                        <el-input v-model="form.expend"></el-input>
                    </el-form-item>
                    <el-form-item label="现金余额" prop="cash">
                        <el-input v-model="form.cash"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="form.region" placeholder="请选择类型">
                        <el-option label="管理员" value="manage"></el-option>
                        <el-option label="用户" value="employee"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="oncancle">取消</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">

                </span>
            </el-dialog>
    </div>
</template>
<script>
    export default{
        name:'dialogs',
        props:['disDialog'],
        data(){
            return{
                shows:false,
                form:{
                    describe:'',
                    income:'',
                    expend:'',
                    cash:'',
                    remark:''
                },
                 rules: {
                    describe: [
                        { required: true, message: '请填写资金描述', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    income:[{required:true,message: '收入不能为空', trigger: 'blur'}],
                    expend:[{required:true,message:'支出不能为空',trigger:'blur'}],
                    cash:[{required:true,message:'现金不能为空',trigger:'blur'}],
                    remark:[{required:true,message:'备注不能为空',trigger:'blur'}]
                    }
            }
        },
        methods:{
            judge(){
                if(!this.shows){
                    this.shows = true;  
                }
            },
            onSubmit(){   
                console.log(this.form);
                this.$axios.post('http://localhost:3000/api/profiles/add',this.form)
                .then((data) => {
                    if(data.status === 200){
                        this.shows = false;
                        // this.$parent.getData();
                        this.$emit('update');
                    } 
                    this.$message({
                        message:'插入成功',
                        type:'success'
                    }); 
                    this.form = { describe:'', income:'', expend:'',cash:'', remark:''}
                })
                .catch(err => console.log(err));
            },
            oncancle(){
                this.shows = false;
            }
        },    
    }
</script>   
<style scope>
    
</style>