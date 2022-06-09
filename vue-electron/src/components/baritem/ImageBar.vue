<template>
    <div>
        <div class="card">
            <div class="card-header">
                Upload Image
            </div>
            <div class="card-item clear">
                <div>
                    <el-button
                            size="mini"
                            style="width: 100%"
                            @click="clickImage"
                    >
                        <input
                                type="file"
                                name="open"
                                id="imagePath"
                                style="display: none"
                                @change="getImage($event)"
                        />
                        Upload Image</el-button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Image Size
            </div>
            <div id="image_list" class="card-item clear">

            </div>
        </div>
        <el-form v-if="size_change" label-width="60px">
            <el-form-item label="width">
                <el-input
                        size="mini"
                        v-model="image_width"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="height">
                <el-input
                        size="mini"
                        v-model="image_height"
                >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                        size="mini"
                        type="primary"
                        @click="onSubmit">set</el-button>
                <el-button
                        size="mini"
                        @click="offDialog">cancel</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script>
    import {P, updateState} from "@/js/action/actionQueue";
    import {addLinearGradient} from "@/js/util/LinearGradientCreator";
    import {initCanvasState} from "@/js/util/init";
    import {getCoreList} from "@/js/element/core/core_queue";
    import {addImage, getImageCounter, setImageCounter} from "@/js/util/userImageManager";

    export default {
        name: "ImageBar",
        mounted() {
            window.initImageBar=this.initImageBar;
        },

        methods:{
            initImageBar(msg){
                let that=this;
                let image_list=msg['json']['image'];
                let image_size=msg['json']['image_size'];
                if(image_list!==null&&image_list!==undefined){
                    for(let i=0;i<image_list.length;i++){
                        let image_id=image_list[i]['image_id'];
                        let image=document.getElementById(image_id);
                        if(image!==null&&image!==undefined){
                            let imageBar=document.getElementById("image_list");
                            var img=new Image();
                            img.src=image.src;
                            img.id=image_id+"copy";
                            img.style.height="100px";
                            img.style.width="100px";
                            img.ondblclick=function(e){
                                that.change_id=id;
                                that.onDialog();
                            }
                            imageBar.appendChild(img);
                        }
                    }
                    setImageCounter(image_size);
                }
            },
            onSubmit(){
                this.changeSize();
            },
            changeSize(){
                // console.log(id);
                let node=document.getElementById(this.change_id);
                if(node!==undefined&&node!==null){
                    node.style.width=this.image_width;
                    node.style.height=this.image_height;
                    console.log(node);
                    P("cursors",{ids:[this.module_id]})
                    P("set_html",{html:escape(node)})
                    P("cursors",{ids:[this.module_id]})
                }
            },
            onDialog(){
                this.size_change=true;
                this.style_width="";
                this.style_height="";
            },
            offDialog(){
                this.size_change=false;
            },
            clickImage(){
              const input=document.getElementById("imagePath")
              input.click();
            },
            getImage(obj){
                var fileobj=document.getElementById("imagePath").files[0];
                if(fileobj===null||fileobj===undefined){
                    return;
                }
                let that=this;
                var reader=new FileReader();
                reader.readAsDataURL(fileobj)
                reader.onload=function () {
                    // console.log(reader.result)
                    let imageBar=document.getElementById("image_list");
                    let src='data:image/png;'+reader.result;
                    // console.log(src);
                    var image=new Image();
                    image.src=src;
                    let id='user_image'+getImageCounter();
                    let module_id=getCoreList()[0];
                    image.onload=()=>{
                        image.style.height="100px";
                        image.style.width="200px";
                        image.id=id;
                        var img=new Image();
                        img.src=src;
                        img.id=id+"copy";
                        img.style.height="100px";
                        img.style.width="100px";
                        // img.ondblclick=function(e){
                        //     this.module_id=module_id;
                        //     that.change_id=id;
                        //     that.onDialog();
                        // }
                        let div=document.createElement("div");
                        div.appendChild(image);
                        imageBar.appendChild(img);
                        addImage(module_id,id);
                        // console.log(div.innerHTML)
                        P("set_html",{html:escape(div.innerHTML)})
                    }
                }
            }
        },
        data(){
            return{
                size_change:false,
                image_width:"",
                image_height:"",
                change_id:"",
                module_id:"",
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
