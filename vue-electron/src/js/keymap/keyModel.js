import {getCoreList, updateCtrlOnFalse, updateCtrlOnTrue} from "@/js/element/core/core_queue";
import {canvas_scale, canvas_scale_down, canvas_scale_up} from "@/js/util/canvas_operation";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {P, updateState} from "@/js/action/actionQueue";
import {getAncestorAll} from "@/js/element/module/module_tree";


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
            if(ctrlOn){
                canvas_scale_up()
            }
        }else if(e.keyCode===99){//3
            if(ctrlOn){
                canvas_scale_down()
            }
        }else if(e.keyCode===67){//c
            if(ctrlOn)ctrlC();
        }else if(e.keyCode===86){//v
            if(ctrlOn)ctrlV();
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

    document.onmousewheel = function (e) {
        // console.log(e.ctrlKey)
        if(e.wheelDelta > 0){
            if(ctrlOn){
                canvas_scale_up();
            }
        }else{
            if(ctrlOn){
                canvas_scale_down();
            }
        }
    }
}


let ctrlCList=[];
export function ctrlC(){
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
    ctrlCList=[];
}