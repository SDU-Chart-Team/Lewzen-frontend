import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetFlipBindAction extends Base_action{
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
        set_flip_bind(this.msg['flip_bind'])
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetFlipBindAction(msg,flag){//cursor dx dy
    let val={}
    val['command']="get_flip_bind";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}