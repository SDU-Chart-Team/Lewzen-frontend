import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {saveFile} from "@/js/util/fileOperation";
import {getMyDefs, getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {getGradientList} from "@/js/util/LinearGradientCreator";

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
        let gradientList=getGradientList();
        let msg={json:this.msg['json'],color:gradientList}
        saveFile(msg)
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