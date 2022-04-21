<template>

            <el-collapse v-model="activeNames">
                <el-collapse-item class="item" title="General" name="1">
                    <el-image v-for="i in 20" :src="require('D:\\WebstormProjects\\vue2Electron\\vue-electron\\src\\assets\\circle.png')" @click="createShapeInForm2" fit="contain" style="width: 40px; height: 30px" ></el-image>
                </el-collapse-item>
                <el-collapse-item class="item" title="Misc" name="2"></el-collapse-item>
                <el-collapse-item class="item" title="Advanced" name="3"></el-collapse-item>
                <el-collapse-item class="item" title="Basic" name="4"></el-collapse-item>
                <el-collapse-item class="item" title="Arrows" name="5"></el-collapse-item>
                <el-collapse-item class="item" title="Flowchart" name="6"></el-collapse-item>
                <el-collapse-item class="item" title="Entity Relation" name="7"></el-collapse-item>
                <el-collapse-item class="item" title="UML" name="8"></el-collapse-item>
            </el-collapse>
</template>

<script>
    export default {
        name: "leftSideBar",
        data() {
            return {
                activeNames: ['1']
            };
        },
        methods: {
            createShapeInForm2(){
                console.log("createShapeInForm2");
                this.$emit('createShapeInForm2',0);
            }
        }
    }
</script>
<style scoped>
.item{
    padding-left: 10px;
    text-align: left;
}
.el-container{
    padding:0;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>