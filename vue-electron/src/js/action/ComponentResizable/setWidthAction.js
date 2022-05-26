import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class SetWidthAction extends Base_action{
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

export function createSetWidthAction(msg){//cursor dx dy
    let val={}
    val['cursor']=msg['cursor'];
    val['width']=msg['width'];
    sendSocket({type:"set_width",msg:val})
}