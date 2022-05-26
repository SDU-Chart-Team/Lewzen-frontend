<template>
    <div class="card">
        <el-checkbox-group
                v-model="styleList"
                @change="handleStyleChange"
        >
            <!--                        <div class="bottom-item"><el-checkbox label="Sketch"></el-checkbox></div>-->
            <div class="bottom-item"><el-checkbox label="Rounded"></el-checkbox></div>
            <div class="bottom-item"><el-checkbox label="Curved"></el-checkbox></div>
        </el-checkbox-group>

    </div>

</template>

<script>
    export default {
        name: "diagramStyleBar",
        methods:{
            handleStyleChange(e){
                let round_flag=false;
                let curve_flag=false;
                for (var item in e){
                    if(e[item]==="Rounded"&&this.rounded===false){
                        OnRounded();
                        this.rounded=true;
                        round_flag=true;
                    }else if(e[item]==="Curved"&&this.curved===false){
                        OnCurved();
                        this.curved=true;
                        curve_flag=true;
                    }
                }
                if(!round_flag&&this.rounded===true){
                    OffRounded();
                    this.rounded=false;
                }
                if(!curve_flag&&this.curved===true){
                    OffCurved();
                    this.curved=false;
                }
            },
        },
        data(){
            return{
                styleList:[],
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