import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetContentAction extends Base_action{
    constructor(type) {
        super(type)
    }

    before(){

    }

    after(){

    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetContentAction(msg,flag){//cursor dx dy
    let val={}
    val['cursor']=msg['cursor'];
    val['flag']=flag;
    sendSocket({type:"get_content",msg:val})
}