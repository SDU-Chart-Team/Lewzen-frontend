import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {P} from "../actionQueue";

export class CloseOffsetAction extends Base_action{
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
        P("get_offset",{})
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createCloseOffsetAction(msg,flag){//cursor dx dy
    let val={}
    val["command"]="close_offset";
    val['flag']=flag;

    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}