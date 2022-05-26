import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";

export class GetAlignmentAction extends Base_action{
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
        msg['horizontal']=this.msg['alignment']['horizental'];
        msg['vertical']=this.msg['alignment']['vertical']
        set_alignment_bar(msg);
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetAlignmentAction(msg,flag){//list of id
    let val={}
    val["command"]="get_alignment";
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}