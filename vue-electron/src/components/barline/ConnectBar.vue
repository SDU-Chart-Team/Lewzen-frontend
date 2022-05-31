<template>
    <div class="card">
        <div class="card-header">link/unlink</div>
        <div class="card-item">
            <el-input
                    placeholder="id1;link/unlink;id2"
                    size="mini"
                    v-model="from_connect_to"
            >
                <el-button
                        slot="append"
                        icon="el-icon-check"
                        @click="from_connect"
                >
                </el-button>
            </el-input>
        </div>
        <div class="card-item">
            <el-input
                    placeholder="id1;link/unlink;id2"
                    size="mini"
                    v-model="to_connect_to"
            >
                <el-button
                        slot="append"
                        icon="el-icon-check"
                        @click="to_connect"
                >
                </el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConnectBar",
        methods:{
            from_connect(){

            },
            to_connect(){

            }
        },
        data(){
            return{
                from_connect_to:"",
                to_connect_to:""
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
