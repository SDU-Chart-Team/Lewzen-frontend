import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetStartArrowAction extends Base_action{
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

export function createGetStartArrowAction(msg,flag=true){//cursor dx dy
    let val={}
    val["command"]="get_start_arrow";
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}