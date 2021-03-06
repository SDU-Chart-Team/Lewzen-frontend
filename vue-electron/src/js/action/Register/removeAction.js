import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {createReAddAction} from "@/js/action/Register/reAddAction";
import {removeElementByGid} from "@/js/element/module/module_queue";
import {offCoreByGid} from "@/js/element/core/core_queue";
import {deleteTreeNodeById} from "@/js/element/module/module_tree";
import {getModuleByGid} from "../../element/module/module_queue";
import {BeforeDeleteElement, BeforeDeleteLine} from "../../element/anchor/arrow_Queue";

export class RemoveAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        // console.log(msg);
        // console.log(cmd);
    }

    before(){

    }

    after(){
        for(let i=0;i<this.msg['ids'].length;i++){
            let id=this.msg['ids'][i];
            let element=getModuleByGid(id);
            if(element.isLine){
                BeforeDeleteLine(id);
            }else{
                BeforeDeleteElement(id);
            }
            offCoreByGid(id,true)
            removeElementByGid(id)
            deleteTreeNodeById(id)
        }
    }

    forward(){
        P("cursors",{ids:this.msg['ids']})
        this.msg['time']=getActionCounter();
        P("remove",this.msg);

    }

    backward(){
        let msg=[];
        msg['time']=this.cmd['time'];
        P("readd",msg);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }

    backFilter(action) {
        if(action.type==="ungroup")return true;
        return false;
    }
}

export function createRemoveAction(msg,flag){//time,id
    let val={}


    val["command"]="remove";
    val['time']=msg['time'];
    // val['id']=msg['id'];
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    // updateCMD(cmd);
    sendSocket({cmd:cmd})
}