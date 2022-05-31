<template>
    <div class="card">
        <div class="card-header">
            Set Dotted Line
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    dot
                </div>
                <div class="card-right">
                    <el-select
                            :disabled="flag"
                            v-model="line_value"
                            style="height: 20px;width: 150px"
                            size="mini"
                            placeholder="请选择"
                            @change="handleL"
                    >
                        <el-option
                                v-for="item in line_type"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {P} from "@/js/action/actionQueue";
    import {getCoreList} from "@/js/element/core/core_queue";

    export default {
        name: "SetDottedLineBar",
        mounted() {
          window.set_dotted_lise_bar=this.set_dotted_lise_bar;
          window.set_dotted_line_flag=this.set_dotted_line_flag;
        },
        methods:{
            set_dotted_line_flag(flag){
              this.flag=flag;
            },
            set_dotted_lise_bar(){
                let id=getCoreList();
              // this.line_value=window.getComputedStyle(document.getElementById(id)).;
            },
            handleL(e){
                P("set_dotted_line",{dot_type:this.line_value})
                // console.log(this.horizontal_value);
            },

        },
        data(){
            return{
                line_value:'solid',
                line_type:[
                    {
                        value: 'dashed',
                        label: 'dashed'
                    },
                    {
                        value: 'dotted',
                        label: 'dotted'
                    },
                    {
                        value:  'solid',
                        label: 'solid'
                    },
                ],
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
