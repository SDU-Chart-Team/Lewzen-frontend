import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {getCoreList} from "@/js/element/core/core_queue";

export class FlipAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        // console.log(this.cmd);
        // console.log(this.msg);
        // this.ids=cmd['ids'];
        this.command=cmd['command'];
        this.status=cmd['status'];
        this.core=[];
    }

    before(){

    }

    after(){
        this.core=getCoreList();
    }

    forward(){
        P("cursors",{ids:this.core},false);
        P("flip",{a:this.msg['a'],b:this.msg['b'],c:this.msg['c']},false);
    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("flip",{a:this.msg['a'],b:this.msg['b'],c:this.msg['c']},false);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createFilpAction(msg,flag){//list of id
    let val={}
    val["command"]="flip";
    val['a']=msg['a'];
    val['b']=msg['b'];
    val['c']=msg['c'];
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}