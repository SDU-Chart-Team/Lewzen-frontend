import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";

export class SetHeightAction extends Base_action{
    constructor(type,msg) {
        super(type)
        this.msg=msg;
    }

    before(){

    }

    after(){

    }

    forward(){
        P("set_height",this.msg)
    }

    backward(){
        
    }

    merge(action){
        return false;
    }
}

export function createSetHeightAction(msg){//cursor dx dy
    let val={}
    val['cursor']=msg['cursor'];
    val['height']=msg['height'];
    sendSocket({type:"set_height",msg:val})
}