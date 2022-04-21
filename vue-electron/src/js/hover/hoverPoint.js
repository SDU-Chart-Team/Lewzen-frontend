import {DomOperator} from "@/js/dom/domOperation";
import {createElementByTag} from "@/js/element/createElement";
import {addLine} from "@/js/element/anchorCanvas";

let style_core="fill:#29B6F2"
export class HoverPoint {
    constructor(g_id,svg_id,hover_id,x,y) {
        this.x=x;
        this.y=y;
        this.svg_id=svg_id;
        this.hover_id=hover_id;
        this.g_id=g_id;
        this.dom=this.setPoint();
    }

    setPoint(){
        let domOperator=new DomOperator();
        let node=createElementByTag("circle",this.hover_id);
        let x=this.x;let y=this.y;
        domOperator.setAttrByDom(node,{
            cx:x,cy:y,r:5,style:style_core
        })
        // this.setMouseDown(node);
        return node;
    }
    setHoverMouseDown(){
        let hover_id=this.hover_id;
        let node=document.getElementById(hover_id);
        var that=this;
        let domOperator=new DomOperator();
        node.onmouseenter=function (e) {
            // console.log(hover_id)

            domOperator.setAttrByDom(node,{r:10,style:'fill:#BCFFBC;opacity:0.8'})
        }
        node.onmouseleave=function () {

            domOperator.setAttrByDom(node,{r:5,style:'fill:#29B6F2'})
            node.style.display="none";
        }
        node.onmousedown=function (e) {
            let attrs = domOperator.getAttrById(hover_id, ['cx', 'cy'])
            // console.log(attrs);
            let hover_line = hover_id + "_l";
            console.log(111);
            // let line = createElementByTag("line", hover_line);
            // let style = "stroke:black;stroke-width:1"
            // domOperator.setAttrByDom(line, {x1: attrs['cx'], y1: attrs['cy'], x2: 0, y2: 0, style: style})
            // domOperator.appendChildById(element.g_id, line);
            // node.onmousemove = function (e) {
            //     let x2 = e.offsetX;
            //     let y2 = e.offsetY;
            //     domOperator.setAttrByDom(line, {x2: x2, y2: y2});
            // }
            // node.onmouseup = function (e) {
            //     node.onmousemove=null;
            //     node.onmouseup=null;
            // }
            // addLine(that.g_id,hover_id);
        }
    }
}