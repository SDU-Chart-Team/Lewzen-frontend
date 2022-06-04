import {DomOperator} from "@/js/util/domOperation";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getCanvasState} from "@/js/canvas/base_canvas";
import {getXGrade} from "@/svgParser/hoverProcessor";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {
    getNumberX,
    getNumberY,
    getPositionAfterXGuideInGrid, getPositionAfterYGuideInGrid,
    getXGuide,
    getYGuide
} from "@/js/element/guide/guide_queue";
import {getMySvg} from "@/js/util/getCanvasIdOperation";
import {cssParser} from "@/js/util/cssParser";
import {get_canvas_scale, setSvgScaleNum, updateMapWithoutGrid} from "@/js/util/canvas_operation";
import {getBBox} from "../util/bboxUtil";

export class Grid_canvas {
    constructor() {
        this.grid=[]
        this.grid_size=20;
        this.isOpen=false;
    }

    getState(){
        return this.isOpen;
    }
    setState(isOpen){
        if(isOpen&&!this.isOpen){
            this.createGrid(this.grid_size);
        }else if(!isOpen&&this.isOpen){
            this.deleteGrid();
        }
        this.isOpen=isOpen;
    }

    createGrid(x,width=-1,height=-1){
        let root=createElementByTag("svg","root");
        let svg=createElementByTag("svg",'svg');
        svg.setAttribute("xmlns","http://www.w3.org/2000/svg")
        let domOperator=new DomOperator();
        let attrs_need=['height','width']
        let svg_id=getMySvg();
        // let attrs=domOperator.getAttrById(svg_id,attrs_need);
        // console.log(attrs);
        let attrs=get_canvas_height_and_width();
        let scale=get_canvas_scale();

        if(width!==-1&&height!==-1){
            attrs['height']=height;
            attrs['width']=width;
        }
        this.grid_size=scale*20;
        x=this.grid_size;
        let heightNum=attrs['height']/x;
        let widthNum=attrs['width']/x;
        let style="stroke:rgb(220,220,220);stroke-width:1"
        let style_normal="stroke:rgb(246,246,246);stroke-width:1"

        for(var i=1;i<=heightNum;i++){
            let lineId='line_y_'+i;
            let node=createElementByTag("line");
            let nodeAttrs={
                x1:0,
                y1:i*x,
                x2:attrs['width'],
                y2:i*x,
                id:lineId,
                style:i%4===0?style:style_normal
            }
            domOperator.setAttrByDom(node,nodeAttrs);
            this.grid.push(lineId);
            svg.append(node);
        }
        for(var i=1;i<=widthNum;i++){
            let lineId='line_x_'+i;
            let node=createElementByTag("line");
            let nodeAttrs={
                x1:i*x,
                y1:0,
                x2:i*x,
                y2:attrs['height'],
                id:lineId,
                style:i%4===0?style:style_normal
            }
            domOperator.setAttrByDom(node,nodeAttrs);
            this.grid.push(lineId);
            svg.append(node);
        }
        root.append(svg);
        var string =root.innerHTML;
        let canvas=getMySvg();
        scale="transform:scale("+scale+","+scale+");"
        document.getElementById(canvas).setAttribute("style",scale+"background-image:url('data:image/svg+xml,"+string+"');");
        // document.getElementById(canvas).setAttribute("style",parser.get());
    }


    deleteGrid(style=""){
        let domOperator=new DomOperator();
        let attrs_need=['height','width']
        let canvas=getMySvg();

        let attrs=domOperator.getAttrById(canvas,attrs_need);
        this.grid=[]
        let scale=get_canvas_scale();
        scale="transform:scale("+scale+","+scale+");"
        document.getElementById(getMySvg()).setAttribute("style",scale)
    }
    adjust(msg){
        if(!this.isOpen){
            let scale=get_canvas_scale();
            scale="transform:scale("+scale+","+scale+");"
            document.getElementById(getMySvg()).setAttribute("style",scale)
            return;
        }
        this.deleteGrid(msg['style']);
        this.createGrid(this.grid_size);
    }

