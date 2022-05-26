import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";

export class UnCursorAction extends Base_action{
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
        P('get_p',{},this.cmd['flag'])
    }

    forward(){
        // P("uncursor",{})
    }

    backward(){
        // P("cursors",{ids:this.core})
    }

    merge(action){
        return false;
    }


}

export function createUnCursorsAction(msg,flag){
    let val={}
    val["command"]="uncursor";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}