import {getCoreList, updateCtrlOnFalse, updateCtrlOnTrue} from "@/js/element/core/core_queue";
import {canvas_scale, canvas_scale_down, canvas_scale_up} from "@/js/util/canvas_operation";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {P, updateState} from "@/js/action/actionQueue";
import {getAncestorAll} from "@/js/element/module/module_tree";
import {saveAsHTML, saveAsImage} from "../util/fileOperation";
import {getAllModules} from "../element/module/module_queue";
import {backAction, forwardAction, getActionCounter} from "../action/actionQueue";
import {get_svg_flag} from "../element/last/last_map_operation";


let key_code_map={}
let ctrlOn=false;
export function initKey(){
    document.onkeydown=function (e) {
        key_code_map[e.keyCode]=true;
        // console.log(e.keyCode)
        // console.log(e.ctrlKey)
        if(e.ctrlKey){
            updateCtrlOnTrue();
            ctrlOn=true;
        }else{
            ctrlOn=false;
        }
        if(e.keyCode===97){//1
            if(e.ctrlKey){
                canvas_scale_up()
                e.preventDefault();
            }
        }else if(e.keyCode===99){//3
            if(e.ctrlKey){
                if(get_svg_flag()){
                    canvas_scale_down()
                }
            }
        }else if(e.keyCode===67){//c
            if(e.ctrlKey){
                if(get_svg_flag()){
                    ctrlC();
                    e.preventDefault();
                }
            }
        }else if(e.keyCode===86){//v
            if(e.ctrlKey){
                if(get_svg_flag()){
                    ctrlV();
                    e.preventDefault();
                }
            }
        }else if(e.keyCode===83){//s
            if(e.ctrlKey){
                let svg=document.getElementById(getShapeMapId());
                let children=svg.childNodes;
                for(let i=0;i<children.length;i++){
                    let style=children[i].getAttribute("style");
                    // console.log(style);
                    let id=children[i].getAttribute("id");
                    // console.log(id);
                    P("cursors",{ids:[id]})
                    P("set_style",{style:style})
                }
                P("save",{})
                e.preventDefault();
            }
        }else if(e.keyCode===79){//o
            if(e.ctrlKey){
                saveAsImage();
                e.preventDefault();
            }
        }else if(e.keyCode===65){//a
            if(e.ctrlKey){
                if(get_svg_flag()){
                    let list=getAllModules();
                    P("cursors",{ids:list})
                }
            }
        }else if(e.keyCode===89){//y;
            if(e.ctrlKey){
                if(get_svg_flag()){
                    forwardAction();
                }
            }
        }else if(e.keyCode===90){//z;
            if(e.ctrlKey){
                if(get_svg_flag()){
                    backAction();
                }
            }
        }else if(e.keyCode===8){
            if(get_svg_flag()){
                let time= getActionCounter();
                P("remove",{time:time})
            }
        }else if(e.keyCode===37){
            if(get_svg_flag()){
                let node=document.getElementById("main_canvas");
                let top=parseInt(node.scrollTop)
                let left=parseInt(node.scrollLeft)-1;
                node.scrollTop=top;
                node.scrollLeft=left;

            }
        }else if(e.keyCode===38){
            if(get_svg_flag()){
                let node=document.getElementById("main_canvas");
                let top=parseInt(node.scrollTop)-1;
                let left=parseInt(node.scrollLeft);
                node.scrollTop=top;
                node.scrollLeft=left;
            }
        }else if(e.keyCode===39){
            if(get_svg_flag()){
                let node=document.getElementById("main_canvas");
                let top=parseInt(node.scrollTop)
                let left=parseInt(node.scrollLeft)+1;
                node.scrollTop=top;
                node.scrollLeft=left;
            }
        }else if(e.keyCode===40){
            if(get_svg_flag()){
                let node=document.getElementById("main_canvas");
                let top=parseInt(node.scrollTop)+1;
                let left=parseInt(node.scrollLeft);
                node.scrollTop=top;
                node.scrollLeft=left;
            }
        }
    }

    document.onkeyup=function(e){
        // console.log("ctrl off");
        key_code_map[e.keyCode]=false;

        if(!e.ctrlKey){
            updateCtrlOnFalse();
            ctrlOn=false;
        }
    }
    let node=document.getElementById("main_canvas");

    node.onmousewheel = function (e) {
        // console.log(e.ctrlKey)
        if(e.wheelDelta > 0){
            if(e.ctrlKey){
                canvas_scale_up();
                e.preventDefault();

            }
        }else{
            if(e.ctrlKey){
                canvas_scale_down();
                e.preventDefault();
            }
        }
    }
}


let ctrlCList=[];
export function ctrlC(){
    ctrlCList=[];
    let coreList=getCoreList();
    ctrlCList=coreList;
}
export function ctrlV(){
    if(ctrlCList===[])return;
    let svg=document.getElementById(getShapeMapId());
    let children=svg.childNodes;
    for(let i=0;i<children.length;i++){
        let style=children[i].getAttribute("style");
        console.log(style);
        let id=children[i].getAttribute("id");
        console.log(id);
        P("cursors",{ids:[id]})
        P("set_style",{style:style})
    }

    let map={}

    for(let i=0;i<ctrlCList.length;i++){
        map[ctrlCList[i]]=1;
    }
    for(let i=0;i<ctrlCList.length;i++){
        let ancestorList=getAncestorAll(ctrlCList[i]);
        for(let i=0;i<ancestorList.length-1;i++){
            if(map[ancestorList[i]]!==undefined){
                map[ctrlCList[i]]=-1;
                break;
            }
        }
    }
    let list=[];
    for(let i=0;i<ctrlCList.length;i++){
        if(map[ctrlCList[i]]===1){
            list.push(ctrlCList[i]);
        }
    }
    P("cursors",{ids:list});
    updateState({list:list})
    P("copy",{});
}