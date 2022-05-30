import {cssParser} from "@/js/util/cssParser";
import {updateStyle} from "@/js/canvas/operation/canvas_style_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {getCoreList} from "@/js/element/core/core_queue";
import {P} from "@/js/action/actionQueue";
import {updateLink} from "@/js/canvas/operation/canvas_link_operation";
import {updateTextSet} from "@/js/canvas/operation/canvas_text_operation";
import {getModuleByGid} from "@/js/element/module/module_queue";

export function inDiagramModel() {
    let diagram=document.getElementById("diagramBar");
    let elementStyle=document.getElementById("elementStyleBar");
    let graph=document.getElementById("graphStyleBar");
    let line=document.getElementById("lineStyleBar");

    let style=new cssParser();
    style.updateStyle({display:"block"})
    diagram.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    elementStyle.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    style.clear();
    style.updateStyle({display:"none"});
    line.setAttribute("style",style.get());
    graph.setAttribute("style",style.get());
}

export function inElementStyleModel(){
    let coreList=getCoreList();
    if(getModuleByGid(coreList[0]).isLine&&coreList.length===1){
        inElementLineModel();
        return;
    }
    // console.log(coreList.length);

    if(coreList.length>1){
        offText();
        offRelation();
    }else{
        onText();
        onRelation();
    }
    let elementStyle=document.getElementById("elementStyleBar");
    let diagram=document.getElementById("diagramBar");
    let graph=document.getElementById("graphStyleBar");
    let line=document.getElementById("lineStyleBar");
    let style=new cssParser();
    style.updateStyle({display:"none"})
    diagram.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"block"})
    elementStyle.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    graph.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"});
    line.setAttribute("style",style.get());
    // let node=document.getElementById(coreList[coreList.length-1]);
    // let style_node=node.getAttribute("style");
    updateStyle(coreList[coreList.length-1]);
    updateArrange()
    updateTextSet();
    updateLink();
}

export function inGraphModel(){
    let diagram=document.getElementById("diagramBar");
    let elementStyle=document.getElementById("elementStyleBar");
    let graph=document.getElementById("graphStyleBar");
    let line=document.getElementById("lineStyleBar");
    let style=new cssParser();
    style.updateStyle({display:"none"})
    diagram.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    elementStyle.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    graph.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"block"});
    line.setAttribute("style",style.get());
}


export function changeModel(){
    let coreList=getCoreList();
    if(coreList.length===0){
        inDiagramModel();
    }else{
        inElementStyleModel();
    }
}

export function inElementLineModel(){
    let coreList=getCoreList();
    let elementStyle=document.getElementById("elementStyleBar");
    let diagram=document.getElementById("diagramBar");
    let graph=document.getElementById("graphStyleBar");
    let line=document.getElementById("lineStyleBar");
    let style=new cssParser();
    style.updateStyle({display:"none"})
    diagram.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    elementStyle.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"none"})
    graph.setAttribute("style",style.get());
    style.clear();
    style.updateStyle({display:"block"});
    line.setAttribute("style",style.get());
    let node=document.getElementById(coreList[coreList.length-1]);
    let style_node=node.getAttribute("style");
    // updateStyle(style_node);
    // updateLink();
}

