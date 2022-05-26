import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class EnableScaleBindAction extends Base_action{
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

let thetaRegister={}

function initRegister(msg){
    thetaRegister['id']=msg['id']
    thetaRegister['theta']=msg['theta'];
}

export function createEnableScaleBindAction(msg){//cursor dx dy
    let val={}
    val['command']="enable_scale_bind";
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}