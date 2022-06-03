import {cssParser} from "@/js/util/cssParser";
import {updateStyle} from "@/js/canvas/operation/canvas_style_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {getCoreList} from "@/js/element/core/core_queue";
import {P} from "@/js/action/actionQueue";
import {updateLink} from "@/js/canvas/operation/canvas_link_operation";
import {updateTextSet} from "@/js/canvas/operation/canvas_text_operation";
import {getModuleByGid} from "@/js/element/module/module_queue";

export function inDiagramModel() {
    // let diagram=document.getElementById("diagramBar");
    // let elementStyle=document.getElementById("elementStyleBar");
    // let graph=document.getElementById("graphStyleBar");
    // let line=document.getElementById("lineStyleBar");
    //
    // let style=new cssParser();
    // style.updateStyle({display:"block"})
    // diagram.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // elementStyle.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // style.clear();
    // style.updateStyle({display:"none"});
    // line.setAttribute("style",style.get());
    // graph.setAttribute("style",style.get());

    offText();
    offRelation();
    updateLineFlag(true);
    updateElementFlag(true);
    setPosition({flag:false})
    setElementSize({flag:false})
}

export function inElementStyleModel(){

    let coreList=getCoreList();
    if(getModuleByGid(coreList[0]).isLine&&coreList.length===1){
        inElementLineModel();
        offText();
        offRelation();
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
    // let elementStyle=document.getElementById("elementStyleBar");
    // let diagram=document.getElementById("diagramBar");
    // let graph=document.getElementById("graphStyleBar");
    // let line=document.getElementById("lineStyleBar");
    // let style=new cssParser();
    // style.updateStyle({display:"none"})
    // diagram.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"block"})
    // elementStyle.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // graph.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"});
    // line.setAttribute("style",style.get());
    // let node=document.getElementById(coreList[coreList.length-1]);
    // let style_node=node.getAttribute("style");
    updateElementFlag(false)
    updateStyle(coreList[coreList.length-1]);
    updateArrange()
    updateTextSet();
    updateLink();
    updateLineFlag(true)
}

export function inGraphModel(){
    // let diagram=document.getElementById("diagramBar");
    // let elementStyle=document.getElementById("elementStyleBar");
    // let graph=document.getElementById("graphStyleBar");
    // let line=document.getElementById("lineStyleBar");
    // let style=new cssParser();
    // style.updateStyle({display:"none"})
    // diagram.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // elementStyle.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // graph.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"block"});
    // line.setAttribute("style",style.get());
}


export function changeModel(){
    let model=getRightModel();
    if(model==="Menu"){
    }else if(model==="Setting"){
    }else if(model==="Fill"){
        setFillModel();
    }else if(model==="Arrange"){
        setArrangeModel();
    }else if(model==="Line"){
        setLineModel();
    }else if(model==="Text"){
        setTextModel();
    }else if(model==="Relation"){
        setRelationModel();
    }
    // let coreList=getCoreList();
    // if(coreList.length===0){
    //     inDiagramModel();
    // }else{
    //     inElementStyleModel();
    // }
}

export function inElementLineModel(){
    // let coreList=getCoreList();
    // let elementStyle=document.getElementById("elementStyleBar");
    // let diagram=document.getElementById("diagramBar");
    // let graph=document.getElementById("graphStyleBar");
    // let line=document.getElementById("lineStyleBar");
    // let style=new cssParser();
    // style.updateStyle({display:"none"})
    // diagram.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // elementStyle.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"none"})
    // graph.setAttribute("style",style.get());
    // style.clear();
    // style.updateStyle({display:"block"});
    // line.setAttribute("style",style.get());
    // let node=document.getElementById(coreList[coreList.length-1]);
    // let style_node=node.getAttribute("style");
    // updateStyle(style_node);
    // updateLink();

    updateLineFlag(false)
    updateElementFlag(true)
    setPosition({flag:false})
    setElementSize({flag:false})
}

function updateLineFlag(flag){
    setArrowFlag(flag);
    setLineTypeFlag(flag);
    set_dotted_line_flag(flag);
    offsetFlag(flag);
}

function updateElementFlag(flag){
    setFillFlag(flag);
    setStrokeFlag(flag);
    setStyleFlag(flag);
    zindexFlag(flag);
    setThetaFlag(flag);
    FlipFlag(flag);
    groupFlag(flag);
}




//*******************************

export function setFillModel(){

    let coreList=getCoreList();
    if(coreList.length===0){
        setFillFlag(true);
        setStrokeFlag(true);
        setStrokeFlag(true);
        return;
    }
    //设置fill和stroke
    let element=coreList[0];
    updateStyle(element);
    setFillFlag(false);
    setStrokeFlag(false);
    setStyleFlag(false);

    //设置stroke

}

export function setArrangeModel(){
    let coreList=getCoreList();
    if(coreList.length===0){
        zindexFlag(true);
        setThetaFlag(true);
        set_theta_bar("");
        FlipFlag(true);
        setPosition({flag:false})
        groupFlag(true);
        return;
    }
    if(coreList.length>1){
        zindexFlag(false);
        setThetaFlag(false);
        FlipFlag(false);
        setPosition({flag:false})
        groupFlag(false);
        setGroupType(true);
    }else{
        zindexFlag(false);
        let element=getModuleByGid(coreList[0]);
        if(!element.show){
            groupFlag(false);
            setGroupType(false);

        }else{
            groupFlag(true);
            setGroupType(true);
        }
        setThetaFlag(false);
        FlipFlag(false);
        P("get_rect",{})
        P("get_theta",{})
    }
}

export function setLineModel(){
    let coreList=getCoreList();
    for(let i=0;i<coreList.length;i++){
        let element=getModuleByGid(coreList[i]);
        if(!element.isLine){
            setArrowFlag(true);
            setLineTypeFlag(true);
            set_dotted_line_flag(true);
            offsetFlag(true);
            return;
        }
    }
    setArrowFlag(false);
    setLineTypeFlag(false);
    set_dotted_line_flag(false);
    offsetFlag(false);
    P("get_offset",{})
}

export function setTextModel(){
    updateTextSet();
}

export function setRelationModel(){
    let coreList=getCoreList();
    if(coreList.length!==1){
        offRelation();
    }else{
        onRelation();
        updateLink();

    }
}





