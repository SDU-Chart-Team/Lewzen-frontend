import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetLeftTopAction extends Base_action{
    constructor(type,msg) {
        super(type)
        this.msg=msg;
    }

    after(){
        let leftTop=msg['leftTop'];
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

export function createGetLeftTopAction(msg){//cursor
    let val={}
    val['cursor']=msg['cursor'];
    sendSocket({type:"get_theta",msg:val})
}