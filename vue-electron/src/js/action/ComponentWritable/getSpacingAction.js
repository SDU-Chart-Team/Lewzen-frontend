import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";

export class GetSpacingAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        // console.log(this.cmd);
        // console.log(this.msg);
        this.command=cmd['command'];
        this.status=cmd['status'];
    }

    before(){

    }

    after(){
        let msg={}
        msg['left']=this.msg['spacing']['left'];
        msg['right']=this.msg['spacing']['right'];
        msg['bottom']=this.msg['spacing']['bottom'];
        msg['global']=this.msg['spacing']['global'];
        msg['top']=this.msg['spacing']['top'];
        set_spacing_bar(msg)
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetSpacingAction(msg,flag){//list of id
    let val={}
    val["command"]="get_spacing";
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}