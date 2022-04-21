import {DomOperator} from "@/js/dom/domOperation";
import {createElementByTag} from "@/js/element/createElement";

class AnchorCanvas {
    constructor() {
        this.AnchorList=[];
    }
    append(){

    }
}

let anchorCanvas=new AnchorCanvas();

export function addLine(g_id,hover_id){
    console.log(1);
    let svg=document.getElementById("mySvg");
    let hover_line = hover_id + "_l";
    let line = createElementByTag("line", hover_line);
    let domOperator=new DomOperator();
    let style = "stroke:black;stroke-width:1"
    let attrs = domOperator.getAttrById(hover_id, ['cx', 'cy'])
    domOperator.setAttrByDom(line, {x1: attrs['cx'], y1: attrs['cy'], x2: 0, y2: 0, style: style})
    domOperator.appendChildById(g_id, line);
    svg.onmousemove=function (e) {
        let x2 = e.offsetX;
        let y2 = e.offsetY;
        domOperator.setAttrByDom(line, {x2: x2, y2: y2});
    }
    svg.onmouseup=function (e) {
        svg.onmousemove=null;
        svg.onmousedown=null;
    }
}