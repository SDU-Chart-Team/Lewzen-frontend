import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class ResizeAction extends Base_action{
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

    }
}

export function createResizeAction(msg){//cursor dx dy
    let val={}
    val['cursor']=msg['cursor'];
    val['x']=msg['x'];
    val['y']=msg['y'];
    val['w']=msg['w'];
    val['h']=msg['h'];
    sendSocket({type:"resize",msg:val})
}