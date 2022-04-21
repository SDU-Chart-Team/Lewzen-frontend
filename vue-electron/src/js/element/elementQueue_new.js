import {Element_SVG} from "@/js/element/element_new";
import {CoreQueue} from "@/js/coreQueue/coreQueue";
import {elementMove, elementScale, getCore, setCore} from "@/js/svg";
import {pushQueue} from "@/js/actionQueue";
import {create_Scale_Action, El_scale_action, scale_el} from "@/js/action/el_scale_action";
import {addAction} from "@/js/action/actionQueue";
import {move_el, El_move_action, create_Move_Action} from "@/js/action/el_move_action";
import el from "element-ui/src/locale/lang/el";
import {El_delete_action, setVisible} from "@/js/action/el_delete_action";
import {El_create_action} from "@/js/action/el_create_action";
import {DomOperator} from "@/js/dom/domOperation";
import {removeResizeListener} from "element-ui/src/utils/resize-event";
import {createElementByTag} from "@/js/element/createElement";
import {addLine} from "@/js/element/anchorCanvas";
import {create_core_Before} from "@/js/action/el_core_action";

export class ElementQueue {
    //初始化
    constructor() {
        this.counter=0;
        this.ElementQueue = []
        this.coreQueue=new CoreQueue();
        this.inElement=false;
        this.canvas=document.getElementById("mySvg");
    }
    //添加组件
    appendElement(msg){
        /*
        暴露给socket接口，msg为前端传回的参数
        步骤：创建组件，推进队列，为组件设置核心态。
         */
        let element=new Element_SVG(msg);
        this.ElementQueue.push(element);
        // this.setElementMouseDown(element);
        create_core_Before(msg["g_id"])
    }


    setCore(msg) {
        // console.log(111);
        let svg_id=msg['svg_id'];
        this.coreQueue.append(svg_id);
        let cores = this.coreQueue.getCoreElement();
        console.log(cores);
        for(var i=0;i<this.ElementQueue.length;i++){
            let id=this.ElementQueue[i].svg_id;
            // console.log(id);
            if(cores[id]===1&&this.ElementQueue[i].isCore===false) {
                this.ElementQueue[i].InCoreModel(msg);
                // console.log(1111);
            }
            else if(cores[id]===0&&this.ElementQueue[i].isCore===true)
                this.ElementQueue[i].OffCoreModel();
        }
        // setRightBar();
    }

    getCore(svg_id){
        for(var i=0;i<this.ElementQueue.length;i++){
            if(this.ElementQueue[i].svg_id!==svg_id)continue;
            return this.ElementQueue[i].isCore === true;
        }
    }


    OffCoreAll(){
        this.coreQueue.clear();
        if(this.coreQueue.isCtrl)return;
        for(var i=0;i<this.ElementQueue.length;i++){
            this.ElementQueue[i].OffCoreModel();
        }
    }


    //删去所有在core状态的组件
    deleteInCore(){
        // console.log(111);
        let elements=[];
        for(var i=0;i<this.ElementQueue.length;i++){
            if(this.ElementQueue[i].isCore){
                elements.push({svg_id:this.ElementQueue[i].svg_id,g_id:this.ElementQueue[i].g_id})
                this.ElementQueue[i].OffCoreModel();
            }
        }
        let action=new El_delete_action("delete",elements,false)
        addAction(action);
        // console.log(elements);
        setVisible(elements,false);
    }

    offCoreById(svg_id){
        console.log(svg_id);
        for(var i=0;i<this.ElementQueue.length;i++){
            if(svg_id===this.ElementQueue[i].svg_id){
                // console.log(111);
                this.ElementQueue[i].OffCoreModel();
            }
        }
    }
}

let elementQueue=new ElementQueue();
export function appendElement(msg){
    // elementQueue.appendElement(shape_id);
    elementQueue.appendElement(msg);
}


//设置InElement
export function OnInElement(){
    elementQueue.inElement=true;
}

export function OffInElement(){
    elementQueue.inElement=false;
}

export function offCoreAll(){
    if(!elementQueue.inElement) elementQueue.OffCoreAll();
    else elementQueue.inElement=false;
}
export function getCoreById(svg_id) {
    return elementQueue.getCore(svg_id)
}
export function deleteInCore(){
    elementQueue.deleteInCore();
}
export function getDomBySvgId(svg_id){
    return elementQueue.getDomBySvgId(svg_id);
}

export function offCoreById(svg_id){
    elementQueue.offCoreById(svg_id);
}

export function setCoreModel(msg){
    // console.log(111);
    elementQueue.setCore(msg);
}