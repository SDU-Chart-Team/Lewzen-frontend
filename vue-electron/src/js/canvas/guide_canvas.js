import {DomOperator} from "@/js/util/domOperation";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getGuideBySvgId, getPositionAfterGuide} from "@/js/element/guide/guide_queue";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
let counter=0;
export class Guide_canvas {
    constructor() {
        this.isOpen=false;
        this.guideXList=[];
        this.guideYList=[];
    }

    getState(){
        return this.isOpen;
    }
    setState(isOpen){
        this.isOpen=isOpen;
    }

    getGuide(g_id) {
        this.deleteGuide();
        if(!this.isOpen)return;
        let position=getGuideBySvgId(g_id);
        console.log(position)
        let X=position['X'];
        let Y=position['Y'];
        let domOperator=new DomOperator();
        let canvas=getMySvg();
        // let canvas=getShapeMapId();
        for(var i=0;i<X.length;i++){
            let line_id="guide_line"+(++counter);
            let line=createElementByTag('line',line_id);
            let style_normal="stroke:blue;stroke-width:1"
            let attrs_need=['height','width']
            let attrs=domOperator.getAttrById(canvas,attrs_need);
            console.log(attrs)
            domOperator.setAttrByDom(line,{x1:X[i],x2:X[i],y1:0,y2:attrs['height'],style:style_normal})
            domOperator.appendChildById(canvas,line);
            this.guideXList.push(line_id);
        }
        for(var i=0;i<Y.length;i++){
            let line_id="guide_line"+(++counter);
            let line=createElementByTag('line',line_id);
            let style_normal="stroke:orange;stroke-width:1"
            let attrs_need=['height','width']
            let attrs=domOperator.getAttrById(canvas,attrs_need);
            domOperator.setAttrByDom(line,{x1:0,x2:attrs['width'],y1:Y[i],y2:Y[i],style:style_normal})
            domOperator.appendChildById(canvas,line);
            this.guideXList.push(line_id);
        }
    }

    deleteGuide(){
        let canvas=getMySvg();
        let domOperator=new DomOperator();
        for(var i=0;i<this.guideXList.length;i++){
            domOperator.removeChildById(canvas,this.guideXList[i]);
        }
        for(var i=0;i<this.guideYList.length;i++){
            domOperator.removeChildById(canvas,this.guideYList[i]);
        }
        this.guideXList=[];
        this.guideYList=[];
    }

    adjust(g_id){
        this.getGuide(g_id);
    }
    delete(){
        this.deleteGuide();
    }

    updatePosition(msg){
        let trans={x:0,y:0};
        trans=getPositionAfterGuide(msg);
        return trans;
    }
}