import {offCoreAll, updateCtrlOnFalse, updateCtrlOnTrue} from "@/js/element/core/core_queue";
import {inDiagramModel} from "@/js/canvas/operation/canvas_model_operation";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getModuleInRect} from "@/js/element/module/module_queue";
import {P} from "@/js/action/actionQueue";
import {getMySvg, updateCanvas} from "@/js/util/getCanvasIdOperation";
import {cssParser} from "@/js/util/cssParser";


let flag=false;
export function get_rect_move_flag(){
    return flag;
}
export function init_canvas(){
    let msg=[];
    msg['last_map']='last_map';
    msg['shape_map']='shape_map';
    msg['hover_map']='hover_map';
    msg['text_map']='text_map';
    msg['key_map']='key_map';
    msg['myDefs']='myDefs';
    msg['mySvg']='mySvg';
    updateCanvas(msg);

    let id="last_map";
    let node=document.getElementById(id);
    let rect_id="update_rect"
    // let rect=createElementByTag("rect",rect_id);
    // node.appendChild(rect);
    node.onmousedown=function(e){
        let start_x=e.offsetX;
        let start_y=e.offsetY;
        let rect=createElementByTag("rect",rect_id);
        node.appendChild(rect);
        rect.setAttribute("x",start_x);
        rect.setAttribute("y",start_y);
        rect.setAttribute("width",0);
        rect.setAttribute("height",0);
        flag=true;
        let end_x=start_x;
        let end_y=start_y;
        let svg=document.getElementById(getMySvg());
        svg.onmousemove=function(e){
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
        svg.onmouseup=function(e){
            offCoreAll();

            let x=parseInt(rect.getAttribute("x"));
            let y=parseInt(rect.getAttribute("y"));
            let width=parseInt(rect.getAttribute("width"));
            let height=parseInt(rect.getAttribute("height"));
            let bbox={x:x,y:y,width:width,height:height}
            let list=getModuleInRect(bbox);
            // console.log(list);
            // for(var i=0;i<list.length;i++){
            //     P("core",{id:list[i]})
            // }
            P("cursors",{ids:list})
            if(list.length===0){
                inDiagramModel();
            }
            node.removeChild(rect);
            svg.onmouseleave=null;
            svg.onmousemove=null;
            svg.onmouseup=null;
            flag=false;
        }
        svg.onmouseleave=function (e) {
            if(node!==undefined) node.removeChild(rect);
            svg.onmouseleave=null;
            svg.onmousemove=null;
            svg.onmouseup=null;
            flag=false;
        }
    }
    init_canvas_right_menu()

}
function init_canvas_right_menu() {
    let svg=document.getElementById(getMySvg());
    svg.oncontextmenu=function (e) {
        // console.log(111);
        document.getElementById("rightClick").style.left=e.offsetX+'px';
        document.getElementById("rightClick").style.top=e.offsetY+'px';
        document.getElementById("rightClick").style.display='block';
        e.preventDefault();

    }
    svg.onmousedown=function (e) {
        let code=e.which;
        if(code===1){
            let menu=document.getElementById("rightClick");
            if(menu!==undefined){
                menu.style.display="none";
            }
        }
    }

}