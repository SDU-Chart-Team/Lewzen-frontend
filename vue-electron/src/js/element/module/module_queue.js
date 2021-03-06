import {Module_element} from "@/js/element/module/module_element";
import el from "element-ui/src/locale/lang/el";
import {getMySvg} from "@/js/util/getCanvasIdOperation";
import {canvas_update} from "@/js/canvas/base_canvas";
import {pushElementInQueue} from "../core/core_queue";
import {getActionCounter, P} from "../../action/actionQueue";
import {removeLineFromQueue} from "../anchor/arrow_Queue";
import {getBBox} from "../../util/bboxUtil";

class Module_queue {
    constructor() {
        this.moduleQueue=[];
    }
    createModule(msg,flag){
        msg['is_line']=false;
        let module=new Module_element(msg,flag);
        this.moduleQueue.push(module);
    }

    createLine(msg,flag){
        msg['is_line']=true;
        let line=new Module_element(msg,flag);
        this.moduleQueue.push(line)
    }


    getModuleByGid(g_id){
        var length=this.moduleQueue.length;
        for(var i=0;i<length;i++){
            let element=this.moduleQueue[i];
            if(g_id===element.g_id)
                return element;
        }
    }

    getModuleBySid(svg_id){
        var length=this.moduleQueue.length;
        for(var i=0;i<length;i++){
            let element=this.moduleQueue[i];
            if(svg_id===element.svg_id)
                return element;
        }
    }
    getGInPosition(g_id){
        var length=this.moduleQueue.length;
        let bbox;
        for(var i=0;i<length;i++){
            let element=this.moduleQueue[i];
            if(g_id===element.g_id){
                let g_id=element.g_id;
                bbox=getBBox(g_id)
                // bbox=document.getElementById(g_id).getBBox();
                break;
            }
        }
        let elementList=[];
        for(var i=0;i<length;i++){
            let element=this.moduleQueue[i];
            if(g_id===element.g_id){
                continue;
            }
            let g_id=element.g_id;
            let new_box=getBBox(g_id);
            // let new_box=document.getElementById(g_id).getBBox();
            if(this.getIn(new_box,bbox)){
                elementList.push(element.g_id);
            }
        }
        return elementList;
    }
    getIn(bbox_0,bbox_1){
        let x1=bbox_1.x;
        let y1=bbox_1.y;
        let width1=bbox_1.width;
        let height1=bbox_1.height;
        return this.pointInRect(bbox_0,x1,y1)|
            this.pointInRect(bbox_0,x1,y1+height1)|
            this.pointInRect(bbox_0,x1+width1,y1)|
            this.pointInRect(bbox_0,x1+width1,y1+height1)
    }
    pointInRect(bbox_0,x,y){
        let x0=bbox_0.x;
        let y0=bbox_0.y;
        let width0=bbox_0.width;
        let height0=bbox_0.height;
        if(x<x0||x>x0+width0)return false;
        if(y<y0||y>y0+height0)return false;
        return true;
    }
    
    getModuleInRect(bbox){
        let list=[];
        for(var i=0;i<this.moduleQueue.length;i++){
            let g_id=this.moduleQueue[i].g_id;
            // if(this.moduleQueue[i].isCore){
            //     continue;
            // }
            let node=document.getElementById(g_id);
            let bbox_0=getBBox(g_id)
            // let bbox_0=node.getBBox();
            if(this.rectInRect(bbox,bbox_0)){
                list.push(g_id);
            }
        }
        return list;
    }

    rectInRect(bbox,bbox_0){
        let points=[];
        points.push({x:bbox_0.x,y:bbox_0.y})
        points.push({x:bbox_0.x,y:bbox_0.y+bbox_0.height})
        points.push({x:bbox_0.x+bbox_0.width,y:bbox_0.y+bbox_0.height})
        points.push({x:bbox_0.x+bbox_0.width,y:bbox_0.y})
        for(var i=0;i<points.length;i++){
            // console.log(points[i])
            if(!this.pointInRect(bbox,points[i].x,points[i].y)){
                return false;
            }
        }
        return true;
    }

    removeElementByGid(g_id){
        for(let i=0;i<this.moduleQueue.length;i++){
            if(this.moduleQueue[i].g_id===g_id){
                if(this.moduleQueue[i].isLine){
                    removeLineFromQueue(this.moduleQueue[i].g_id);
                }
                this.moduleQueue.splice(i,1);
                return;
            }
        }
    }
    getListInFill(x,y){
        let point=document.getElementById(getMySvg()).createSVGPoint();
        point.x=x;
        point.y=y;
        let list=[]
        let flag=false;
        for(var i=0;i<this.moduleQueue.length;i++){
            // console.log(this.moduleQueue[i])
            if(this.moduleQueue[i].isLine)continue;
            let g_id=this.moduleQueue[i].g_id;
            let node=document.getElementById(g_id);
            if(node===undefined)continue;
            let children=node.childNodes;

            // let flag=false;
            for(let j=0;j<children.length;j++) {
                let element = children[j];
                // console.log(element);
                if(element===undefined)continue;
                if(element.isPointInFill===undefined)continue;
                if(element.isPointInStroke===undefined)continue;
                if (element.isPointInFill(point)||element.isPointInStroke(point)) {
                    flag = true;
                }
            }
            list.push(this.moduleQueue[i].g_id);
            // console.log(flag)
            if(flag){
                canvas_update("connect",g_id,{type:"create"})
                break;
            }else{
                canvas_update("connect",g_id,{type:"delete"})
            }
        }
        // console.log(list)
        // return list;
    }
    selectAll(){
        let list=[];
        for(let i=0;i<this.moduleQueue.length;i++){
            list.push(this.moduleQueue[i].g_id);
        }
        // console.log(list);
        pushElementInQueue(list);
    }

    deleteAll(){
        selectAll();
        let time= getActionCounter();
        P("remove",{time:time})
        P("discard",{time:time});
        this.moduleQueue=[];
    }

    getAllModules(){
        let list=[];
        for(let i=0;i<this.moduleQueue.length;i++){
            list.push(this.moduleQueue[i].g_id);
        }
        return list;
    }
}
export function getAllModules(){
    return moduleQueue.getAllModules();
}
export function deleteAllModules(){
    moduleQueue.deleteAll();
}

let moduleQueue=new Module_queue();

export function createModule(msg,flag=true) {
    moduleQueue.createModule(msg,flag);
}

export function getModuleByGid(g_id){
    return moduleQueue.getModuleByGid(g_id);
}

export function getModuleBySid(svg_id){
    return moduleQueue.getModuleBySid(svg_id);
}

export function getGInPosition(g_id){
    return moduleQueue.getGInPosition(g_id);
}

export function getModuleInRect(bbox){
    return moduleQueue.getModuleInRect(bbox);
}

export function removeElementByGid(g_id){
    return moduleQueue.removeElementByGid(g_id);
}


export function createLine(msg,flag=true){
    return moduleQueue.createLine(msg,flag);
}

export function getListInFill(x,y){
    moduleQueue.getListInFill(x,y);
}

export function selectAll(){
    moduleQueue.selectAll();
}