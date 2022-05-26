import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetHeightAction extends Base_action{
    constructor(type,msg) {
        super(type)
        this.msg=msg;
    }

    after(){
        let height=msg['height'];

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

export function createGetHeightAction(msg){//cursor
    let val={}
    val['cursor']=msg['cursor'];
    sendSocket({type:"get_height",msg:val})
}