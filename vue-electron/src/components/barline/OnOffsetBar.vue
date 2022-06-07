<template>
    <div class="card">
        <div class="card-header">
            On Offset
        </div>
        <div class="card-item">
            <div>
                <el-button
                        :disabled="flag"
                        size="mini"
                        style="width: 100%"
                        @click="onOffset"
                        v-if="!isOn"
                >OnOffset</el-button>
            </div>
            <div>
                <el-button
                        :disabled="flag"
                        size="mini"
                        style="width: 100%"
                        @click="offOffset"
                        v-if="isOn"
                >OffOffset</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {P} from "@/js/action/actionQueue";

    export default {
        name: "OnOffsetBar",
        mounted() {
            window.offsetFlag=this.offsetFlag;
            window.set_offset_bar=this.set_offset_bar;
        },
        methods:{
            set_offset_bar(str){
                if(str==='close'){
                    this.isOn=false
                }else{
                    this.isOn=true;
                }
            },
            offsetFlag(flag){
                this.flag=flag;
            },
            onOffset(){
                P("on_offset",{})
                P("get_offset",{})
            },
            offOffset(){
                P("close_offset",{})
            }
        },
        data(){
            return{
                flag:true,
                isOn:true
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
        width: 30%;
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
        width:60%;
        height: 30px;
    }
</style>
