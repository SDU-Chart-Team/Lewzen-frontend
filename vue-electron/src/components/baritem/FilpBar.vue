<template>
    <div class="card">
        <div class="card-header">
            Flip
        </div>
        <div class="card-item">
            <div>
                <el-button
                        :disabled="flag"
                        size="mini"
                        style="width: 48%"
                        @click="Hflip"
                >Horizontal</el-button>
                <el-button
                        :disabled="flag"
                        size="mini"
                        style="width: 48%"
                        @click="Vflip"
                >Vertical</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCoreList} from "@/js/element/core/core_queue";
    import {P} from "@/js/action/actionQueue";

    export default {
        name: "FilpBar",
        mounted() {
            window.FlipFlag=this.FlipFlag;
        },
        methods:{
            FlipFlag(flag){
                this.flag=flag;
            },
            Hflip(){
                let coreList=getCoreList();
                let mean=0;
                for(let i=0;i<coreList.length;i++){
                    let bbox=document.getElementById(coreList[i]).getBBox();
                    let line=bbox.x+bbox.width/2;
                    mean+=line;
                }
                mean/=coreList.length;
                P("flip",{a:1,b:0,c:-mean})
            },
            Vflip(){

            }
        },
        data(){
            return{
                flag:true,
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
        font-size: 14px;
        font-weight: 500;
        color: #606266;
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