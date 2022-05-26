import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class SetStyleAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        console.log(cmd);
        console.log(msg);
        this.cmd=cmd;
        this.msg=msg;
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

    }
}

export function createSetStyleAction(msg,flag){//style
    let val={}
    val['command']="set_style";
    val['style']=msg['style']
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}