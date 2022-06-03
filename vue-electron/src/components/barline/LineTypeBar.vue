<template>
    <div class="card">
        <div class="card-header">
            Set Line Type
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    line
                </div>
                <div class="card-right">
                    <el-select
                            :disabled="flag"
                            v-model="line_value"
                            style="height: 20px;width: 150px"
                            size="mini"
                            placeholder="请选择"
                            @change="HandleL"
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

    export default {
        name: "LineTypeBar",
        mounted() {
            window.set_line_type_bar=this.set_line_type_bar;
            window.setLineTypeFlag=this.setLineTypeFlag;
        },
        methods:{
            setLineTypeFlag(flag){
                this.flag=flag;
            },
            set_line_type_bar(){
                // this.line_type=value;
            },
            HandleL(e){
                P("set_line_type",{line_type:this.line_value})
                // console.log(this.horizontal_value);
            }
        },
        data(){
            return{
                flag:true,
                line_value:'straight_line',
                line_type:[
                    {
                        value: 'straight_line',
                        label: 'straight_line'
                    },
                    {
                        value: 'vertical_line',
                        label: 'vertical_line'
                    },
                    {
                        value:  'curve',
                        label: 'curve'
                    },
                    {
                        value:  'horizontal_line',
                        label:  'horizontal_line'
                    },
                    {
                        value:  'curve_two',
                        label:  'curve_two'
                    },
                    {
                        value:  'hallow_line',
                        label:  'hallow_line'
                    },
                    {
                        value:  'complex_line',
                        label:  'complex_line'
                    },
                    {
                        value:   'flexible_line',
                        label:   'flexible_line'
                    }
                ],
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
