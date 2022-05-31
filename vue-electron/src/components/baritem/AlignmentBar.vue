<template>
    <div class="card">
        <div class="card-header">
            Alignment
        </div>
        <div class="card-item">
            <div class="clear">
                <div class="card-left">
                    horizontal
                </div>
                <div class="card-right">
                    <el-select
                            :disabled="flag"
                            v-model="horizontal_value"
                            style="height: 20px;width: 150px;user-select: none"
                            size="mini"
                            placeholder="请选择"
                            @change="handleH"
                    >
                        <el-option
                                v-for="item in horizontal"
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
                <div class="card-left">
                    vertical
                </div>
                <div class="card-right">
                    <el-select
                            :disabled="flag"
                            v-model="vertical_value"
                            style="height: 20px;width: 150px"
                            size="mini"
                            placeholder="请选择"
                            @change="handleV"
                    >
                        <el-option
                                v-for="item in vertical"
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
    import {P, updateState} from "@/js/action/actionQueue";

    export default {
        name: "AlignmentBar",
        mounted() {
            window.set_alignment_bar=this.set_alignment_bar;
            window.set_alignment_flag=this.set_alignment_flag;
        },
        methods:{
            set_alignment_flag(flag){
              this.flag=flag;
            },
            set_alignment_bar(msg){
                // console.log(msg);
                this.vertical_value=""+msg['vertical'];
                this.horizontal_value=""+msg['horizontal']
                this.vertical_value_last=this.vertical_value;
                this.horizontal_value_last=this.horizontal_value;
            },
            handleH(e){
                updateState({alignment:{horizental:parseInt(this.horizontal_value_last),vertical:parseInt(this.vertical_value_last)}})
                P("set_alignment",{alignment:{horizental:parseInt(this.horizontal_value),vertical:parseInt(this.vertical_value)}})
                this.vertical_value_last=this.vertical_value;
                this.horizontal_value_last=this.horizontal_value;
                // console.log(this.horizontal_value);
            },
            handleV(e){
                updateState({alignment:{horizental:parseInt(this.horizontal_value_last),vertical:parseInt(this.vertical_value_last)}})
                P("set_alignment",{alignment:{horizental:parseInt(this.horizontal_value),vertical:parseInt(this.vertical_value)}})
                this.vertical_value_last=this.vertical_value;
                this.horizontal_value_last=this.horizontal_value;
            }
        },
        data(){
            return{
                flag:true,
                vertical_value:"1",
                vertical_value_last:"1",
                vertical:[
                    {
                        value: '0',
                        label: 'top'
                    },
                    {
                        value: '1',
                        label: 'center'
                    },
                    {
                        value:  '2',
                        label: 'bottom'
                    }
                ],
                horizontal_value:"1",
                horizontal_value_last:"1",
                horizontal:[
                    {
                        value: '0',
                        label: 'left'
                    },
                    {
                        value: '1',
                        label: 'center'
                    },
                    {
                        value:  '2',
                        label: 'right'
                    }
                ]
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
