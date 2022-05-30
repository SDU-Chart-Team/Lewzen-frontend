import {getCoreList} from "@/js/element/core/core_queue";
import {cssParser} from "@/js/util/cssParser";
import {addLinearGradient, getGradient} from "@/js/util/LinearGradientCreator";
import {getGuideBySvgId} from "@/js/element/guide/guide_queue";
import {getShapeMapId} from "@/js/util/getCanvasIdOperation";



function setCoreFillColor(color){
    let coreList=getCoreList();
    // console.log(coreList);
    for(var i=0;i<coreList.length;i++){
        let g_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(g_id);
        parser.parseStyle(node.getAttribute("style"))
        parser.updateStyle({"fill":color});
        node.setAttribute("style",parser.get());
    }
}

function getColorInCore() {
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"))
        let tmp=parser.returnStyle("fill")
        return tmp;
    }
}
function initFillColor(){
    let coreList=getCoreList();
    // console.log(coreList);
    for(var i=0;i<coreList.length;i++){
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"))
        parser.updateStyle({"fill":"rgba(255,255,255,1)"})
        parser.updateStyle({"fill-opacity":1})
        node.setAttribute("style",parser.get());
    }

}

function unInitFillColor(){
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let g_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(g_id);
        parser.parseStyle(node.getAttribute("style"))
        parser.updateStyle({"fill-opacity":0})
        node.setAttribute("style",parser.get());
    }
}

export function updateStyle(id){
    let node=document.getElementById(id)
    let style=node.getAttribute("style")
    let parser=new cssParser();
    parser.parseStyle(style);
    let msg={};
    //fill
    let fillOn=parser.returnStyle("fill-opacity");
    if(parseInt(fillOn)===0){
        msg["fillOn"]=false;
    }else{
        msg["fillOn"]=true;
        let fill=parser.returnStyle("fill");
        // console.log(Trim(fill).substr(0,1))
        if(Trim(fill).substr(0,1)==="u"){
            msg['gradientOn']=true;
            fill=Trim(fill);
            console.log(fill.substring(14,fill.length-1));
            let fillColor=getGradient(fill.substring(14,fill.length-1));
            msg['value_gradient']=fillColor['direction'];
            msg['color_gradient']=fillColor['end_color'];
            msg['color_fill']=fillColor['start_color'];
        }else{
            msg['gradientOn']=false;
            msg['value_gradient']="south"
            fill=window.getComputedStyle(node).fill;
            msg['color_gradient']=fill;
            msg['color_fill']=fill;
        }
    }
    msg['value_gradient']="south"
    msg['stroke']=window.getComputedStyle(node).stroke;
    msg['stroke-width']=window.getComputedStyle(node).strokeWidth;
    // msg['stroke-width']=parser.returnStyle("stroke-width")
    msg['stroke-dasharray']=parser.returnStyle("stroke-dasharray")
    if(msg['stroke-dasharray']===undefined||Trim(msg['stroke-dasharray'])===""){
        msg['stroke-dasharray']="solid";
    }else{
        msg['stroke-dasharray']="dotted";
    }
    // setStyle(msg);
    setFillStyle(msg);
    setStrokeStyle(msg);
}

export function OnFill(){
    console.log("On Fill!!!")
    initFillColor();

}

export function OffFill(){
    console.log("Off Fill!!!");
    unInitFillColor();
}

export function FillColorChange(e){
    console.log("Fill change")
    setCoreFillColor(e)
}



export function OnGradient(){
    console.log("On Gradient!!!")
}

export function GradientChange(e){
    console.log(e);
    console.log("Gradient change!!!")
    let id='url(#'+addLinearGradient(e)+')';
    setCoreFillColor(id);
}
export function OffGradient(){
    console.log("Off Gradient!!!")

}


//line style

function getStrokeStyleInCore(){
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let msg=[];
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"));
        msg['stroke']=parser.returnStyle("stroke")
        msg['stroke-width']=parser.returnStyle("stroke-width")
        msg['stroke-dasharray']=parser.returnStyle("stroke-dasharray")
        return msg;
    }
}

function setCoreStrokeC(msg){
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"));
        parser.updateStyle({"stroke":msg})
        node.setAttribute("style",parser.get());
    }
}


function setCoreStrokeS(msg){
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"));
        parser.updateStyle({"stroke-dasharray":msg})
        node.setAttribute("style",parser.get());
    }
}

function setCoreStrokeW(msg){
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"));

        parser.updateStyle({"stroke-width":msg})
        node.setAttribute("style",parser.get());
    }
}

function unInitStroke() {
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let svg_id=coreList[i];
        let parser=new cssParser();
        let node=document.getElementById(svg_id);
        parser.parseStyle(node.getAttribute("style"));
        parser.updateStyle({"stroke":"rgba(0,0,0,1)"})
        parser.updateStyle({"stroke-dasharray":""})
        parser.updateStyle({"stroke-width":3})
        node.setAttribute("style",parser.get());
    }
}

export function OnStrokeModel(){
    console.log("On stroke!!!")
}
export function OffStrokeModel(){
    console.log("Off stroke!!!")
    unInitStroke();
}

export function SetCoreStrokeColor(msg){
    console.log("SetCoreStrokeColor!!!")
    setCoreStrokeC(msg);
}

export function SetCoreStrokeWidth(msg){
    console.log("SetCoreStrokeWidth!!!")
    setCoreStrokeW(msg);
}
export function SetCoreStrokeStyle(msg){
    console.log("SetCoreStrokeStyle!!!")
    setCoreStrokeS(msg);
}

function Trim(str)
{
    if(str===undefined)return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function getStyleInCore(){
    let coreList=getCoreList();
    let element=document.getElementById(coreList[coreList.length-1]);
    let parser=new cssParser();
    parser.parseStyle(element.getAttribute("style"))
    return parser.get();
}

export function setStyleInCore(style){
    let coreList=getCoreList();
    for(var i=0;i<coreList.length;i++){
        let element=document.getElementById(coreList[i]);
        element.setAttribute("style",style)
    }
}


export function setShadow(){
    let coreList=getCoreList();
    let parser=new cssParser();
    for(let i=0;i<coreList.length;i++){
        let node=document.getElementById(coreList[i]);
        parser.clear();
        parser.parseStyle(node.getAttribute("style"))
        let filter=parser.returnStyle("filter")
        console.log(filter);
        if(filter!==undefined&&Trim(filter)!==""){
            parser.updateStyle({filter: ""})
            node.setAttribute("style",parser.get());
        }else{
            parser.updateStyle({filter: "drop-shadow( 0px 10px 5px rgba(0, 0, 0, .5))"})
            node.setAttribute("style",parser.get());
        }
    }
}

export function setShadowAll(){
    let parser=new cssParser();
    let id=getShapeMapId();
    let node=document.getElementById(id);
    parser.parseStyle(node.getAttribute("style"));
    let filter=parser.returnStyle("filter")
    if(filter!==undefined&&Trim(filter)!==""){
        parser.updateStyle({filter: ""})
        node.setAttribute("style",parser.get());
    }else{
        parser.updateStyle({filter: "drop-shadow( 0px 10px 5px rgba(0, 0, 0, .5))"})
        node.setAttribute("style",parser.get());
    }
}

