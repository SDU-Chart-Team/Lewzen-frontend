import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetWidthAction extends Base_action{
    constructor(type,msg) {
        super(type)
        this.msg=msg;
    }


    after(){
        this.msg=msg;
    }

    forward(){
        return null;
    }

    backward(){
        return null;
    }

    merge(action){
        return false;
    }
}

export function createGetWidthAction(msg){
    let val={}
    val['cursor']=msg['cursor'];
    sendSocket({type:"get_width",msg:val})
}