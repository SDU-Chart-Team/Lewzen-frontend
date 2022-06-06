import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";

export class GetRectAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        // console.log(msg);
    }

    before(){

    }

    after(){
        let msg={}
        if(msg['status']==="!succeed"){
            msg['flag']=true;
            msg['x']=this.msg['rect']['x']
            msg['y']=this.msg['rect']['y']
            msg['height']=this.msg['rect']['height']
            msg['width']=this.msg['rect']['width']
            setPosition(msg);
            setElementSize(msg);
        }

    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetRectAction(msg,flag){//cursor dx dy
    let val={}
    val['command']="get_rect";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}