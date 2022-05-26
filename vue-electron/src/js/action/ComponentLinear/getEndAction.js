import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";

export class getEndAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){

    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetEndAction(msg,flag){//time
    let val={}
    val["command"]="get_end";
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}