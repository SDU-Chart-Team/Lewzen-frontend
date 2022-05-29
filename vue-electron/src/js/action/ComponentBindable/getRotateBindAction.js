import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetRotateBindAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        // console.log(msg);
    }

    before(){

    }

    after(){
        set_rotate_bind(this.msg['rotate_bind'])
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetRotateBindAction(msg,flag){//cursor dx dy
    let val={}
    val['command']="get_rotate_bind";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}