import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";

export class FrontwardAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        // console.log(msg);
        this.core=[];
    }

    before(){

    }

    after(){
        this.core=getCoreList();
    }

    forward(){
        P("cursors",{ids:this.core},false);
        P("forward",{},false);
    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("backward",{},false);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}
//{}
export function createFrontwardAction(msg,flag){
    let val={}
    val['command']="forward";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}