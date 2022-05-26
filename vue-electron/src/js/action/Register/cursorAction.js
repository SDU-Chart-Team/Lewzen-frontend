import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";

export class CursorAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        // console.log(msg);
        // console.log(cmd);
        msg["id"]=msg["id"].substr(1,msg['id']-2)
        this.cmd=cmd;
        this.msg=msg;
        this.id=msg["id"];//组件id
    }

    before(){

    }

    after(){
        P("get_p",{},this.cmd['flag'])
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }


}

export function createCursorAction(msg){//id
    let cmd="cursor "+msg['id'];
    // console.log(cmd);
    updateCMD(cmd);
    sendSocket({cmd:cmd})
}