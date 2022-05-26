import {getHoverPosition} from "@/svgParser/hoverProcessor";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getHoverMapId, getLastMapId, getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {P} from "@/js/action/actionQueue";
import {anchor_arrow_add, anchor_arrow_link, anchor_update, update_anchor_map} from "@/js/element/anchor/anchor_queue";
import {getCoreList} from "@/js/element/core/core_queue";

export class anchor_element{
    constructor(g_id) {
        this.g_id=g_id;
        this.flag=false;
        this.counter=0;
        this.modelon=true;
        this.map={}
    }
    update(){
        if(!this.flag){
            this.create();
            return;
        }
        // console.log("update")
        let node=document.getElementById(this.g_id);
        let children=node.childNodes;
        let position_old=[];
        for(let i=0;i<this.counter;i++){
            let cir=document.getElementById(this.g_id+"_hover"+i)
            let x=cir.getAttribute("cx");
            let y=cir.getAttribute("cy");
            position_old.push({cx:x,cy:y})
        }
        // console.log(position_old);
        // console.log(this.counter);
        let position=getHoverPosition(this.g_id);
        // console.log(position);
        // this.update_map(position_old,position)
        this.counter=position.length;
        for(let i=0;i<position.length;i++){
            let cir=document.getElementById(this.g_id+"_hover"+i)
            cir.setAttribute('cx',position[i]['cx'])
            cir.setAttribute('cy',position[i]['cy'])
        }
    }
    create(){
        let node=document.getElementById(this.g_id);
        let children=node.childNodes;
        let position=getHoverPosition(this.g_id);
        // console.log(position);
        this.counter=position.length;
        // console.log(position);
        for(let i=0;i<position.length;i++){
            let cir=createElementByTag("circle",this.g_id+"_hover"+i)
            cir.setAttribute('cx',position[i]['cx'])
            cir.setAttribute('cy',position[i]['cy'])
            cir.setAttribute('r',5)
            cir.setAttribute('fill',"lightgreen")
            let id=getHoverMapId();
            let map=document.getElementById(id);
            map.appendChild(cir)
        }
        // this.update_map([],position);
        this.setMouseDown();
        this.display_none();
        this.flag=true;
    }

    display_block(){
        if(!this.modelon){
            return;
        }
        for(let i=0;i<this.counter;i++){
            let cir=document.getElementById(this.g_id+"_hover"+i)
            cir.setAttribute("style","display:block")
        }

    }

    display_none(){
        for(let i=0;i<this.counter;i++){
            let cir=document.getElementById(this.g_id+"_hover"+i)
            cir.setAttribute("style","display:none")
        }
    }

    update_map(position_old,position_new){
        for(let i=0;i<position_old.length;i++){
            position_old[i]['cx']=parseInt(position_old[i]['cx'])
            position_old[i]['cy']=parseInt(position_old[i]['cy'])
        }
        for(let i=0;i<position_new.length;i++){
            position_new[i]['cx']=parseInt(position_new[i]['cx'])
            position_new[i]['cy']=parseInt(position_new[i]['cy'])
        }
        update_anchor_map(position_old,position_new,this.g_id);
    }

    model_on(){
        this.modelon=true;
    }

    model_off(){
        this.modelon=false;
    }

    setMouseDown(){
        let node=document.getElementById(this.g_id);
        let children=node.childNodes;
        let position=getHoverPosition(this.g_id);
        // console.log(position);
        this.counter=position.length;
        for(let i=0;i<position.length;i++){
            let cir=document.getElementById(this.g_id+"_hover"+i)

            let that=this;
            cir.onmouseenter=function (e) {
                let new_node=createElementByTag("circle",that.g_id+"_hover"+i+"now");
                let x=parseInt(cir.getAttribute("cx"));
                let y=parseInt(cir.getAttribute("cy"));
                new_node.setAttribute("cx",x);
                new_node.setAttribute("cy",y);
                new_node.setAttribute("r",6)
                new_node.setAttribute("style","fill:lightgreen")
                let map=document.getElementById(getShapeMapId());
                map.appendChild(new_node);
                new_node.onmousedown=function(e){
                    // map.appendChild(new_node);
                    // P("create",{id:7})
                    let now_x=e.offsetX;
                    let now_y=e.offsetY;
                    P("create",{id:7})
                    P("set_start",{x:x,y:y})
                    P("set_end",{x:x,y:y})
                    let line=createElementByTag("line");
                    line.setAttribute("x1",x);
                    line.setAttribute("x2",x);
                    line.setAttribute("y1",y);
                    line.setAttribute("y2",y);
                    line.setAttribute("stroke-width","2")
                    line.setAttribute("stroke","blue")
                    anchor_update(" ","arrow_on");
                    // map.appendChild(line);
                    let last_map=document.getElementById(getMySvg());
                    last_map.onmousemove=function(e){
                        anchor_arrow_add(that.g_id,i);
                        let new_x=e.offsetX;
                        let new_y=e.offsetY;
                        let move_x=new_x-now_x;
                        let move_y=new_y-now_y;
                        now_x=new_x;
                        now_y=new_y;
                        // console.log(move_x);
                        // console.log(move_y);
                        let msg={core_id:"end",g_id:getCoreList()[0],move_x:move_x,move_y:move_y}
                        P("move_point",msg)
                        // P("set_end",{x:e.offsetX,y:e.offsetY})
                        // console.log(111);
                        line.setAttribute("x2",e.offsetX);
                        line.setAttribute("y2",e.offsetY);
                    }
                    last_map.onmouseup=function(e){
                        anchor_update(" ","arrow_off");

                        let node=document.getElementById(that.g_id+"_hover"+i+"now");
                        // console.log(node);
                        let map=document.getElementById(getShapeMapId());
                        if(node!==null) {
                            map.removeChild(node);
                        }
                        last_map.onmousemove=null;
                        last_map.onmouseup=null;
                    }
                }
                new_node.onmouseleave=function (e) {
                    let node=document.getElementById(that.g_id+"_hover"+i+"now");
                    // console.log(node);
                    let map=document.getElementById(getShapeMapId());
                    if(node!==null) {
                        map.removeChild(node);
                    }
                }
                new_node.onmouseup=function(e){
                    let flag=anchor_update(" ","arrow_get");
                    if(flag){
                        anchor_arrow_link(that.g_id,i);
                    }
                }
            }
        }
    }

}