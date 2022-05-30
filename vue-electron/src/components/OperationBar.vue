<template>
    <div class="OperationBar">
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-columns-full icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">

            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
            <span class="el-dropdown-link">
                <span class="icon-left">100%</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">

            </el-dropdown-menu>
        </el-dropdown>
        <i class="el-icon-zoom-in icon leftBorder"></i>
        <i class="el-icon-zoom-out icon rightBorder"></i>
        <i class="el-icon-delete icon rightBorder"></i>
        <i class="el-icon-back icon"></i>
        <i class="el-icon-right icon rightBorder"></i>
        <i class="el-icon-top icon"></i>
        <i class="el-icon-bottom icon rightBorder"></i>
        <i class="iconfont icon-tuse icon"></i>
        <i class="el-icon-edit icon "></i>

        <i class="iconfont icon-- icon rightBorder"></i>
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-right icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-zhexian icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
        </el-dropdown>
<!-- 创建图形   -->
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <i class="leftBorder iconfont icon-jiahao icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command=0>Rectangle</el-dropdown-item>
                <el-dropdown-item command=1>Ellipase</el-dropdown-item>
                <el-dropdown-item command=2>Rhombus</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-fangge icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "OperationBar",
        methods:{
            handleCommand(command){
                this.createShapeInForm1(command);
            },
            createShapeInForm1(id){
                // console.log(id);
                this.$emit('createShapeInForm1',id);
            },
            // saveFile()
        }
    }
</script>

<style scoped>
.OperationBar{
    padding-left:10px;
    line-height: 30px;
}
.icon{
    padding-left: 8px;
    padding-right: 8px;
}
.icon-right{
    margin-right: 8px;
}
.icon-left{
    padding-left: 8px;
}
i{
    font-size: 20px;
}
.leftBorder{
    border-left:#E1E1E1 solid 2px;
}
.rightBorder{
    border-right: #E1E1E1 solid 2px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    padding-right: 8px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>