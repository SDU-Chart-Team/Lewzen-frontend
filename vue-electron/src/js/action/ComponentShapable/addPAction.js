import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class AddPAction extends Base_action{
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

export function createAddPAction(msg){//cursor dx dy
    let val={}
    val['cursor']=msg['cursor'];
    sendSocket({type:"add_p",msg:val})
}