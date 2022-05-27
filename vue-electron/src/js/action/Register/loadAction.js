import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {createLine} from "@/js/element/module/module_queue";

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
            if(comps[i]['children']===null){
                index+=1;
            }else{
                index+=comps[i]['children'].length+1;
            }
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

    console.log(index)
    console.log(indices[index])

    let svg=document.getElementById(getShapeMapId())
    let childNodes=svg.childNodes;
    let node=childNodes[indices[index]]
    let id=node.getAttribute("id");
    let type=child['type'];
    if(type==="line"){
        createLine({id:id,type:type})
    }

    index+=1;
    if(child['children']===null||child['children']===undefined)return;
    for(let i=0;i<child['children'].length;i++){
        parseTree(child['children'][i],indices,index);
        if(child['children'][i]['children']===null){
            index+=1;
        }else{
            index+=child['children'][i]['children'].length+1;
        }
    }
}