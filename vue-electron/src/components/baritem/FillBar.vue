<template>
    <div class="card">
        <div class="card-header clear">
            Fill
            <el-button
                    size="mini"
                    style="float: right"
                    @click="quickFillOn"
                    v-if="!quick"
                    :disabled="flag"
                    round
            >quick on</el-button>
<!--            <button-->
<!--                    style="float: right"-->
<!--                    @click="quickFillOn"-->
<!--                    v-if="!quick"-->
<!--            >-->
<!--                quick on-->
<!--            </button>-->
            <el-button
                    size="mini"
                    round
                    style="float: right"
                    @click="quickFillOff"
                    :disabled="flag"
                    v-if="quick"
            >
                quick off
            </el-button>
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    <el-checkbox
                            label="Fill"
                            v-model="fillOn"
                            @change="handleFill"
                            :disabled="flag"
                    ></el-checkbox>
                </div>
                <div class="card-right">
                    <el-color-picker
                            style="align-items: center;"
                            size="mini"
                            @change="fillColorChange"
                            :disabled="flag"
                            v-if="fillOn"
                            v-model="color_fill"
                            show-alpha
                            :predefine="predefineColors">
                    </el-color-picker>
                </div>
            </div>
            <div class="clear" v-if="fillOn">
                <div class="card-left-left">
                    <el-checkbox
                            label="Gradient"
                            :disabled="flag"
                            v-model="gradientOn"
                            @change="OnGradientModel"
                    >
                    </el-checkbox>
                </div>
            </div>
            <div class="clear" v-if="gradientOn">
                <div class="card-midden">
                    <el-select v-model="value_gradient"
                               @change="handleGradientDirection"
                               style="width: 150px;height: 20px"
                               size="mini"
                               :disabled="flag"
                               placeholder="请选择">
                        <el-option
                                v-for="item in options_gradient"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>
                <div class="card-right">
                    <el-color-picker
                            v-if="gradientOn"
                            size="mini"
                            v-model="color_gradient"
                            @change="GradientColorChange"
                            show-alpha
                            :disabled="flag"
                            :predefine="predefineColors">
                    </el-color-picker>
                </div>
            </div>
        </div>
        <div class="card-item" v-if="quick">
            <el-input
                    placeholder="color;[direct];[color]"
                    size="mini"
                    :disabled="flag"
                    v-model="quick_color"
            >
                <el-button
                        :disabled="flag"
                        slot="append"
                        icon="el-icon-check"
                        @click="quick_color_set"
                >
                </el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    import {
        FillColorChange,
        GradientChange,
        OffFill, OffGradient,
        OnFill,
        OnGradient
    } from "@/js/canvas/operation/canvas_style_operation";

    export default {
        name: "FillBar",
        mounted() {
            window.setFillStyle=this.setFillStyle;
            window.setFillFlag=this.setFillFlag;
        },

        methods:{
            setFillFlag(flag){
                this.flag=flag;
            },

            //快速模式
            quickFillOn(){
                this.quick=true;
            },

            quickFillOff(){
                this.quick=false;
            },

            //快速颜色设置
            quick_color_set(){
                let quickColor=this.quick_color;
                let list=quickColor.split(";")
                if(list.length!==3&&list.length!==1){
                    alert("invalid")
                }
                let msg={}
                msg['start_color']=list[0];
                if(list.length===1){
                    this.color_fill=list[0];
                    FillColorChange(list[0]);
                    return;
                }
                msg['direction']=list[1];
                this.value_gradient=list[1];
                msg['end_color']=list[2];
                this.color_gradient=list[2];
                GradientChange(msg)
            },


            //设置选项
            setFillStyle(msg){
                // console.log(msg);
                this.fillOn=msg['fillOn'];
                if(!this.fillOn){
                    return;
                }
                this.value_gradient=msg['value_gradient']
                this.color_fill=msg["color_fill"];
                this.gradientOn=msg["gradientOn"];
                if(this.gradientOn){
                    this.value_gradient=msg["value_gradient"];
                    this.color_gradient=msg["color_gradient"];
                }
            },



            //fillOn
            handleFill(e){
                this.fillOn=e;
                if(this.fillOn){
                    OnFill();
                    // console.log(this.color_fill);
                }else{
                    OffFill();
                    this.color_fill="rgba(255, 255, 255, 1)";
                    this.color_gradient="rgba(255, 255, 255, 1)";
                }
            },

            //fill color change
            fillColorChange(e){
                // console.log(e)
                if(!this.gradientOn){
                    FillColorChange(e);
                }else{
                    let msg={}
                    msg['direction']=this.value_gradient;
                    msg['start_color']=this.color_fill;
                    msg['end_color']=this.color_gradient;
                    GradientChange(msg)
                }
            },

            //GradientOn
            OnGradientModel(e){
                this.gradientOn=e;
                if(this.gradientOn){
                    OnGradient();
                    this.color_gradient=this.color_fill;
                }else{
                    OffGradient();
                    FillColorChange(this.color_fill);
                }
            },

            //gradient direct change
            handleGradientDirection(e){
                let msg={}
                msg['direction']=this.value_gradient;
                msg['start_color']=this.color_fill;
                msg['end_color']=this.color_gradient;
                GradientChange(msg)
            },

            //gradient color change
            GradientColorChange(e){
                // console.log(111)
                let msg={}
                msg['direction']=this.value_gradient;
                msg['start_color']=this.color_fill;
                msg['end_color']=this.color_gradient;
                GradientChange(msg)
            },
        },
        data(){
            return{
                quick:false,//quick是否开启
                fillOn:false,//是否填充
                color_fill:"",//填充颜色
                predefineColors: [//预设颜色
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
                gradientOn:false,//是否渐变
                value_gradient:"",//渐变方向
                options_gradient: [{//渐变选项
                    value: 'south',
                    label: 'south'
                }, {
                    value: 'north',
                    label: 'north'
                }, {
                    value: 'east',
                    label: 'east'
                }, {
                    value: 'west',
                    label: 'west'
                }, ],
                color_gradient:"",//渐变颜色
                quick_color:"",//快速颜色设置
                flag:true
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
        width: 50%;
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