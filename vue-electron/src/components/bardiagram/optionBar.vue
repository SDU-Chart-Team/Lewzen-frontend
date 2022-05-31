<template>
    <div class="card">
        <div class="card-header"> Options</div>
        <div class="card-item">
            <el-checkbox-group
                    v-model="optionList"
                    @change="handleOptionChange">
                <!--                            <div class="bottom-item"><el-checkbox label="Connection Arrows"></el-checkbox></div>-->
                <div class="bottom-item"><el-checkbox label="Connection Points"></el-checkbox></div>
                <div class="bottom-item"><el-checkbox label="Guides"></el-checkbox></div>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    import {
        OffConnectionPoint,
        OffGuides,
        OnConnectionPoint,
        OnGuides
    } from "@/js/canvas/operation/canvas_diagram_operation";

    export default {
        name: "optionBar",
        methods:{
            handleOptionChange(e){
                let guide_flag=false;
                let connection_point_flag=false;
                for(var item in e){
                    if(e[item]==="Connection Points"&&this.connect_point===false){
                        OnConnectionPoint();
                        connection_point_flag=true;
                        this.connect_point=true;
                    }else if(e[item]==="Guides"&&this.guides===false){
                        OnGuides();
                        guide_flag=true;
                        this.guides=true;
                    }
                }
                if(!connection_point_flag&&this.connect_point===true){
                    this.connect_point=false;
                    OffConnectionPoint();
                }
                if(!guide_flag&&this.guides===true){
                    this.guides=false;
                    OffGuides();
                }
            },
        },
        data(){
            return{
                optionList: [],
                connect_point:false,
                guides:false
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