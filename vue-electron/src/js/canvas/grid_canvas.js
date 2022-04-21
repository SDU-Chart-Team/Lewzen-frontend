import {createElementByTag} from "@/js/element/createElement";
import {Base_canvas} from "@/js/canvas/base_canvas";
import {DomOperator} from "@/js/dom/domOperation";

export class Grid_canvas extends Base_canvas{
    constructor(grid_size) {
        super();
        this.grid=[]
        this.grid_size=grid_size;
        this.svgId="mySvg";
        this.createGrid(this.grid_size);
    }

    unInit() {
        this.deleteGrid();
    }

    createGrid(x,width=-1,height=-1){
        let domOperator=new DomOperator();
        let svg=document.getElementById(this.svgId);
        // let img=createElementByTag("svg","img");
        let attrs_need=['height','width']
        let attrs=domOperator.getAttrById(this.svgId,attrs_need);
        // console.log(attrs);
        if(width!==-1&&height!==-1){
            attrs['height']=height;
            attrs['width']=width;
        }
        // console.log(attrs)
        let heightNum=attrs['height']/x;
        let widthNum=attrs['width']/x;
        console.log(heightNum,widthNum);
        let style="stroke:#DCDCDC;stroke-width:1"
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
            domOperator.appendChildByDom(svg,node);
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
            // console.log(node);
            domOperator.appendChildByDom(svg,node);
            // svg.append(node);
        }
        // var html = '<svg xmlns="http://www.w3.org/2000/svg" id="source">'
        //       +img.innerHTML;
        //         +'</svg>';
        // // var html =img.innerHTML;
        // let image="url:\"("+'data:image/svg+xml;base64,' + window.btoa(html)+")";
        // console.log(image);
        // document.getElementById("mySvg").style.backgroundImage=image;
        // var string=img
        // console.log(img);
    }

    deleteGrid(){
        let domOperator=new DomOperator();
        // let svg=document.getElementById(this.svgId);
        let attrs_need=['height','width']
        let attrs=domOperator.getAttrById(this.svgId,attrs_need);

        // console.log(svg.getAttribute("height"));
        // console.log(svg.getAttribute('width'));
        // let height=svg.getAttribute("height");
        // let width=svg.getAttribute("width");
        for(var i=0;i<this.grid.length;i++){
            domOperator.removeChildById(this.svgId,this.grid[i]);
            // let node=document.getElementById(this.grid[i]);
            // svg.removeChild(node);
        }
        this.grid=[]
    }

    getElementMove(left_top_x,left_top_y){
        let width=left_top_x%this.grid_size;
        let height=left_top_y%this.grid_size;
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
        return {width:width,height:height}
    }

    AfterMove(left_top_x, left_top_y) {
        return this.getElementMove(left_top_x,left_top_y);
    }
    adjustCanvas(width,height,scale){
        super.adjustCanvas(width,height,scale);
        this.deleteGrid();
        this.createGrid(this.grid_size,width,height);

    }
}