    updateWithoutGuide(msg){
        let trans={x:0,y:0}
        let x=msg['start_x'];
        let y=msg['start_y'];
        let end_x=x+msg['all_move_x'];
        let end_y=y+msg['all_move_y'];

        let width=end_x%this.grid_size;
        let height=end_y%this.grid_size;
        if(height<this.grid_size-height){
            height=-height;
        }else{
            height=this.grid_size-height;
        }
        if(width<this.grid_size-width){
            width=-width;
        }else{
            width=this.grid_size-width;
        }
        // console.log(end_x,end_y)
        trans['x']=width;
        trans['y']=height;

        end_x=end_x+trans['x'];
        end_y=end_y+trans['y'];

        // let element=getModuleByGid(msg['g_id'])
        // let node=document.getElementById(element.svg_id);
        // let now_x=parseInt(node.getAttribute("x"));
        // let now_y=parseInt(node.getAttribute("y"));
        let element=document.getElementById(msg['g_id'])
        // let children=element.getElementsByTagName("foreignObject")
        // console.log(children)
        // let bbox=element.getBBox();
        let bbox=getBBox(msg['g_id'])
        console.log(bbox);
        let now_x=bbox.x;
        let now_y=bbox.y;
        console.log(end_x,end_y)
        console.log(now_x,now_y)
        console.log(msg['move_x'],msg['move_y'])
        trans['x']=end_x-(now_x+msg['move_x'])
        trans['y']=end_y-(now_y+msg['move_y'])
        // console.log(end_x,end_y);
        // console.log(now_x,now_y)
        // console.log(trans)

        // trans['x']=end_x;
        // trans['x']=end_y;
        return trans;
    }

    updatePWithoutGuide(msg){
        let trans={x:0,y:0}
        let x=msg['start_x'];
        let y=msg['start_y'];
        let end_x=x+msg['all_move_x'];
        let end_y=y+msg['all_move_y'];

        let width=end_x%this.grid_size;
        let height=end_y%this.grid_size;
        if(height<this.grid_size-height){
            height=-height;
        }else{
            height=this.grid_size-height;
        }
        if(width<this.grid_size-width){
            width=-width;
        }else{
            width=this.grid_size-width;
        }
        // console.log(end_x,end_y)
        trans['x']=width;
        trans['y']=height;

        end_x=end_x+trans['x'];
        end_y=end_y+trans['y'];

        // let element=getModuleByGid(msg['g_id'])
        // let node=document.getElementById(element.svg_id);
        // let now_x=parseInt(node.getAttribute("x"));
        // let now_y=parseInt(node.getAttribute("y"));
        // let element=document.getElementById(msg['g_id'])
        // let bbox=element.getBBox();
        // let node=document.getElementById(msg['g_id']+"_"+msg['a_id'])
        let now_x=msg['now_x'];
        let now_y=msg['now_y'];
        // console.log(end_x,end_y);
        // console.log(msg['move_x'],msg['move_y'])
        // console.log(now_x,now_y);
        trans['x']=end_x-(now_x+msg['move_x'])
        trans['y']=end_y-(now_y+msg['move_y'])
        // console.log(end_x,end_y);
        // console.log(now_x,now_y)
        // console.log(trans)

        // trans['x']=end_x;
        // trans['x']=end_y;
        return trans;
    }

