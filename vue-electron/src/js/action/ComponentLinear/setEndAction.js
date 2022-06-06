import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";

export class SetEndAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        // console.log(this.cmd);
        // console.log(this.msg);
        this.ids=cmd['ids'];
        this.command=cmd['command'];
        this.status=cmd['status'];
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

export function createSetEndAction(msg,flag){//list of id
    let val={}
    val["command"]="set_end";
    val['point']=msg['point'];
    val['x']=msg['x'];
    val['y']=msg['y'];
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}