import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";

export class FrontAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        this.core=[];
    }

    before(){

    }

    after(){
        this.core=getCoreList();
    }

    forward(){
        P("cursors",{ids:this.core},false);
        P("front",{},false);
    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("back",{},false);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}
//{}
export function createFrontAction(msg,flag){
    let val={}
    val['command']="front";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}