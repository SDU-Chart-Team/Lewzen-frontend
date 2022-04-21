import {offCoreAll} from "@/js/element/elementQueue_new";
import {getCanvasShape} from "@/js/canvasAction/canvasAction";
import {DomOperator} from "@/js/dom/domOperation";

export class Base_canvas {
    constructor() {
        this.init();
        this.heightNum=1;
        this.widthNum=1;
        this.scaleNum=1.0;
        this.baseWidth=210*4;
        this.baseHeight=297*4;
    }
    init(){
        let svg=document.getElementById("mySvg");
        let domOperator=new DomOperator();
        svg.onclick=function () {
            offCoreAll();
        }
    }
    AfterMove(left_top_x,left_top_y){
        return {width:0,height:0};
    }
    unInit(){

    }
    adjustCanvas(width,height,scale){
        // console.log(1);
        let canvas=document.getElementById("myCanvas");
        scale=scale*1.0/100;
        console.log(width,height);
        canvas.style.paddingTop=(scale-1)*height/2+100+'px';
        canvas.style.paddingLeft=(scale-1)*width/2+100+'px';
        console.log(canvas.style.paddingLeft);
        console.log(canvas.style.paddingTop);
        if(height*scale+200>1600)
            height=height*scale+200;
        else
            height=1600
        if(width*scale+200>2000)
            width=width*scale+200
        else
            width=2000
        canvas.style.height=height+'px';
        canvas.style.width=width+'px';
    }
    scaleCanvas(x){
        let svg=document.getElementById("mySvg");
        let canvas=document.getElementById("myCanvas");
        x=x*1.0/100;
        svg.style.transform="scale("+x+","+x+")";
    }
    extendCanvas(state){
        let attrs=getCanvasShape();
        let height=attrs['height'];
        let width=attrs['width'];
        if(state['right']){
            width+=this.baseWidth;
            this.widthNum+=1;
        }
        if(state['top']){
            height+=this.baseHeight;
            this.heightNum+=1;
        }
        let svg=document.getElementById("mySvg")
        console.log(width)
        svg.style.width=width+'px';
        svg.style.height=height+'px';
        this.adjustCanvas(width,height,this.scaleNum);
    }
}