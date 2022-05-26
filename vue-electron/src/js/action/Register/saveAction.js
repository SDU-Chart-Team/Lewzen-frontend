import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {saveFile} from "@/js/util/fileOperation";

export class SaveAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.msg=msg;
        this.cmd=cmd;
        console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){
        saveFile(this.msg['json'])
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createSaveAction(msg,flag){//time
    let val={}
    val["command"]="save";
    val['flag']=flag;

    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}