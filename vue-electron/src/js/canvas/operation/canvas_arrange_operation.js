import {getCoreList} from "@/js/element/core/core_queue";
import {getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {getGInPosition, getModuleByGid, getModuleBySid} from "@/js/element/module/module_queue";
import {P, updateState} from "@/js/action/actionQueue";

export function z_index_to_back(){
    let coreList=getCoreList();
    let svg_id=coreList[coreList.length-1];
    let elementList=getGInPosition(svg_id);
    let map=getShapeMapId();
    let canvas=document.getElementById(map);
    for(var i=0;i<elementList.length;i++){
        let node=document.getElementById(elementList[i]);
        let Module=getModuleBySid(elementList[i]);
        let g_id=Module.g_id;
        let gNode=document.getElementById(g_id);
        gNode.removeChild(node);
        canvas.removeChild(gNode);
        gNode.appendChild(node);
        canvas.appendChild(gNode)
    }

}
export function z_index_to_front(){
    let coreList=getCoreList();
    let element=coreList[coreList.length-1];
    let node=document.getElementById(element);
    let map=getShapeMapId();
    let canvas=document.getElementById(map);
    let Module=getModuleBySid(element);
    let g_id=Module.g_id;
    let gNode=document.getElementById(g_id);
    gNode.removeChild(node);
    canvas.removeChild(gNode);
    gNode.appendChild(node);
    canvas.appendChild(gNode)

}
export function updateArrange(){
    P("get_theta",{})
    let coreList=getCoreList();
    if(coreList.length>1){
        setPosition({flag:false})
        setElementSize({flag:false})
    }else if (coreList.length===1){
        P("get_rect",{})
    }
}

export function ChangeAngle(angle,angle1){
    updateState({theta:parseFloat(angle1)/360*2*Math.PI})
    P("set_theta",{theta:parseFloat(angle)/360*2*Math.PI},true);
    P("get_p",{},true);
}

