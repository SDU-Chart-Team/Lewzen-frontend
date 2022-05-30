<template>
    <div class="card">
        <div class="card-header">
            Set Arrow
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left-item">
                    start
                </div>
                <div class="card-right">
                    <el-select
                            v-model="start_value"
                            style="height: 20px;width: 150px"
                            size="mini"
                            placeholder="请选择"
                            @change="handleS"
                    >
                        <el-option
                                v-for="item in start"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>

                </div>
            </div>
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left-item">
                    end
                </div>
                <div class="card-right">
                    <el-select
                            v-model="end_value"
                            style="height: 20px;width: 150px"
                            size="mini"
                            placeholder="请选择"
                            @change="handleE"
                    >
                        <el-option
                                v-for="item in end"
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
        name: "ArrowStyleBar",
        mounted() {
            window.set_start_arrow_bar=this.set_start_arrow_bar;
            window.set_end_arrow_bar=this.set_end_arrow_bar;
        },
        methods:{
            set_start_arrow_bar(){
                // this.start_value=value
            },
            set_end_arrow_bar(){
                // this.end_value=value;
            },
            handleS(e){
                P("set_start_arrow",{start_arrow:this.start_value})
                // console.log(this.horizontal_value);
            },
            handleE(e){
                P("set_end_arrow",{end_arrow:this.end_value})
            }
        },
        data(){
            return{
                start_value:'start_arrow',
                start:[
                    {
                        value: 'start_arrow',
                        label: 'start_arrow'
                    },
                    {
                        value: 'start_arrow_circle',
                        label: 'start_arrow_circle'
                    },
                    {
                        value:  'start_arrow_line',
                        label: 'start_arrow_line'
                    },
                    {
                        value:  'start_arrow_tri_h',
                        label:  'start_arrow_tri_h'
                    },
                    {
                        value:  'start_arrow_vline',
                        label:  'start_arrow_vline'
                    },
                    {
                        value:  'start_arrow_tri_half',
                        label:  'start_arrow_tri_half'
                    },
                    {
                        value:  'start_arrow_two_tri',
                        label:  'start_arrow_two_tri'
                    },
                    {
                        value:  'start_arrow_tri',
                        label:  'start_arrow_tri'
                    },
                    {
                        value:   'null',
                        label:   'null',
                    }
                ],
                end_value:"end_arrow",
                end:[
                    {
                        value: 'end_arrow',
                        label: 'end_arrow'
                    },
                    {
                        value: 'end_arrow_circle',
                        label: 'end_arrow_circle'
                    },
                    {
                        value:  'end_arrow_line',
                        label: 'end_arrow_line'
                    },
                    {
                        value:  'end_arrow_tri_h',
                        label:  'end_arrow_tri_h'
                    },
                    {
                        value:  'end_arrow_vline',
                        label:  'end_arrow_vline'
                    },
                    {
                        value:  'end_arrow_tri_half',
                        label:  'end_arrow_tri_half'
                    },
                    {
                        value:  'end_arrow_two_tri',
                        label:  'end_arrow_two_tri'
                    },
                    {
                        value:  'end_arrow_tri',
                        label:  'end_arrow_tri'
                    },
                    {
                        value:   'null',
                        label:   'null',
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
        width: 30%;
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
