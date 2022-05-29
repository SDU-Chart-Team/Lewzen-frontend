import {createElementByTag} from "@/js/util/createSvgOperation";
import {getHoverMapId, getKeyMapId, getMySvg} from "@/js/util/getCanvasIdOperation";
import {add_arrow, add_arrow_from, add_arrow_to} from "@/js/element/anchor/arrow_Queue";
import th from "element-ui/src/locale/lang/th";
import {P} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";
import {getListInFill} from "@/js/element/module/module_queue";
import {getActionCounter} from "../../action/actionQueue";
import {get_connect_point_list} from "../../canvas/base_canvas";

let counter=0;
class Arrow_operation {
    constructor() {
        this.from_point=false;
        this.to_point=false;
        this.from_id="from_point";
        this.to_id="to_point";
        this.from_point_a_id=undefined;
        this.from_point_g_id=undefined;
        this.to_point_a_id=undefined;
        this.to_point_g_id=undefined;
        this.now_in_point=undefined;
        this.flag=false;
    }

    signal(g_id,a_id,msg){
        let that=this;
        if(msg['type']==="auto"){
            if(this.from_point===false){
                this.from_point_create(g_id,a_id,msg);
            }else if(this.to_point===false){
                this.to_point_create(g_id,a_id,msg);
            }
        }
    }

    from_point_create(g_id,a_id,msg){
        if(this.from_point)return;
        this.from_point=true;
        let that=this;
        this.from_point_g_id=g_id;
        this.from_point_a_id=a_id;
        let node=createElementByTag("circle",this.from_id);
        let map_id="node_map";
        let map=document.getElementById(map_id);
        node.setAttribute("cx",msg['x']);
        node.setAttribute("cy",msg['y']);
        node.setAttribute("r",7);
        node.setAttribute("fill","green")
        map.appendChild(node);
        node.onmousedown=function(e){
            // let line_id="line"+counter
            // let line=createElementByTag("line",line_id)
            // counter++;
            // line.setAttribute("x1",msg['x'])
            // line.setAttribute("x2",msg['x'])
            // line.setAttribute("y1",msg['y'])
            // line.setAttribute("y2",msg['y'])
            // line.setAttribute("stroke-width",2);
            // line.setAttribute("stroke","black");
            // map.appendChild(line);
            // add_arrow(that.from_point_g_id,that.from_point_a_id,line_id)
            P("create",{id:7})
            P("set_start",{x:msg['x'],y:msg['y']})
            P("set_end",{x:msg['x'],y:msg['y']})
            P("get_p",{})
            let id=getCoreList()[0];
            add_arrow_from(g_id,a_id,getCoreList()[0]);
            let svg=document.getElementById(getMySvg());
            let start_x=e.offsetX;
            let end_x=e.offsetX;
            let start_y=e.offsetY;
            let end_y=e.offsetY;
            svg.onmousemove=function (e) {
                // line.setAttribute("x2",e.offsetX);
                // line.setAttribute("y2",e.offsetY);
                P("set_end",{x:e.offsetX,y:e.offsetY})
                P("get_p",{})
                end_x=e.offsetX;
                end_y=e.offsetY;
                // getListInFill(end_x,end_y)
                getListInFill(e.offsetX,e.offsetY);

            }
            svg.onmouseup=function(e){
                if(start_y===end_y&&
                    start_x===end_x
                ){
                    add_arrow_from(undefined,undefined,getCoreList()[0]);
                    let time= getActionCounter();
                    P("remove",{time:time})
                    // map.removeChild(line);
                }else{
                    console.log(id+"_end")
                    let node=document.getElementById(id+"_"+"end");
                    console.log(node);
                    let x=node.getAttribute('cx')
                    let y=node.getAttribute('cy')
                    let list=get_connect_point_list({x:x,y:y});
                    // alert(list);
                    // console.log(list)
                    if(list.length>=1){
                        let to_aid=list[0].a_id;
                        let to_gid=list[0].g_id;
                        add_arrow_to(to_gid,to_aid,that.g_id);
                    }else if(list.length===0){

                        add_arrow_to(undefined,undefined,that.g_id);
                    }
                }

                svg.onmousemove=null;
                svg.onmouseup=null;
                that.from_point_remove();
            }
        }
        node.onmouseleave=function (e) {
            that.from_point_remove();
        }
    }

    to_point_create(g_id,a_id,msg){
        if(this.to_point)return;
        this.to_point=true;
        let that=this;
        let node=createElementByTag("circle",this.to_id);
        let map_id=getKeyMapId();
        this.to_point_a_id=a_id;
        this.to_point_g_id=g_id;
        let map=document.getElementById("node_map");
        node.setAttribute("cx",msg['x']);
        node.setAttribute("cy",msg['y']);
        node.setAttribute("r",7);
        node.setAttribute("fill","yellow")
        map.appendChild(node);
        this.now_in_point={g_id:g_id,a_id:a_id}
        node.onmouseleave=function (e) {
            that.to_point_remove();
        }
        node.onclick=function(e){
            that.flag=false;
            let from=document.getElementById("from_point");
            let to=document.getElementById("to_point");
            let from_x=from.getAttribute("cx");
            let from_y=from.getAttribute("cy");
            let to_x=to.getAttribute("cx");
            let to_y=to.getAttribute("cy");
            P("create",{id:7})
            P("set_start",{x:parseInt(from_x),y:parseInt(from_y)})
            P("set_end",{x:parseInt(to_x),y:parseInt(to_y)})
            P("get_p",{})
            let coreList=getCoreList();
            add_arrow(coreList[0],that.from_point_g_id,that.from_point_a_id,that.to_point_g_id,that.to_point_a_id);
            that.clear();
        }
    }

    from_point_remove(){
        if(!this.from_point)return;
        this.from_point=false;
        let node=document.getElementById(this.from_id);
        let map=document.getElementById("node_map");
        map.removeChild(node);
    }

    to_point_remove(){
        if(!this.to_point)return;
        this.to_point=false;
        this.now_in_point=undefined
        let node=document.getElementById(this.to_id);
        let map=document.getElementById("node_map");
        map.removeChild(node);
    }

    clear(){
        this.from_point_remove()
        this.to_point_remove()
    }
}

let arrower=new Arrow_operation();

export function signal_arrow(g_id,a_id,msg) {
    arrower.signal(g_id,a_id,msg);
}


export function clear_arrow_point(){
    arrower.clear();
}

