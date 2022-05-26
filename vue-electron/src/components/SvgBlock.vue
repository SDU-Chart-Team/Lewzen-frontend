<template>
    <div class="svg-block" :id="'mySvg_'+id">
        <svg xmlns="http://www.w3.org/2000/svg"   :width="width" :height="height">
            <defs :id="'myDefs_'+id"></defs>
            <g :id="'last_map_'+id">
                <rect :id="'last_'+id" :height="height" :width="width" style="fill-opacity: 0"></rect>
            </g>
            <g :id="'shape_map_'+id"></g>
            <g :id="'text_map_'+id"></g>
            <g :id="'hover_map_'+id"></g>
            <g :id="'key_map_'+id"></g>


        </svg>
    </div>
</template>

<script>
    import {createElementByTag} from "@/js/util/createSvgOperation";
    import {offCoreAll} from "@/js/element/core/core_queue";
    import {getModuleInRect} from "@/js/element/module/module_queue";
    import {P} from "@/js/action/actionQueue";
    import {inDiagramModel} from "@/js/canvas/operation/canvas_model_operation";
    import {updateCanvas} from "@/js/util/getCanvasIdOperation";

    export default {
        name: "SvgBlock",
        props:['id'],
        mounted(){
            window.setSvgBlockInit=this.setSvgBlockInit;
        },
        methods:{
            setSvgBlockInit(block_id){
                let msg=[];
                msg['mySvg']='mySvg_'+block_id;
                msg['last_map']='last_map_'+block_id;
                msg['shape_map']='shape_map_'+block_id;
                msg['hover_map']='hover_map_'+block_id;
                msg['text_map']='text_map_'+block_id;
                msg['key_map']='key_map_'+block_id;
                msg['myDefs']='myDefs_'+block_id;
                updateCanvas(msg);
                let id="last_map_"+block_id;
                let node=document.getElementById(id);
                let rect_id="update_rect_"+block_id
                let rect=createElementByTag("rect",rect_id);
                node.appendChild(rect);
                node.onmousedown=function(e){
                    let start_x=e.offsetX;
                    let start_y=e.offsetY;
                    let rect=createElementByTag("rect",rect_id);
                    node.appendChild(rect);
                    rect.setAttribute("x",start_x);
                    rect.setAttribute("y",start_y);
                    rect.setAttribute("width",0);
                    rect.setAttribute("height",0);
                    let end_x=start_x;
                    let end_y=start_y;
                    node.onmousemove=function(e){
                        end_x=e.offsetX;
                        end_y=e.offsetY;
                        if(end_x<start_x){
                            rect.setAttribute("x",end_x);
                            rect.setAttribute("width",start_x-end_x);
                        }else{
                            rect.setAttribute("width",end_x-start_x);
                        }
                        if(end_y<start_y){
                            rect.setAttribute("y",end_y);
                            rect.setAttribute("height",start_y-end_y);
                        }else{
                            rect.setAttribute("height",end_y-start_y);
                        }
                        rect.setAttribute("fill","#E1F0FF");
                    }
                    node.onmouseup=function(e){
                        offCoreAll();
                        let x=parseInt(rect.getAttribute("x"));
                        let y=parseInt(rect.getAttribute("y"));
                        let width=parseInt(rect.getAttribute("width"));
                        let height=parseInt(rect.getAttribute("height"));
                        let bbox={x:x,y:y,width:width,height:height}
                        let list=getModuleInRect(bbox);
                        // console.log(list);
                        for(var i=0;i<list.length;i++){
                            P("core",{id:list[i]})
                        }
                        if(list.length===0){
                            inDiagramModel();
                        }
                        node.removeChild(rect);
                        node.onmousemove=null;
                        node.onmouseup=null;
                    }
                }
            }
        },
        data(){
            return{
                width:"100%",
                height:300,
            }
        }
    }
</script>

<style scoped>
.svg-block{
    /*background-color: #42b983;*/
    height: 300px;
    overflow: hidden;
}
</style>