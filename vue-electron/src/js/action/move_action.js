import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import th from "element-ui/src/locale/lang/th";
import {guideSet, updatePosition} from "@/js/canvas/base_canvas";
import {updateGuide} from "@/js/element/guide/guide_queue";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {P} from "@/js/action/actionQueue";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {setTextPosition} from "@/js/element/text/text_element";

export class Move_action extends Base_action{
    constructor(type,msg) {
        super(type);
        this.msg=msg;
        this.move_x=getMoveState()['x']-getMoveState()['trans_x'];
        this.move_y=getMoveState()['y']-getMoveState()['trans_y'];
        this.g_id=getMoveState()['g_id'];

    }

    before(){

    }

    after(){
        // console.log(this.msg);
        updateGuide(this.msg["g_id"])
        guideSet(this.msg["g_id"])
        // updateArrange();
    }

    forward(){
        P("move",{g_id:this.g_id,move_x:this.move_x,move_y:this.move_y})
        // sendSocket(create_Move_Action(this.g_id,this.move_x,this.move_y))
    }

    backward(){
        P("move",{g_id:this.g_id,move_x:-this.move_x,move_y:-this.move_y})
        // sendSocket(create_Move_Action(this.g_id,-this.move_x,-this.move_y))
    }

    merge(action){
        if(this.type!==action.type)return false;
        else if(this.msg['svg_id']===action.msg['svg_id'])
            return true;
        return false;
    }
}

// let moveStateRecorder={x:0,y:0,g_id:""}
//
// export function updateMoveState(x,y,g_id){
//     moveStateRecorder['x']+=x;
//     moveStateRecorder['y']+=y;
//     moveStateRecorder['g_id']=g_id;
// }
// export function getMoveState() {
//     return {
//         x:moveStateRecorder['x'],
//         y:moveStateRecorder['y'],
//         g_id:moveStateRecorder['g_id'],
//         trans_x:moveStateRecorder['trans_x'],
//         trans_y:moveStateRecorder['trans_y'],
//         start_x:moveStateRecorder['start_x'],
//         start_y:moveStateRecorder['start_y']
//     }
// }
// export function clearMoveState(){
//     moveStateRecorder={x:0,y:0,g_id:""}
// }
// export function initMoveState(msg){
//     console.log(msg);
//     moveStateRecorder['start_x']=msg['start_x'];
//     moveStateRecorder['start_y']=msg['start_y'];
// }
// export function updateTransState(trans){
//     moveStateRecorder['trans_x']=trans['x']
//     moveStateRecorder['trans_y']=trans['y']
// }
//
// export function create_Move_Action(msgTo){
//     let g_id=msgTo["g_id"];
//     let move_x=msgTo["move_x"];
//     let move_y=msgTo["move_y"]
//     // console.log(g_id,move_x,move_y);
//     updateMoveState(move_x,move_y,g_id)
//     let msg={g_id:g_id,move_x:move_x,move_y:move_y,all_move_x:getMoveState()['x'],all_move_y:getMoveState()['y'],start_x:getMoveState()['start_x'],start_y:getMoveState()['start_y']};
//     let trans=updatePosition(msg);
//     updateTransState(trans);
//     move_x+=trans['x'];
//     move_y+=trans['y'];
//     // console.log(move_x,move_y);
//     var time=new Date().getTime();
//
//     // update(g_id,move_x,move_y)
//     sendSocket({type:"move",g_id:parseInt(g_id),move_x:move_x,move_y:move_y,time:time})
// }



function update(g_id,move_x,move_y) {
    let element = getModuleByGid(g_id)
    let node = document.getElementById(element.svg_id);
    let x=parseInt(move_x) + parseInt(node.getAttribute("x"));
    let y=parseInt(move_y) + parseInt(node.getAttribute("y"));
    node.setAttribute("x", x);
    node.setAttribute("y", y);

    for(var i=0;i<8;i++){
        let node = document.getElementById(element.svg_id+"_"+i);
        let x=parseInt(move_x) + parseInt(node.getAttribute("cx"));
        let y=parseInt(move_y) + parseInt(node.getAttribute("cy"));
        node.setAttribute("cx", x);
        node.setAttribute("cy", y);
    }

}
