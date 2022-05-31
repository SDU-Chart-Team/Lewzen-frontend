<template>
    <div class="card">
        <div class="card-header">
            Spacing
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    left
                </div>
                <div class="card-right">
                    <el-input
                            :disabled="flag"
                            size="mini"
                            style="width: 150px"
                            @change="handle"
                            v-model="left"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    right
                </div>
                <div class="card-right">
                    <el-input
                            :disabled="flag"
                            size="mini"
                            @change="handle"
                            v-model="right"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    top
                </div>
                <div class="card-right">
                    <el-input
                            :disabled="flag"
                            size="mini"
                            @change="handle"
                            v-model="top"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    bottom
                </div>
                <div class="card-right">
                    <el-input
                            :disabled="flag"
                            size="mini"
                            @change="handle"
                            v-model="bottom"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    global
                </div>
                <div class="card-right">
                    <el-input
                            :disabled="flag"
                            size="mini"
                            @change="handle"
                            v-model="global"
                    ></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {P, updateState} from "@/js/action/actionQueue";

    export default {
        name: "SpacingBar",
        mounted() {
          window.set_spacing_bar=this.set_spacing_bar;
          window.set_spacing_flag=this.set_spacing_flag;
        },
        methods:{
            set_spacing_flag(flag){
                this.flag=flag;
            },
            set_spacing_bar(msg){
                this.left=msg['left'];
                this.right=msg['right'];
                this.bottom=msg['bottom'];
                this.top=msg['top'];
                this.global=msg['global'];
                this.left_last=this.left;
                this.right_last=this.right;
                this.bottom_last=this.bottom;
                this.top_last=this.top;
                this.global_last=this.global;
            },
            handle(){
                let spacing={
                    left:parseInt(this.left),
                    right:parseInt(this.right),
                    top:parseInt(this.top),
                    bottom:parseInt(this.bottom),
                    global:parseInt(this.global)
                }
                updateState({
                    left:parseInt(this.left_last),
                    right:parseInt(this.right_last),
                    top:parseInt(this.top_last),
                    bottom:parseInt(this.bottom_last),
                    global:parseInt(this.global_last)
                })
                P("set_spacing",{spacing:spacing})
                this.left_last=this.left;
                this.right_last=this.right;
                this.bottom_last=this.bottom;
                this.top_last=this.top;
                this.global_last=this.global;
            }
        },
        data(){
            return{
                left:0,
                right:0,
                top:0,
                bottom:0,
                global:0,
                left_last:0,
                right_last:0,
                top_last:0,
                bottom_last:0,
                global_last:0,
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
