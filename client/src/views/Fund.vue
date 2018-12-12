<template>
    <div id="fund">
      
      <el-row>
        <div style="display:inline;float:left;margin-bottom:10px">
        <span class="demonstration">开始时间:</span>
        <el-date-picker
          v-model="pickertimestart"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="display:inline;float:left;margin-left:5px;">
        <span class="demonstration">结束时间:</span>
        <el-date-picker
          v-model="pickertimeend"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
        <el-button type="primary" @click="handleChoose" style="float:left;margin:0 3px;vertical-align:top">筛选</el-button>        
        <el-button v-if="this.user.identity === 'manager'" type="primary" @click="handleAdd" style="float:right;margin:0 3px;">添加</el-button>
      </el-row>
        <div class="tb">
          <el-table :data="showdata" style="width:100%" border>
          <el-table-column label="日期" width="250" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="income" label="收入" align="center" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">{{scope.row.income}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="expend" label="支出" align="center" width="100">
            <template slot-scope="scope">
              <span style="color:#f56767">{{scope.row.expend}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cash" label="账户现金" align="center" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{scope.row.cash}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="描述" align="center" width="100"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- pagination -->
        </div>
        <div style="float:right">
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="paginations.total">
          </el-pagination>      
        </div>
        
        <Dialog ref="reference" @update="getData"></Dialog>
    </div>
</template>
<script>
import Dialog from '../components/Dialog'
  export default{
    name:'fund',
    components:{
      Dialog
    },
    data(){
      return{
        tabledata:[],
        showdata:[],
        paginations:{
          page_index:1, //当前位于那一页
          total:100, //总数
          page_size:5, //一页显示多少条
          page_sizes:[5,10], //每页显示多少条
        },
        pickertimestart:'',
        pickertimeend:'',
        user:{}
      }
    },
    methods:{
    async getData(){
        let { data } = await this.$axios.get('http://localhost:3000/api/profiles');
        this.tabledata = data;
        this.setPagination();
      },
      setPagination(){
        this.paginations.total = this.tabledata.length;
        this.showdata = this.tabledata.filter((item,index) => {
          return index < this.paginations.page_size;
        })
      },
      handleEdit(index,row){
        console.log(`${index},${row}`);
        this.$message({
                        message:'暂时不能编辑',
                        type:'error'
                    });  
      },
      handleDelete(index,row){
        let rid = row._id;
        this.$axios.delete(`http://localhost:3000/api/profiles/delete/${rid}`,)
        .then((data) => {
          console.log(data);
          if(data.status === 200){
             this.$message({
                        message:'删除成功',
                        type:'success'
                    });  
          }
          this.getData();
        })
        .catch(err => console.log(err));
        
        
      },
      handleAdd(){
        this.$refs.reference.judge();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.paginations.page_size = val;
        this.showdata = this.tabledata.filter((item,index) => {
          return index < val;
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //获取当前页
        let index = this.paginations.page_size * (val-1);
        // 总数
        this.showdata = [];
        let all = this.paginations.page_size * val;
       
        for(let i = index; i < all ;i++){
            if(this.tabledata[i]){
              this.showdata.push(this.tabledata[i])
            }
        }
        
      },
      handleChoose(){
        console.log('choose');
      }
    },
    created() {
      this.getData();
      this.user = this.$store.getters.user;
    
    },
    filters:{
      getformat(value){
        return `$${value}-Dollor`;
      }
    }
  }
</script>
<style>
  #fund{
    float: left;
    width: 70%;
    padding: 20px 100px;
    margin: 0 auto;
  }
  #fund .tb{
    width: 100%;
    vertical-align: top;
  }
</style>