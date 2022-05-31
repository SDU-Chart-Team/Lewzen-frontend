<template>
    <div class="card">
        <div class="card-header"> View</div>
        <div class="card-item">
            <el-checkbox-group @change="handleChange" v-model="viewList">
                <div class="bottom-item">
                    <el-checkbox label="Grid">
                    </el-checkbox>
                </div>
                <div class="bottom-item"><el-checkbox label="Shadow"></el-checkbox></div>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    import {OffGrid, OnGrid} from "@/js/canvas/operation/canvas_diagram_operation";
    import {setShadowAll} from "@/js/canvas/operation/canvas_style_operation";

    export default {
        name: "viewBar",
        methods:{
            handleChange(e){
                let gridFlag=false;
                let shadowFlag=false;
                for(var item in e){
                    if(e[item]==="Grid"){
                        // createGrid(16);
                        if(this.grid===false){
                            OnGrid();
                        }
                        gridFlag=true;
                        this.grid=true;
                    }else if (e[item]==='Shadow'){
                        if(this.shadow===false){
                            setShadowAll();
                        }

                        shadowFlag=true;
                        this.shadow=true;
                    }
                }
                if(!gridFlag&&this.grid===true){
                    OffGrid();
                    this.grid=false;
                }
                if(!shadowFlag&&this.shadow===true){
                    setShadowAll()
                    this.shadow=false;
                }
            },
        },
        data(){
            return{
                viewList: [],
                grid:false,
                shadow:false
            }
        }
    }
</script>

<style scoped>
    .card{
        padding: 10px;
        border-bottom: #E1E1E1 solid 1px;
        text-align: left;
    }
    .card-header{
        font-weight: 600;
        font-size: 14px;
    }
    .card-item{
        padding-top: 7px;
        font-size: 10px;
    }
    .bottom-item{
        padding-bottom: 2px;
        font-size: 10px;
    }
    .el-checkbox__label{
        font-size:10px;
    }
    .clear{
        clear: both;
    }
    .card-left{
        float: left;
        /*background-color: #42b983;*/
        line-height: 30px;
        width: 70%;
        height: 30px;
    }
    .card-left-item{
        float: left;
        /*background-color: #42b983;*/
        line-height: 30px;
        width: 60%;
        height: 30px;
        font-size: 14px;
        color: gray;
        padding-left: 24px;
    }

    .card-left-left{
        float: left;
        /*background-color: #42b983;*/
        line-height: 30px;
        width: 30%;
        height: 30px;
    }
    .card-midden{
        float: left;
        /*background-color: #9a6e3a;*/
        line-height: 30px;
        width: 40%;
        height: 30px;
    }
    .card-right{
        float: right;
        align-items: center;
        /*background-color: #795da3;*/
        /*padding-left: 20px;*/
        width:30%;
        height: 30px;
    }
</style>