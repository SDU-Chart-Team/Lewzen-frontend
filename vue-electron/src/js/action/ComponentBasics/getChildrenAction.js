import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P, updateState} from "@/js/action/actionQueue";
import {addModuleToTree, getChildren, linkInTree} from "@/js/element/module/module_tree";
import {createLine, createModule, getModuleByGid} from "@/js/element/module/module_queue";
import {getChildrenOneList, getTypeById} from "../../element/module/module_tree";

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
        let nodeList=getState()['list'];
        let f_id=getState()['fid'];//真真的父子节点
        let children=getChildrenOneList(node_id);
        // console.log(children);

        let list_tmp={}
        if(list===null){
            return;
        }
        for(let i=0;i<list.length;i++){
            list_tmp[list[i]]=1;
        }
        let list1=[]
        for(let i=0;i<nodeList.length;i++){
            if(list_tmp[nodeList[i]]!==undefined){
                list1.push(nodeList[i]);
            }
        }
        list=list1;
        console.log(list);
        console.log(nodeList);
        console.log(children);
        for(let i=0;i<children.length;i++){
            let id=list[i];//child节点
            let module=getModuleByGid(children[i]);
            let node=document.getElementById(id)
            if(node===undefined)continue;
            console.log(node);
            console.log(node.style);
            let display=node.style.display;
            // console.log(display);
            let show=true;
            if(display!==undefined){
                if(display==="none"){show=false;}
            }
            let type=getTypeById(children[i])
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
            updateState({node_id:children[i],fid:id,list:nodeList})
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