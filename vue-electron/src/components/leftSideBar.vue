<template>

            <el-collapse v-model="activeNames">
                <el-collapse-item class="item" title="General" name="1">
                    <el-image
                            v-for="i in 20"
                            :src="require('@/assets/circle.png')"
                            @click="createShapeInForm2"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(i)"
                            @mouseup="handlemouseup(i)"
                    ></el-image>
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
    import {cancel_shape_create, set_shape_create} from "@/js/util/canvas_operation";

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
            },
            handlemousedown(i){
                set_shape_create(0);
            },
            handlemouseup(i){
                cancel_shape_create(0);
            }
        }
    }
</script>
<style scoped>
.item{
    user-select: none;
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