import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {getCoreList} from "@/js/element/core/core_queue";

export class SetSpacingAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        // console.log(this.cmd);
        // console.log(this.msg);
        this.command=cmd['command'];
        this.status=cmd['status'];
        this.core=getCoreList();
        this.state=getState();
    }

    before(){

    }

    after(){

    }
    forward(){
        P("cursors",{ids:this.core},false);
        P("set_spacing",{spacing:this.cmd['spacing']},false)
    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("set_spacing",{spacing:this.state['spacing']},false)
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createSetSpacingAction(msg,flag){//list of id
    let val={}
    val["command"]="set_spacing";
    val['spacing']=msg['spacing']
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}