    updateWithGuide(msg) {
        let trans = this.updateWithoutGuide(msg);
        let x = msg['start_x'];
        let y = msg['start_y'];
        let end_x = x + msg['all_move_x'];
        let end_y = y + msg['all_move_y'];
        let element=document.getElementById(msg['g_id'])
        let bbox=getBBox(msg['g_id'])
        // let bbox=element.getBBox();
        let now_x=bbox.x;
        let now_y=bbox.y;

        let xGuide=getXGuide(msg['g_id'])
        let yGuide=getYGuide(msg['g_id'])

        for(var i=0;i<xGuide.length;i++){
            xGuide[i]+=end_x-now_x;
            yGuide[i]+=end_y-now_y;
        }
        var min_x=100000;
        var min_y=100000;
        var x_index=-1;
        var y_index=-1;

        for(var k=0;k<xGuide.length;k++){
            let start_x=xGuide[k]-xGuide[k]%this.grid_size;
            let end_x=start_x+this.grid_size;

            let array_x=[];
            array_x=getPositionAfterXGuideInGrid(start_x,end_x);
            // console.log(array_x);
            if(k===0){
                array_x.push(end_x);
                array_x.push(start_x);
            }
            for(var i=0;i<array_x.length;i++){
                if(min_x>abs(xGuide[k]-array_x[i])){
                    min_x=abs(xGuide[k]-array_x[i]);
                    x_index=array_x[i]-xGuide[k]+xGuide[0];
                }
            }
        }
        for(var k=0;k<yGuide.length;k++){
            let start_y=yGuide[k]-yGuide[k]%this.grid_size;
            let end_y=start_y+this.grid_size;

            let array_y=[];
            array_y=getPositionAfterYGuideInGrid(start_y,end_y);
            if(k===0){
                array_y.push(end_y);
                array_y.push(start_y);
            }
            for(var i=0;i<array_y.length;i++){
                if(min_y>abs(yGuide[k]-array_y[i])){
                    min_y=abs(yGuide[k]-array_y[i]);
                    y_index=array_y[i]-yGuide[k]+yGuide[0];
                }
            }
        }
        trans['x']=x_index-now_x-msg["move_x"];
        trans['y']=y_index-now_y-msg["move_y"];
        return trans;
    }

    updatePWithGuide(msg){
        let trans = this.updateWithoutGuide(msg);
        let x = msg['start_x'];
        let y = msg['start_y'];
        let end_x = x + msg['all_move_x'];
        let end_y = y + msg['all_move_y'];
        let element=document.getElementById(msg['g_id'])
        let bbox=getBBox(msg['g_id'])
        // let bbox=element.getBBox();
        let now_x=msg['now_x'];
        let now_y=msg['now_y'];

        let xGuide=[now_x]
        let yGuide=[now_y]

        for(var i=0;i<xGuide.length;i++){
            xGuide[i]+=end_x-now_x;
            yGuide[i]+=end_y-now_y;
        }
        var min_x=100000;
        var min_y=100000;
        var x_index=-1;
        var y_index=-1;

        for(var k=0;k<xGuide.length;k++){
            let start_x=xGuide[k]-xGuide[k]%this.grid_size;
            let end_x=start_x+this.grid_size;

            let array_x=[];
            array_x=getPositionAfterXGuideInGrid(start_x,end_x);
            // console.log(array_x);
            if(k===0){
                array_x.push(end_x);
                array_x.push(start_x);
            }
            for(var i=0;i<array_x.length;i++){
                if(min_x>abs(xGuide[k]-array_x[i])){
                    min_x=abs(xGuide[k]-array_x[i]);
                    x_index=array_x[i]-xGuide[k]+xGuide[0];
                }
            }
        }
        for(var k=0;k<yGuide.length;k++){
            let start_y=yGuide[k]-yGuide[k]%this.grid_size;
            let end_y=start_y+this.grid_size;

            let array_y=[];
            array_y=getPositionAfterYGuideInGrid(start_y,end_y);
            if(k===0){
                array_y.push(end_y);
                array_y.push(start_y);
            }
            for(var i=0;i<array_y.length;i++){
                if(min_y>abs(yGuide[k]-array_y[i])){
                    min_y=abs(yGuide[k]-array_y[i]);
                    y_index=array_y[i]-yGuide[k]+yGuide[0];
                }
            }
        }
        trans['x']=x_index-now_x-msg["move_x"];
        trans['y']=y_index-now_y-msg["move_y"];
        return trans;
    }

    updatePosition(msg){
        // console.log(msg);
        if(!getCanvasState("guide")){
            return this.updateWithoutGuide(msg);
        }else{
            // console.log(111);
            return this.updateWithGuide(msg);
        }
    }

    updatePPosition(msg){
        let g_id=msg['g_id'];
        let module=getModuleByGid(g_id);
        console.log(msg);
        if(module.isLine){
            return {x:0,y:0};
        }
        if(getCanvasState("guide")){
            return this.updatePWithGuide(msg);
        }else{
            return this.updatePWithoutGuide(msg);
        }
    }
}

function abs(x) {
    return x>0?x:-x;
}

