import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {getCoreList, setCore} from "@/js/element/core/core_queue";
import {changeModel, inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";

export class GetPAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        // console.log(msg);
        // console.log(cmd);
        this.msg=msg;
        this.cmd=cmd;
        this.points=msg['points']
        this.command=msg['command']
        this.status=msg['status']
    }

    before(){

    }

    after(){
        setCore(this.points)
        // P("get_theta");
        changeModel();

        P("get_center",{})
        // P("get_modules",{})

    }

    forward(){

    }

    backward(){
    }

    merge(action){
        return false;
    }
}

export function createGetPAction(msg,flag){//cursor
    let val={}
    val["command"]="get_points";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    // updateCMD(cmd);
    sendSocket({cmd:cmd})
}