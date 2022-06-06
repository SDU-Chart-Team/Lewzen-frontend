import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class SetEndArrowAction extends Base_action{
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

export function createSetEndArrowAction(msg,flag){//cursor dx dy
    let val={}
    val["command"]="set_end_arrow";
    val["end_arrow"]=msg["end_arrow"];
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}