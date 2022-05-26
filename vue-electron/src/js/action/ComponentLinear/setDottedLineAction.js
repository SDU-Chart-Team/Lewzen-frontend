import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class SetDottedLineAction extends Base_action{
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

export function createSetDottedLineAction(msg,flag){//cursor dx dy
    let val={}
    val["command"]="set_dotted_line";
    val["dot_type"]=msg["dot_type"];
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}