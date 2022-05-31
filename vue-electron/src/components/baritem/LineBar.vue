<template>
    <div class="card">
        <div class="card-header">
            Line
            <el-button
                    size="mini"
                    round
                    style="float: right"
                    @click="quickFillOn"
                    v-if="!quick"
                    :disabled="flag"
            >
                quick on
            </el-button>
            <el-button
                    size="mini"
                    round
                    :disabled="flag"
                    style="float: right"
                    @click="quickFillOff"
                    v-if="quick"
            >
                quick off
            </el-button>
        </div>
        <div class="card-item">
<!--            <div class="clear">-->
<!--                <div class="card-left">-->
<!--                    <el-checkbox label="style" v-model="strokeOn" @change="OnStroke"></el-checkbox>-->
<!--                </div>-->
<!--            </div>-->
            <div class="clear" >
                <div class="card-left">
                    color
                </div>
                <div class="card-right">
                    <el-color-picker
                            size="mini"
                            :disabled="flag"
                            v-model="color_line"
                            show-alpha
                            @change="handleStrokeColor"
                            :predefine="predefineColors">
                    </el-color-picker>
                </div>
            </div>
            <div class="clear" >
                <div class="card-left">
                    <el-select
                            :disabled="flag"
                            v-model="value_line"
                            style="height: 20px;width: 150px"
                            size="mini"
                            placeholder="请选择"
                            @change="handleStrokeStyle"
                    >
                        <el-option
                                v-for="item in options_line"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="card-right">
                    <el-input
                            :disabled="flag"
                            size="mini"
                            placeholder=""
                            v-model="line_style_px"
                            @change="handleStrokeWidth"
                    >
                    </el-input>
                </div>
            </div>
        </div>
        <div class="card-item" v-if="quick">
            <el-input
                    placeholder="[width]; [color] ;[dasharray]"
                    size="mini"
                    v-model="quick_line"
                    :disabled="flag"
            >
                <el-button
                        slot="append"
                        icon="el-icon-check"
                        @click="quick_line_set"
                >
                </el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    import {
        OffStrokeModel,
        OnStrokeModel,
        SetCoreStrokeColor, SetCoreStrokeStyle,
        SetCoreStrokeWidth
    } from "@/js/canvas/operation/canvas_style_operation";

    export default {
        name: "LineBar",
        mounted() {
            window.setStrokeStyle=this.setStrokeStyle;
            window.setStrokeFlag=this.setStrokeFlag;
        },
        methods:{
            setStrokeFlag(flag){
                this.flag=flag;
            },
            Trim(str) {
                if(str===undefined)return;
                return str.replace(/(^\s*)|(\s*$)/g, "");
            },

            //快速模式
            quickFillOn(){
                this.quick=true;
            },

            quickFillOff(){
                this.quick=false;
            },

            quick_line_set(){
                let line=this.quick_line;
                let list=line.split(";");
                let msg={};
                if(list.length>=1){
                    msg['stroke-width']=this.Trim(list[0])===""?'2px':this.Trim(list[0]);
                    this.handleStrokeWidth(msg['stroke-width'])
                }
                if(list.length>=2){
                    msg['stroke']=this.Trim(list[1])===""?'rgba(0,0,0,1)':this.Trim(list[1]);
                    this.handleStrokeColor(msg['stroke'])
                }
                if(list.length>=3){
                    msg['stroke-dasharray']=this.Trim(list[2])===""?'':this.Trim(list[2]);
                    this.handleStrokeStyle(msg['stroke-dasharray'])
                }
                // console.log(msg);


            },

            setStrokeStyle(msg){
                this.color_line=msg['stroke'];
                this.line_style_px=msg["stroke-width"];
                if(msg["stroke-dasharray"]==='solid'){
                    // alert(1)
                    this.value_line=msg["stroke_dasharray"];
                }
                else this.value_line="dotted";
            },

            OnStroke(e){
                this.strokeOn=e;
                if(this.strokeOn){
                    OnStrokeModel();
                }else{
                    OffStrokeModel();
                    this.line_style_px=3;
                    this.color_line="rgba(0,0,0,1)"
                    this.value_line="";
                }
            },

            handleStrokeColor(e){
                SetCoreStrokeColor(e)
            },

            handleStrokeStyle(e){
                if (e === "dotted") {
                    SetCoreStrokeStyle("5,5")
                } else if (e === "solid") {
                    SetCoreStrokeStyle("")
                }
            },

            handleStrokeWidth(e){
                SetCoreStrokeWidth(this.line_style_px);
            }
        },
        data(){
            return{
                flag:true,
                strokeOn:true,//stroke on
                color_line:"",//stroke
                value_line:"solid",//stroke dasharray
                line_style_px:"",
                quick:false,
                quick_line:"",
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'
                ],
                options_line: [{
                    value: 'dotted',
                    label: 'dotted'
                }, {
                    value: 'solid',
                    label: 'solid'
                }],
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
        height: 28px;
        line-height: 28px;
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
        color: #606266;
        font-weight: 500;
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