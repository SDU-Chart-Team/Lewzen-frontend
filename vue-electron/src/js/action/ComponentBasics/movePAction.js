import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {getCoreList, movePUpdateStyle} from "@/js/element/core/core_queue";
import {anchor_update, update_arrow} from "@/js/element/anchor/anchor_queue";
import {updateGuide} from "@/js/element/guide/guide_queue";
import {guideSet} from "@/js/canvas/base_canvas";
import {update_position_by_gid} from "@/js/element/anchor/arrow_Queue";
import {getChildren} from "@/js/element/module/module_tree";
import {getMoveState} from "./moveAction";
import {updatePosition, updatePPosition} from "../../canvas/base_canvas";
import {updateStyleAfterChange} from "../../element/anchor/arrow_Queue";
import {getAncestorAll} from "../../element/module/module_tree";
import {getModuleByGid} from "../../element/module/module_queue";

export class MovePAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        // console.log(msg);
        this.command=msg['command'];
        this.dx=msg['dx'];
        this.dy=msg['dy'];
        this.id=msg['id'];
        this.pid=msg['pid'];
        this.status=msg['status'];
    }

    before(){
    }

    after(){
        // console.log(1);
        movePUpdateStyle(this.id,this.msg);
        // anchor_update(this.id);
        // update_arrow(this.id);
        // console.log(2);
            // console.log(this.msg);
        updateGuide(this.id)
        guideSet(this.id)
            // anchor_update(this.ids[i])
            // update_arrow(this.ids[i])
        update_position_by_gid(this.id)
        let list=getChildren(this.id)
        for(let j=0;j<list.length;j++){
            update_position_by_gid(list[j])
        }
        // console.log(3);
    }

    forward(){
        P("cursors",{ids:[this.id]},false)
        // let msg={core_id:id,g_id:that.g_id,move_x:transX,move_y:transY}
        P("move_point",{core_id:this.pid,g_id:this.id,move_x:this.dx,move_y:this.dy,flag:true},false)
        let coreList=getCoreList();
        let ancestorList=getAncestorAll(this.id);
        ancestorList.reverse();
        for(let i=0;i<ancestorList.length;i++) {
            let el = getModuleByGid(ancestorList[i])
            if(!el.show){
                P("cursor",{ids:[el.g_id]})
                P("cover_children",{})
            }
        }
        P("cursors",{ids:coreList})
        updateStyleAfterChange()

    }

    backward(){
        P("cursors",{ids:[this.id]},false)

        // let msg={core_id:id,g_id:that.g_id,move_x:transX,move_y:transY}
        P("move_point",{core_id:this.pid,g_id:this.id,move_x:-this.dx,move_y:-this.dy,flag:true},false)

        let coreList=getCoreList();
        let ancestorList=getAncestorAll(this.id);
        ancestorList.reverse();
        for(let i=0;i<ancestorList.length;i++) {
            let el = getModuleByGid(ancestorList[i])
            if(!el.show){
                P("cursor",{ids:[el.g_id]})
                P("cover_children",{})
            }
        }
        P("cursors",{ids:coreList})
        updateStyleAfterChange()

    }

    merge(action){
        // console.log(action);
        if(action.type==="move_point"){
            if(action.id!==this.id)return false;
            if(action.pid!==this.pid)return false;
            this.dx+=action.dx;
            this.dy+=action.dy;
            let actionBefore=action.getActionBefore();
            let actionAfter=action.getActionAfter();
            for(let i=actionAfter.length-1;i>=0;i--){
                this.actionBefore.unshift(actionAfter[i])
            }
            for(let i=actionBefore.length-1;i>=0;i--){
                this.actionBefore.unshift(actionBefore[i])
            }
            return true;
        }
        else return false;
    }

    filter() {
        return true;
    }
}

export function createMovePAction(msg,flag){//id

    if(msg['quick']!==undefined&&msg['quick']===true){
        let val={}
        val['command']="move_point";
        val['id']=msg["g_id"];
        val['pid']=msg["core_id"];
        val['dx']=msg['move_x'];
        val['dy']=msg['move_y']

        val['flag']=flag;

        let cmd=JSON.stringify(val)
        // console.log(cmd);
        sendSocket({cmd:cmd})
        return;
    }


    let core_id=msg["core_id"]
    let g_id=msg["g_id"]
    let move_x=msg["move_x"]
    let move_y=msg["move_y"]
    updateScaleState(core_id,g_id,move_x,move_y);
    let msgTo={
        a_id:msg['core_id'],
        g_id:g_id,
        move_x:move_x,
        move_y:move_y,
        all_move_x:getScaleState()['move_x'],
        all_move_y:getScaleState()['move_y'],
        start_x:getScaleState()['start_x'],
        start_y:getScaleState()['start_y'],
        now_x:getScaleState()['now_x'],
        now_y:getScaleState()['now_y'],
    };
    let trans=updatePPosition(msgTo);
    // console.log(trans);
    let val={}
    val['command']="move_point";
    val['id']=msg["g_id"];
    val['pid']=msg["core_id"];
    val['dx']=move_x+trans['x'];
    val['dy']=move_y+trans['y'];

    updateNowPPosition(val['dx'],val['dy'])
    val['flag']=flag;

    let cmd=JSON.stringify(val)
    // console.log(cmd);
    sendSocket({cmd:cmd})

}


export function updateNowPPosition(x,y){
    scaleStateRecorder['now_x']+=x;
    scaleStateRecorder['now_y']+=y;
}
let scaleStateRecorder={
    core_id:"",
    g_id:"",
    move_x:0,
    move_y:0
}
export function updateScaleState(core_id,g_id,move_x,move_y) {
    scaleStateRecorder["core_id"]=core_id;
    scaleStateRecorder["g_id"]=g_id;
    scaleStateRecorder['move_x']+=move_x;
    scaleStateRecorder['move_y']+=move_y;
}

export function updateTransPState(trans) {
    scaleStateRecorder['trans_x']=trans['x'];
    scaleStateRecorder['trans_y']=trans['y'];
}

export function initMovePState(msg){
    scaleStateRecorder['start_x']=msg['start_x'];
    scaleStateRecorder['start_y']=msg['start_y'];
    scaleStateRecorder['now_x']=msg['start_x'];
    scaleStateRecorder['now_y']=msg['start_y'];
}

export function getScaleState(){
    return{
        core_id:scaleStateRecorder["core_id"],
        g_id:scaleStateRecorder["g_id"],
        move_x:scaleStateRecorder["move_x"],
        move_y:scaleStateRecorder["move_y"],
        start_x:scaleStateRecorder['start_x'],
        start_y:scaleStateRecorder['start_y'],
        now_x:scaleStateRecorder['now_x'],
        now_y:scaleStateRecorder['now_y']
    }
}
export function clearScaleState(){
    scaleStateRecorder={
        core_id:"",
        g_id:"",
        move_x:0,
        move_y:0
    }
}
