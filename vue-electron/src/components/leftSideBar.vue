<template>

            <el-collapse v-model="activeNames">
                <el-collapse-item class="item" title="General" name="1">
                    <el-image
                            :src="require('@/assets/circle.png')"
                            @click="createShapeInForm2(0,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,0)"
                            @mouseup="handlemouseup(0,0)"
                    ></el-image>

                    <el-image
                            :src="require('@/assets/isometric_cube.png')"
                            @click="createShapeInForm2(1,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,0)"
                            @mouseup="handlemouseup(1,0)"
                    ></el-image>

                    <el-image
                            :src="require('@/assets/trapezoid.png')"
                            @click="createShapeInForm2(2,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(2,0)"
                            @mouseup="handlemouseup(2,0)"
                    ></el-image>


                    <el-image
                            :src="require('@/assets/parallelogram.png')"
                            @click="createShapeInForm2(3,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(3,0)"
                            @mouseup="handlemouseup(3,0)"
                    ></el-image>


                    <el-image
                            :src="require('@/assets/hexagon.png')"
                            @click="createShapeInForm2(4,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(4,0)"
                            @mouseup="handlemouseup(4,0)"
                    ></el-image>


                    <el-image
                            :src="require('@/assets/arrow right.png')"
                            @click="createShapeInForm2(5,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(5,0)"
                            @mouseup="handlemouseup(5,0)"
                    ></el-image>


                    <el-image
                            :src="require('@/assets/arrow left.png')"
                            @click="createShapeInForm2(8,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(8,0)"
                            @mouseup="handlemouseup(8,0)"
                    ></el-image>

                    <el-image
                            :src="require('@/assets/arrow up.png')"
                            @click="createShapeInForm2(9,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(9,0)"
                            @mouseup="handlemouseup(9,0)"
                    ></el-image>

                    <el-image
                            :src="require('@/assets/arrow down.png')"
                            @click="createShapeInForm2(10,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(10,0)"
                            @mouseup="handlemouseup(10,0)"
                    ></el-image>

                    <el-image
                            :src="require('@/assets/chevron.png')"
                            @click="createShapeInForm2(11,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(11,0)"
                            @mouseup="handlemouseup(11,0)"
                    ></el-image>

                    <el-image
                            :src="require('@/assets/notched.png')"
                            @click="createShapeInForm2(12,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(12,0)"
                            @mouseup="handlemouseup(12,0)"
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
                activeNames: ['1'],
                list:[
                    'require(\'@/assets/circle.png\')',
                    'require(\'@/assets/isometric.png\')',
                    'require(\'@/assets/trapezoid.png\')',
                    'require(\'@/assets/parallelogarm.png\')',
                    'require(\'@/assets/hexagon.png\')',
                    'require(\'@/assets/arrow_right.png\')',
                    'require(\'@/assets/arrow_left.png\')',
                    'require(\'@/assets/arrow_up.png\')',
                    'require(\'@/assets/arrow_down.png\')',
                    'require(\'@/assets/chevron.png\')',
                    'require(\'@/assets/notched.png\')'
                ]
            };
        },
        methods: {
            createShapeInForm2(i,index){
                // console.log("createShapeInForm2");
                i=index*10+i;
                this.$emit('createShapeInForm2',i);
            },
            handlemousedown(i,index){
                i=index*10+i;
                set_shape_create(i);
            },
            handlemouseup(i,index){
                i=index*10+i;
                cancel_shape_create(i);
            }
        },

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