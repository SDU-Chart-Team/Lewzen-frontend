import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";

export class SetRectAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
        this.core=getCoreList();
        this.state=getState();
    }

    before(){

    }

    after(){

        P("get_p",{})
    }

    forward(){
        P("cursors",{ids:this.core},false);
        // P("set_rect",{rect:this.state['rect']},false)
        P("set_rect",{rect:this.msg['rect']},false);
    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("set_rect",{rect:this.state['rect']},false)

    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createSetRectAction(msg,flag){//cursor dx dy
    let val={}
    val['command']="set_rect";
    val['rect']=msg["rect"];
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}