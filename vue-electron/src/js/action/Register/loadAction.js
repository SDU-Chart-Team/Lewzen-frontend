import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {getMySvg} from "@/js/util/getCanvasIdOperation";

export class LoadAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        // console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){
        let indices=this.msg['json']['indices'];
        let comps=this.msg['json']['comps'];
        let index=0;
        for(let i=0;i<comps.length;i++){
            parseTree(comps[i],indices,index);
            index+=comps[i]['children'].length+1;
            // console.log(index);
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

export function createLoadAction(msg,flag){//time
    let val={}
    val["command"]="load"
    val["json"]=msg["json"];
    val['flag']=flag;

    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}


function parseTree(child,indices,index) {
    // console.log(index);
    // index+=1;
    // console.log(child);
    // if(child['children']===null||child['children']===undefined)return;
    // for(let i=0;i<=child['children'].length;i++){
    //     console.log(child['children'][i])
    //     parseTree(child['children'][i],indices,index);
    //     if(child['children'][i]['children']===null){
    //         index+=1;
    //     }else{
    //         index+=child['children'][i]['children'].length+1;
    //     }
    // }
}