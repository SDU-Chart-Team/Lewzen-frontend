<template>
    <div class="card">
        <div class="card-header">
            <div class="clear">
                <div class="card-left">create</div>
            </div>
        </div>
        <div class="card-item">
            <div>
                <button
                        style="width:100%"
                        @click="graph_change_set(true)"
                >create graph</button>
            </div>
        </div>
        <div>
            <el-form v-if="graph_change">
                <el-form-item>
                    <el-input
                            type="textarea"
                            v-model="graph_style"
                            :autosize="{ minRows: 2, maxRows: 10}"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="SubmitGraph">update</el-button>
                    <el-button size="mini" @click="graph_change_set(false)">cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "graphCreateBar",
        methods:{
            graph_change_set(value){
                if(!value){

                }else{
                    this.graph_style="";
                }
                this.graph_change=value;
            },

            SubmitGraph(){
                let option=this.graph_style;
                let id=getNoteId();
                // console.log(eval('('+option+')'));
                createChart(eval('('+option+')'),id);
            }
        },
        data(){
            return{
                graph_style:"",
                graph_change:false
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