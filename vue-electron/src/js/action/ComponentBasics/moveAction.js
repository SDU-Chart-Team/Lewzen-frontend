import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {guideSet, updatePosition} from "@/js/canvas/base_canvas";
import {getCoreList, updateCoreMap} from "@/js/element/core/core_queue";
import {anchor_update, update_arrow} from "@/js/element/anchor/anchor_queue";
import {updateGuide} from "@/js/element/guide/guide_queue";
import {update_position_by_gid} from "@/js/element/anchor/arrow_Queue";
import {getChildren} from "@/js/element/module/module_tree";
import {updateStyleAfterChange} from "../../element/anchor/arrow_Queue";
import {getAncestorAll} from "../../element/module/module_tree";
import {getModuleByGid} from "../../element/module/module_queue";

export class MoveAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        // console.log(msg);
        this.status=msg['status']
        this.dx=msg['dx']
        this.dy=msg['dy']
        this.ids=getCoreList();
        // console.log(this.ids);
    }

    before(){

    }

    after(){
        for(let i=0;i<this.ids.length;i++){
            // console.log(this.msg);
            updateGuide(this.ids[i])
            guideSet(this.ids[i])
            // anchor_update(this.ids[i])
            // update_arrow(this.ids[i])
            update_position_by_gid(this.ids[i])
            let list=getChildren(this.ids[i])
            for(let j=0;j<list.length;j++){
                update_position_by_gid(list[j])
            }
        }
    }

    forward(){
        P("cursors",{ids:this.ids},false)
        console.log(this.ids);
        //直接进行移动，无需通过设置。
        P("move",{g_id:this.ids,move_x:this.dx,move_y:this.dy,quick:true},false)


        P("cursors",{ids:this.ids},false)
        updateStyleAfterChange()
        for(let i=0;i<this.ids.length;i++){
            guideSet(this.ids[i],false);
        }

        let coreList=getCoreList();
        for(let i=0;i<this.ids.length;i++){
            let ancestorList=getAncestorAll(this.ids[i]);
            ancestorList.reverse();for(let i=0;i<ancestorList.length;i++) {
                let el = getModuleByGid(ancestorList[i])
                if(!el.show){
                    P("cursor",{ids:[el.g_id]})
                    P("cover_children",{})
                }
            }
        }
        P("cursors",{ids:coreList})

    }

    backward(){
        P("cursors",{ids:this.ids},false)
        P("move",{g_id:this.ids,move_x:-this.dx,move_y:-this.dy,quick:true},false)
        P("cursors",{ids:this.ids},false)
        updateStyleAfterChange()
        for(let i=0;i<this.ids.length;i++){
            guideSet(this.ids[i],false);
        }

        let coreList=getCoreList();
        for(let i=0;i<this.ids.length;i++){
            let ancestorList=getAncestorAll(this.ids[i]);
            ancestorList.reverse();for(let i=0;i<ancestorList.length;i++) {
                let el = getModuleByGid(ancestorList[i])
                if(!el.show){
                    P("cursor",{ids:[el.g_id]})
                    P("cover_children",{})
                }
            }
        }
        P("cursors",{ids:coreList})

    }

    merge(action){
        // console.log(action);
        if(action.type==="move"){
            let map={}
            for(let i=0;i<this.ids.length;i++){
                map[this.ids[i]]=1;
            }
            for(let i=0;i<action.ids.length;i++){
                if(map[action.ids[i]]===undefined)return false;
            }
            this.dx+=action.dx;
            this.dy+=action.dy;
            return true;
        }
        else return false;
    }
    filter() {
        return true;
    }
}

let moveStateRecorder={x:0,y:0,g_id:""}

export function updateMoveState(x,y,g_id){
    moveStateRecorder['x']+=x;
    moveStateRecorder['y']+=y;
    moveStateRecorder['g_id']=g_id;
}
export function getMoveState() {
    return {
        x:moveStateRecorder['x'],
        y:moveStateRecorder['y'],
        g_id:moveStateRecorder['g_id'],
        trans_x:moveStateRecorder['trans_x'],
        trans_y:moveStateRecorder['trans_y'],
        start_x:moveStateRecorder['start_x'],
        start_y:moveStateRecorder['start_y']
    }
}
export function clearMoveState(){
    moveStateRecorder={x:0,y:0,g_id:""}
}
export function initMoveState(msg){
    // console.log(msg);
    moveStateRecorder['start_x']=msg['start_x'];
    moveStateRecorder['start_y']=msg['start_y'];
}
export function updateTransState(trans){
    moveStateRecorder['trans_x']=trans['x']
    moveStateRecorder['trans_y']=trans['y']
}

export function createMoveAction(msgTo,flag=true){

    //设置quick
    if(msgTo["quick"]!==undefined&&msgTo['quick']===true){
        let val={}
        val['command']="move";
        val['dx']=msgTo["move_x"];
        val['dy']=msgTo["move_y"];
        val['flag']=flag;
        // console.log(val);
        let cmd=JSON.stringify(val);
        // console.log(cmd);
        // updateCMD(cmd);
        sendSocket({cmd:cmd})
        return;
    }


    // console.log(msgTo);
    let g_id=msgTo["g_id"];
    let move_x=msgTo["move_x"];
    let move_y=msgTo["move_y"]
    // console.log(g_id,move_x,move_y);
    updateMoveState(move_x,move_y,g_id)
    let msg={g_id:g_id,move_x:move_x,move_y:move_y,all_move_x:getMoveState()['x'],all_move_y:getMoveState()['y'],start_x:getMoveState()['start_x'],start_y:getMoveState()['start_y']};
    let trans=updatePosition(msg);
    updateTransState(trans);
    // console.log(trans);
    move_x+=trans['x'];
    move_y+=trans['y'];
    // console.log(move_x,move_y);

    let val={}
    val['command']="move";
    val['dx']=move_x;
    val['dy']=move_y;
    val['flag']=flag;
    // console.log(val);
    let cmd=JSON.stringify(val);
    // console.log(cmd);
    // updateCMD(cmd);
    sendSocket({cmd:cmd})
}



