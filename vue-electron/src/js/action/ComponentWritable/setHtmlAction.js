import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P} from "@/js/action/actionQueue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {getCoreList} from "@/js/element/core/core_queue";

export class SetHtmlAction extends Base_action{
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

        // set_html_bar(this.msg['html'])
    }

    forward(){
        P("cursors",{ids:this.core},false);
        P("set_html",{html:this.cmd['html']},false)
    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("set_html",{html:this.state['html']},false)
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createSetHtmlAction(msg,flag){//list of id
    let val={}
    val["command"]="set_html";
    val['html']=msg['html'];
    val['flag']=flag;
    // console.log(flag)
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}