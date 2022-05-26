<template>
    <div id="note-tab">
    </div>
</template>

<script>
    import IntegratedEditor from "@/components/integratedEditor";
    import SvgBlock from "@/components/SvgBlock";
    import Vue from 'vue'
    import GraphBlock from "@/components/GraphBlock";
    import {updateCanvas} from "@/js/util/getCanvasIdOperation";
    import {inGraphModel} from "@/js/canvas/operation/canvas_model_operation";
    export default {
        name: "NodeView",
        components: {GraphBlock, SvgBlock, IntegratedEditor},
        data(){
          return{
              counter:0,
              nowCount:0,
              sort:[""],

          }
        },
        mounted() {
          window.addBlock=this.addBlock;
          window.getNoteId=this.getNoteId;
        },
        methods:{
            getNoteId(){
              return this.nowCount;
            },
            addBlock(sort){
                sort=parseInt(sort);
                if(sort===1){
                    this.addNoteBlock();
                    this.sort.push("note")
                }else if(sort===2){
                    this.addSvgBlock();
                    this.sort.push("svg")
                }else if(sort===3){
                    this.addGraphBlock();
                    this.sort.push("graph")
                }
            },
            addNoteBlock(){
                this.created(IntegratedEditor,)

            },
            addSvgBlock(){
                this.created(SvgBlock,{id:this.counter+1})
                setSvgBlockInit(this.counter);
            },
            addGraphBlock(){
                this.created(GraphBlock,{id:this.counter+1})
                // let div=document.getElementById("note"+this.counter);
                // div.ondblclick=function(){
                //     createChart();
                // }
            },
            created(Component,props){
                let div=document.createElement("div");
                div.setAttribute("id","note"+(++this.counter));
                div.setAttribute("style",'border: 2px solid gray;');
                const comp=new (Vue.extend(Component))({propsData:props}).$mount();
                let node=document.getElementById("note-tab");
                node.appendChild(div);
                div.appendChild(comp.$el);
                let that=this;
                let count=that.counter;
                div.onclick=function(){
                    that.nowCount=count;
                    console.log(that.nowCount);
                    for(var i=1;i<=that.counter;i++){
                        let div=document.getElementById("note"+i);
                        div.setAttribute("style",'border: 2px solid gray;');
                    }
                    let div=document.getElementById("note"+count);
                    if(that.sort[count]==="svg"){
                        let msg=[];
                        msg['last_map']='last_map_'+count;
                        msg['shape_map']='shape_map_'+count;
                        msg['hover_map']='hover_map_'+count;
                        msg['text_map']='text_map_'+count;
                        msg['key_map']='key_map_'+count;
                        msg['myDefs']='myDefs_'+count;
                        msg['mySvg']='mySvg_'+count;
                        updateCanvas(msg);
                    }else if(that.sort[count]==="graph"){
                        inGraphModel();
                    }
                    div.setAttribute("style",'border: 2px solid orange;');
                }
                comp.remove=()=>{
                    node.removeChild(comp.$el)

                    comp.$destroy();
                }
                return comp;
            }
        }
    }


</script>

<style scoped>
#note-tab{
    overflow-y: auto;
}
.block-div{
    border: 1px solid #2c3e50;
}
</style>