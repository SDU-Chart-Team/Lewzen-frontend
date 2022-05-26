import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class LoadAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
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

export function createLoadAction(msg,flag){//time
    let val={}
    val["command"]="load"
    val["json"]=msg["json"];
    val['flag']=flag;

    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}