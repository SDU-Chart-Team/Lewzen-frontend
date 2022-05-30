import {Core_element} from "@/js/element/core/core_element";
import {DomOperator} from "@/js/util/domOperation";
import {getModuleByGid, getModuleBySid} from "@/js/element/module/module_queue";
import {off} from "element-ui/src/utils/dom";
import {P} from "@/js/action/actionQueue";
import {getHoverMapId} from "@/js/util/getCanvasIdOperation";
import {clear_arrow_point} from "@/js/element/anchor/arrow_operation";

class Core_queue {
    constructor() {
        this.coreQueue=[];//保存core的集合
        this.coreMap={};//保存core的对象
        this.ctrlOn=false;
    }
    //进入ctrl模式
    updateCtrlOnTrue(){
        this.ctrlOn=true;
    }
    updateCtrlOnFalse(){
        this.ctrlOn=false;
    }

    //向队列中添加元素和删除元素

    pushElementInQueue(list){
        if(!this.ctrlOn){
            let length=this.coreQueue.length;
            for(var i=0;i<length;i++){
                let core=this.coreQueue[i];
                let element=getModuleByGid(core);
                element.setCoreOff();
            }
            this.coreQueue=[];
        }
        for(let i=0;i<list.length;i++){
            this.coreQueue.push(list[i]);
            let element=getModuleByGid(list[i]);
            element.setCore();
        }

        // console.log(this.coreQueue);
        this.updateCoreMap();
    }

    deleteElementInQueue(g_id,flag=false){
        if(!flag){
            if(!this.ctrlOn)return;
        }
        for(var i=0;i<this.coreQueue.length;i++){
            if(this.coreQueue[i]===g_id){
                this.coreQueue.splice(i,1);
                let element=getModuleByGid(g_id);
                element.setCoreOff();
            }
        }
        this.updateCoreMap();
    }

    getCoreList(){
        let list=[];
        for(var i=0;i<this.coreQueue.length;i++){
            list.push(this.coreQueue[i]);
        }
        return list;
    }



    //更新画布，关键点改变时或者画布上组件改变时均要通过该函数进行调用
    updateCoreMap(){

        if(this.coreQueue.length===0){
            P("uncursor",{})
        }else{
            P("cursors",{ids:this.coreQueue});
        }
    }


    setCoreMap(points){
        // console.log(points);
        let group=this.getCoreGroup(points);
        // console.log(group)
        //更新
        for(let key in group){
            if(this.coreMap[key]===undefined){
                let core=new Core_element(group[key]);
                this.coreMap[key]=core;
            }else{
                this.coreMap[key].update(group[key]);
            }
        }


        //删除
        for(let key in this.coreMap) {
            if (group[key] === undefined) {
                if(this.coreMap[key]===undefined)continue;
                let element=getModuleByGid(key);
                if(element!==undefined) {
                    element.setCoreOff();
                }
                this.coreMap[key].delete();
                this.coreMap[key] = undefined;

            }
        }
        this.coreQueue=[];
        for(let key in group){
            this.coreQueue.push(key);
        }
        if(this.coreQueue.length===0) {
            color_change_bar(
                {
                    delete: false,
                    top: false,
                    bottom: false,
                    fill: false,
                    line: false,
                    shadow: false,
                }
            )
        }else{
            color_change_bar(
                {
                    delete: true,
                    top: true,
                    bottom: true,
                    fill: true,
                    line: true,
                    shadow: true,
                }
            )
        }
    }


    getCoreGroup(points){
        let group={}
        if(points===undefined){
            return group;
        }
        for(let i=0;i<points.length;i++){
            if(group[points[i].comp_id]===undefined){
                group[points[i].comp_id]=[];
            }
            group[points[i].comp_id].push(points[i]);
        }
        return group;
    }


    //清空整个队列
    offCoreAll(){
        if(this.ctrlOn)return;
        for(let i=0;i<this.coreQueue.length;i++){
            let g_id=this.coreQueue[i];
            let element=getModuleByGid(g_id);
            element.setCoreOff();
            // console.log(111)
        }
        this.coreQueue=[];
        clear_arrow_point()
        this.updateCoreMap();
    }


    //在移动的时候删除保留队列，隐藏所有关键点并给组件外围附上蓝色边框

    moveUpdateStyle(){
        for (let key in this.coreMap){
            if(this.coreMap[key]===undefined)continue;
            this.coreMap[key].moveModel();
        }
    }

    movePUpdateStyle(id,cmd){
        // console.log(id);
        // console.log(cmd);
        // console.log(this.coreMap);
        this.coreMap[cmd['id']].updateMovePStyle(cmd['pid'],cmd['dx'],cmd['dy']);
    }

    // setCore(points){
    //     let group=this.getCoreGroup(points);
    //     for(let item in group){
    //         let element=getModuleByGid(item);
    //         if(!element.isCore){
    //             let core=new Core_element(group[item]);
    //             this.coreQueue.push(core);
    //         }else{
    //
    //         }
    //     }
    //     for(let i=0;i<this.coreQueue.length;i++){
    //         if(group[this.coreQueue[i].g_id]===undefined){
    //             this.coreQueue[i].delete();
    //             this.coreQueue.splice(i,1);
    //             i--;
    //         }
    //     }
    //     // console.log(group);
    //     // if(this.ctrlOn===false){
    //     //     let length=this.coreQueue.length;
    //     //     for(var i=0;i<length;i++){
    //     //         let core=this.coreQueue[i];
    //     //         core.delete();
    //     //     }
    //     //     this.coreQueue=[];
    //     // }
    //     // let core=new Core_element(msg);
    //     // this.coreQueue.push(core);
    // }


    // offCoreBySvg_id(svg_id){
    //     if(this.ctrlOn===false)return;
    //     for(var i=0;i<this.coreQueue.length;i++){
    //         let core=this.coreQueue[i];
    //         if(core.svg_id===svg_id){
    //             let element=getModuleBySid(svg_id);
    //             element.setCoreOff();
    //             core.delete();
    //             this.coreQueue.splice(i,1);
    //         }
    //     }
    // }

    // offCoreByGid(g_id){
    //     if(this.ctrlOn===false){
    //         return
    //     }
    //     for(var i=0;i<this.coreQueue.length;i++){
    //         let core=this.coreQueue[i];
    //         if(core.g_id===g_id){
    //             let element=getModuleByGid(g_id);
    //             element.setCoreOff();
    //             core.delete();
    //             this.coreQueue.splice(i,1);
    //         }
    //     }
    // }

    clear(){
        P("uncursor",{})

        this.coreQueue=[];
        this.coreMap={};
    }
}
export function clearCore(){
    core_queue.clear();
}
let core_queue=new Core_queue();

export function offCoreAll(){
    console.log("offCoreAll");
    core_queue.offCoreAll();
}

export function setCore(msg){
    core_queue.setCoreMap(msg);
}

export function offCoreByGid(g_id,flag=false){
    core_queue.deleteElementInQueue(g_id,flag)
}

export function updateCtrlOnTrue(){
    core_queue.updateCtrlOnTrue();
}

export function updateCtrlOnFalse(){
    core_queue.updateCtrlOnFalse();
}

export function getCoreList(){
    return core_queue.getCoreList();
}

export function pushElementInQueue(list){
    return core_queue.pushElementInQueue(list);
}


export function updateCoreMap(){
    core_queue.updateCoreMap();
}

export function moveUpdateStyle(){
    core_queue.moveUpdateStyle();
}

export function movePUpdateStyle(id,cmd){
    core_queue.movePUpdateStyle(id,cmd);
}