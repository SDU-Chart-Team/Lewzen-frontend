import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {updateStyle} from "@/js/canvas/operation/canvas_style_operation";

export class GetStyleAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        console.log(cmd);
        console.log(msg);
        this.cmd=cmd;
        this.msg=msg;
        this.style=msg['style'];
        this.status=msg['status'];
    }

    before(){

    }

    after(){
        // updateStyle();
        updateStyle(this.msg['style'])
    }

    forward(){

    }

    backward(){

    }

    merge(action){

    }
}

export function createGetStyleAction(msg,flag){
    let val={}
    val['command']="get_style";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}