import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetArrowAction extends Base_action{
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

export function createGetArrowAction(msg){//id
    let val={}
    val['cursor']=msg['cursor'];
    sendSocket({type:"get_arrow",msg:val})
}