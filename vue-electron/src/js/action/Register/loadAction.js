import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {createLine, createModule} from "@/js/element/module/module_queue";
import {addModuleToTree, linkInTree} from "@/js/element/module/module_tree";

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


function parseTree(child,indices,index,fid=-1) {

    // console.log(index)
    // console.log(indices[index])

    let svg=document.getElementById(getShapeMapId())
    let childNodes=svg.childNodes;
    let node=childNodes[indices[index]]
    let id=node.getAttribute("id");
    let type=child['type'];
    let display=node.style.display;
    // console.log(display);
    let show=true;
    if(display==="none"){show=false;}
    if(type==="line"){
        createLine({id:id,type:type,show:show})
    }else{
        createModule({id:id,type:type,show:show});//需要修改
    }
    addModuleToTree(id,type)
    if(fid!==-1){
        linkInTree(id,fid);
    }
    index+=1;
    if(child['children']===null||child['children']===undefined)return;
    for(let i=0;i<child['children'].length;i++){
        parseTree(child['children'][i],indices,index,id);
        if(child['children'][i]['children']===null){
            index+=1;
        }else{
            index+=child['children'][i]['children'].length+1;
        }
    }
}