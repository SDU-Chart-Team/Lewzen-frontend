<template>
    <div class="card">
        <div class="card-header">style setting</div>
        <div class="card-item">
            <button style="width: 100%" @click="style_change_set(true)">Edit Style</button>
        </div>
        <div class="card-item">
            <button
                    style="width: 50%"
                    @click="copy_style()"
            >Copy Style</button>
            <button
                    style="width: 50%"
                    @click="paste()"
            >Paste Style</button>
        </div>
        <div class="card-item">
            <button
                    style="width: 100%"
                    @click="setDefault()"
            >Set as Default</button>
        </div>


        <div>
            <el-form v-if="style_change">
                <el-form-item>
                    <el-input
                            type="textarea"
                            v-model="element_style"
                            :autosize="{ minRows: 2, maxRows: 10}"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="SubmitStyle">update</el-button>
                    <el-button @click="style_change_set(false)">cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getStyleInCore, setStyleInCore} from "@/js/canvas/operation/canvas_style_operation";

    export default {
        name: "StyleBar",
        mounted() {

        },
        methods:{
            SubmitStyle(){
                let style=this.element_style;
                setStyleInCore(style);
            },
            style_change_set(value){
                if(!value){

                }else{
                    this.element_style=getStyleInCore();
                }
                this.style_change=value;
            },
            copy_style(){
                this.copy_style_element=getStyleInCore();
            },
            paste(){
                setStyleInCore(this.copy_style_element);
            },
            setDefault(){
                this.copy_style_element="stroke : rgba(0,0,0,1);stroke-width : 3;fill : rgba(255,255,255,1);fill-opacity : 0;stroke-opacity : 1.0;";
            },
        },
        data(){
            return{
                style_change:false,
                element_style:"",
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