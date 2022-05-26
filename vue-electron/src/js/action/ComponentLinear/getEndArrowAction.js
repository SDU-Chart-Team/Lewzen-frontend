import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";

export class GetEndArrowAction extends Base_action{
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

export function createGetEndArrowAction(msg,flag){//cursor dx dy
    let val={}
    val["command"]="get_end_arrow";
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}