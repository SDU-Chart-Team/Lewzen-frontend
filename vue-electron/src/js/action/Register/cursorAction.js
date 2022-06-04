import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, P_More} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";

export class CursorAction extends Base_action{
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
        P('get_p',{},this.cmd['flag'])
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createCursorAction(msg,flag){//list of id
    let val={}
    val["command"]="cursors";
    val['ids']=msg['ids'];
    val['flag']=flag;
    val['quick']=true;

    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}