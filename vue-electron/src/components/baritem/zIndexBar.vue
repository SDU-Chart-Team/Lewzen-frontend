<template>
    <div class="card">
        <div class="card-header">z-index</div>
        <div class="card-item">
            <div>
                <button
                        style="width: 50%"
                        @click="zIndexToFront"
                >To Front</button>
                <button
                        style="width: 50%"
                        @click="zIndexToBack"
                >To Back</button>
            </div>
            <div>
                <button
                        style="width: 50%"
                        @click="zIndexFront"
                >Front</button>
                <button
                        style="width: 50%"
                        @click="zIndexBack"
                >Back</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {P} from "@/js/action/actionQueue";

    export default {
        name: "zIndexBar",
        methods:{
            zIndexToFront(){
                P("forward",{})
            },

            zIndexToBack(){
                P("backward",{})
            },

            zIndexFront(){
                P("front",{})
            },

            zIndexBack(){
                P("back",{})
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