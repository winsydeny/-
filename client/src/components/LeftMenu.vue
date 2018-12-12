<template>
    <div id="leftmenu">
        <div class="left-top">
            <el-row class="tac">
            <el-col :span="24">
                <el-menu background-color="#324057" text-color="#fff" class="right-border" router>
                    <el-menu-item index="home">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Home</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>Item</span>
                        </template>
                    <el-menu-item-group>
                        <el-menu-item index="fund" class="el-item">Fund</el-menu-item>
                     </el-menu-item-group>
                    </el-submenu>
                <el-menu-item index="profile">
                    <i class="el-icon-more"></i>
                    <span>User</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        </div>
    </div>
</template>
<script>
export default{
    name:'leftmenu'
}
</script>
<style scope>
#leftmenu{
    height: 100%;
    float: left;
    width: 160px;
}
.left-top{
    width: 100%;
    float: left;
    height: 100%;
}
   .tac{
       height: 100%;
        background: #324057;
        border-right: solid 1px #242d3d;
   }
   .tac .right-border{
       border: none;
   }
   .tac .right-border .el-item{
       min-width: 159px;
       padding-left: 30px;
   }
</style>