import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";

export class CopyAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){

    }

    forward(){
        let msg=[];
        msg['time']=this.time;
        P("readd",msg);
    }

    backward(){
        let msg=[];
        msg['id']=this.msg['g_id'];
        let time=getActionCounter();
        msg['time']=time;
        this.time=time;
        P("remove",msg);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createCopyAction(msg,flag){//id
    let val={}

    val['command']='copy';
    val['flag']=flag;
    let cmd=JSON.stringify(val)
    sendSocket({cmd:cmd})
}