<template>
    <div class="card">
        <div class="card-header"> Bind</div>
        <div class="card-item">
            <el-checkbox-group @change="handleChange" v-model="list">
                <div class="bottom-item">
                    <el-checkbox
                            :disabled="flag"
                            label="move_bind"></el-checkbox>
                </div>
                <div class="bottom-item">
                    <el-checkbox
                            :disabled="flag"
                            label="flip_bind"></el-checkbox>
                </div>
                <div class="bottom-item">
                    <el-checkbox
                            :disabled="flag"
                            label="scale_bind"></el-checkbox>
                </div>
                <div class="bottom-item">
                    <el-checkbox
                            :disabled="flag"
                            label="rotate_bind"></el-checkbox>
                </div>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    import {OffGrid, OnGrid} from "@/js/canvas/operation/canvas_diagram_operation";
    import {setShadowAll} from "@/js/canvas/operation/canvas_style_operation";
    import {P} from "@/js/action/actionQueue";

    export default {
        name: "BindBar",
        mounted() {
            window.set_move_bind=this.set_move_bind;
            window.set_flip_bind=this.set_flip_bind;
            window.set_scale_bind=this.set_scale_bind;
            window.set_rotate_bind=this.set_rotate_bind;
            window.setBindFlag=this.setBindFlag;
        },
        methods:{
            setBindFlag(flag){
              this.flag=flag;
              if(flag){
                  this.set_flip_bind(false)
                  this.set_scale_bind(false)
                  this.set_rotate_bind(false)
                  this.set_move_bind(false)
              }
            },
            set_flip_bind(flag){
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i]==="flip_bind"){
                        if(!flag){
                            this.list.splice(i,1);
                        }else{
                            return;
                        }
                    }
                }
                if(flag){
                    this.list.push("flip_bind");
                }
            },
            set_move_bind(flag){
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i]==="move_bind"){
                        if(!flag){
                            this.list.splice(i,1);
                        }else{
                            return;
                        }
                    }
                }
                if(flag){
                    this.list.push("move_bind");
                }
            },
            set_scale_bind(flag){
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i]==="scale_bind"){
                        if(!flag){
                            this.list.splice(i,1);
                        }else{
                            return;
                        }
                    }
                }
                if(flag){
                    this.list.push("scale_bind");
                }
            },
            set_rotate_bind(flag){
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i]==="rotate_bind"){
                        if(!flag){
                            this.list.splice(i,1);
                        }else{
                            return;
                        }
                    }
                }
                if(flag){
                    this.list.push("rotate_bind");
                }
            },
            handleChange(e){
                let map={}
                for (let i=0;i<e.length;i++){
                    map[e[i]]=1;
                }
                // console.log(e);
                if(map["flip_bind"]!==undefined){
                    P("enable_flip_bind",{});
                    // console.log("flip_bind_on")
                }else{
                    P("disable_flip_bind",{});
                    // console.log("flip_bind_off")
                }

                if(map["move_bind"]!==undefined){
                    P("enable_move_bind",{});
                    // console.log("move_bind_on")
                }else{
                    P("disable_move_bind",{});
                    // console.log("move_bind_off")
                }

                if(map["scale_bind"]!==undefined){
                    P("enable_scale_bind",{});
                    // console.log("scale_bind_on")
                }else{
                    P("disable_scale_bind",{});
                    // console.log("scale_bind_off")
                }

                if(map["rotate_bind"]!==undefined){
                    P("enable_rotate_bind",{})
                    // console.log("rotate_bind_on")
                }else{
                    P("disable_rotate_bind",{})
                    // console.log("rotate_bind_off")
                }

            },
        },
        data(){
            return{
                list: [],
                flag:true,
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