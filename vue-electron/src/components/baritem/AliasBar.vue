<template>
    <div class="card">
        <div class="card-header">Alias</div>
        <div class="card-item">
            <el-input
                    placeholder="change alias"
                    size="mini"
                    v-model="alias_text"
            >
                <el-button
                        slot="append"
                        icon="el-icon-check"
                        @click="alias_set"
                >
                </el-button>
            </el-input>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    import {setAlias} from "@/js/element/module/module_tree";
    import {updateLink} from "@/js/canvas/operation/canvas_link_operation";

    export default {
        name: "AliasBar",
        mounted() {
            window.alias_update= this.alias_update
        },
        methods:{
            alias_set(){
                setAlias(this.alias_text);
                updateLink()
            },
            alias_update(text){
                this.alias_text=text;
            }
        },
        data(){
            return{
                alias_text:"",

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