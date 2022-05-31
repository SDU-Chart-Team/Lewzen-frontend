<template>
    <div class="card">
        <div class="card-header">
            <div class="clear">
                <div class="card-left">Angle</div>
                <div class="card-right">
                    <el-input
                            size="mini"
                            :disabled="flag"
                            v-model="element_angle"
                            @change="angle_change"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="card-item">
            <div>
                <el-button
                        size="mini"
                        :disabled="flag"
                        style="width:100%"
                        @click="angle_change_by90"
                >Rotate shape 90.</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {ChangeAngle} from "@/js/canvas/operation/canvas_arrange_operation";
    import {updateState} from "@/js/action/actionQueue";

    export default {
        name: "AngleBar",
        mounted() {
            window.set_theta_bar=this.set_theta_bar;
            window.setThetaFlag=this.setThetaFlag;
        },
        methods:{
            setThetaFlag(flag){
              this.flag=flag;
            },
            set_theta_bar(msg){
                this.element_angle=Math.floor(msg*360/(2*Math.PI));
                this.element_angle_last=this.element_angle;
            },
            angle_change(){
                let angle=this.element_angle;
                ChangeAngle(angle,this.element_angle_last);
                this.element_angle_last=this.element_angle;
            },
            angle_change_by90(){
                if(this.element_angle===undefined||this.element_angle===""){
                    return;
                }
                let angle=parseInt(this.element_angle);
                this.element_angle=(angle+90)%360;
                // console.log(this.element_angle);
                ChangeAngle(this.element_angle,this.element_angle_last);
                this.element_angle_last=this.element_angle;
            }
        },
        data(){
            return{
                element_angle:"",
                element_angle_last:"",
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
        font-weight: 600;
        /*color: #606266;*/
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