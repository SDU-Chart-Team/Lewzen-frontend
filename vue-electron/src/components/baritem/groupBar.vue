<script src="../../js/action/Register/addAction.js"></script>
<template>
    <div class="card">
        <div class="card-header">
            Group
        </div>
        <div class="card-item">
            <div v-if="group_on">
                <el-button
                        :disabled="flag"
                        size="mini"
                        id="group_button"
                        @click="group"
                        style="width: 100%">
                    Group
                </el-button>
            </div>
            <div v-if="!group_on">
                <el-button
                        :disabled="flag"
                        size="mini"
                        id="ungroup_button"
                        @click="ungroup"
                        style="width: 100%">
                    Ungroup
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {after_register_set, before_register_set, getActionCounter, P} from "@/js/action/actionQueue";
    import {getCoreList} from "@/js/element/core/core_queue";
    import {getChildrenOneList} from "@/js/element/module/module_tree";
    import {createUngroupAction} from "@/js/action/Register/ungroupAction";

    export default {
        name: "groupBar",
        mounted() {
            window.setGroupType=this.setGroupType
            window.groupFlag=this.groupFlag
        },
        methods:{
            groupFlag(flag){
                this.flag=flag;
            },
            group(){
                P("create",{id:2,show:false})

            },
            ungroup(){
                let coreList=getCoreList();
                let son=getChildrenOneList(coreList[0])
                let val={
                    command:"ungroup",
                    flag:true
                }
                before_register_set(true);
                createUngroupAction(val,{group_id:coreList[0],son:son})
                let time= getActionCounter();
                P("remove",{time:time})
            },
            setGroupType(flag){
                this.group_on=flag;
            },
        },
        data(){
            return{
                text:"",
                group_on:true,
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