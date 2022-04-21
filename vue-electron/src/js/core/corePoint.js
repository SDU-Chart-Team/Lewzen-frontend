import {createElementByTag} from "@/js/element/createElement";
import {DomOperator} from "@/js/dom/domOperation";
import {pushQueue} from "@/js/actionQueue";
import {elementScale} from "@/js/svg";
import {create_Scale_Action, El_scale_action} from "@/js/action/el_scale_action";


let style_core="fill:#29B6F2"
export class CorePoint {
    constructor(g_id,svg_id,core_num,core_id,x,y) {
        this.x=x;
        this.y=y;
        this.svg_id=svg_id;
        this.core_num=core_num;//core点的标识符
        this.core_id=core_id;
        this.g_id=g_id;
        this.dom=this.setPoint();
    }

    setPoint(){
        let domOperator=new DomOperator();
        let node=createElementByTag("circle",this.core_id);
        let x=this.x;let y=this.y;
        domOperator.setAttrByDom(node,{
            cx:x,cy:y,r:5,style:style_core
        })
        // this.setMouseDown(node);
        return node;
    }

    setCoreMouseDown(){
        let core_id=this.core_id;
        let node=document.getElementById(core_id);
        // console.log(core_id);
        var that=this;
        node.onmousedown=function (e) {
            let startX=e.offsetX;
            let startY=e.offsetY;
            let nowX=e.offsetX;
            let nowY=e.offsetY;
            document.onmousemove=function (e) {
                // console.log(core.svg_id);
                let newX=e.offsetX;
                let newY=e.offsetY;
                let transX=newX-nowX;
                let transY=newY-nowY;
                nowX=newX;
                nowY=newY;
                create_Scale_Action(that.core_num,that.g_id,transX,transY)
            }
            document.onmouseup=function (e) {
                let endX=e.offsetX;
                let endY=e.offsetY;
                let transX=endX-startX;
                let transY=endY-startY;
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
    }
}