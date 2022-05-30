import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P, updateState} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";
import {getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {createLine, createModule, getModuleByGid} from "@/js/element/module/module_queue";
import {addModuleToTree} from "@/js/element/module/module_tree";

export class CopyAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        this.id=msg['tops'];
        console.log(cmd);
        console.log(msg);
        this.list=[];
    }
//rectangle_2;link;rectangle_1
    before(){

    }

    after(){
        this.list=getState()['list'];
        if(this.msg['status']!=="!succeed"){
            return;
        }
        for(let i=0;i<this.id.length;i++){

            let node_id=this.list[i];
            let module=getModuleByGid(node_id);
            let node=document.getElementById(this.id[i])
            let type=module.type;
            let display=node.style.display;
            // console.log(display);
            let show=true;
            if(display==="none"){show=false;}
            if(type==="line"){
                createLine({id:this.id[i],type:type,show:show})
            }else{
                createModule({id:this.id[i],type:type,show:show});//需要修改
            }

            addModuleToTree(this.id[i],type)
            P("cursors",{ids:[this.id[i]]})
            updateState({node_id:node_id,fid:this.id[i],list:this.msg['ids']})
            console.log(getState())
            P("get_children",{})
        }
        P("cursors",{ids:this.id})
    }

    forward(){
        let msg=[];
        msg['time']=this.time;
        P("readd",msg,false);
    }

    backward(){
        let coreList=getCoreList();
        P("cursors",{ids:this.id},false);
        let msg=[];
        let time=getActionCounter();
        msg['time']=time;
        this.time=time;
        P("remove",msg,false);
        P("cursors",{ids:coreList},false);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createCopyAction(msg,flag){//id
    let val={}

    val['command']='copy';
    val['flag']=flag;
    let cmd=JSON.stringify(val)
    sendSocket({cmd:cmd})
}