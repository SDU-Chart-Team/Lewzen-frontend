import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetThetaAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        // console.log(msg);
    }

    before(){

    }

    after(){
        if(this.msg['status']==="!succeed"){
            set_theta_bar(this.msg['theta'])
        }
        // console.log(this.msg);
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

export function createGetThetaAction(msg){//cursor dx dy
    let val={}
    val['command']="get_theta";
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}