<template>
    <div class="card">
        <div class="card-header">Position</div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left-item">
                    left
                </div>
                <div class="card-right">
                    <el-input
                            v-model="element_left"
                            size="mini"
                            :disabled="isArrange"
                            @change="updatePosition"
                    ></el-input>
                </div>
            </div>

            <div class="clear">
                <div class="card-left-item">
                    top
                </div>
                <div class="card-right">
                    <el-input
                            v-model="element_top"
                            size="mini"
                            :disabled="isArrange"
                            @change="updatePosition"
                    ></el-input>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {P, updateState} from "@/js/action/actionQueue";

    export default {
        name: "PositionBar",
        mounted() {
            window.setPosition=this.setPosition
        },

        methods:{
            setPosition(msg){
                console.log(msg);
                if(!msg['flag']){
                    this.isArrange=true;
                }else{
                    this.isArrange=false;
                    this.element_left=msg['x'];
                    this.element_top=msg['y'];
                    this.element_height=msg['height']
                    this.element_width=msg['width']
                    this.element_left_last=msg['x'];
                    this.element_top_last=msg['y'];
                    this.element_height_last=msg['height']
                    this.element_width_last=msg['width']
                }
            },
            updatePosition(){
                let rect={x:parseFloat(this.element_left)
                    ,y:parseFloat(this.element_top),
                    width:parseFloat(this.element_width),
                    height:parseFloat(this.element_height)}
                updateState({rect:{
                        x:parseFloat(this.element_left_last)
                        ,y:parseFloat(this.element_top_last),
                        width:parseFloat(this.element_width_last),
                        height:parseFloat(this.element_height_last)
                    }})
                P("set_rect",{rect:rect})
                this.element_left_last=this.element_left;
                this.element_width_last=this.element_width;
                this.element_top_last=this.element_top;
                this.element_height_last=this.element_height;
            }

        },
        data(){
            return{
                element_left:"",
                element_top:"",
                isArrange:false,
                element_height:"",
                element_width:"",
                element_left_last:"",
                element_top_last:"",
                element_height_last:"",
                element_width_last:""
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
        font-size: 12px;
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