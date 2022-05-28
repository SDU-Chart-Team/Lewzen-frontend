import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P, updateState} from "@/js/action/actionQueue";
import {addModuleToTree, getChildren, linkInTree} from "@/js/element/module/module_tree";
import {createLine, createModule, getModuleByGid} from "@/js/element/module/module_queue";

export class GetChildrenAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){
        let list=this.msg['ids']
        let node_id=getState()['node_id'];//对比id
        let f_id=getState()['fid'];//真真的父子节点
        let children=getChildren(node_id);
        for(let i=0;i<children.length;i++){
            let id=list[i];//child节点
            let module=getModuleByGid(children[i]);
            let node=document.getElementById(id)
            let type=module.type;
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
            console.log(id,f_id)
            console.log(111);
            linkInTree(id,f_id);
            P("cursors",{ids:[list[i]]})
            updateState({node_id:children[i],fid:id})
            P("get_children",{})

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

export function createGetChildrenAction(msg,flag){//id
    let val={}
    val['command']="get_children";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}