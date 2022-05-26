import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {createReAddAction} from "@/js/action/Register/reAddAction";
import {removeElementByGid} from "@/js/element/module/module_queue";
import {offCoreByGid} from "@/js/element/core/core_queue";
import {deleteTreeNodeById} from "@/js/element/module/module_tree";

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
            offCoreByGid(id,true)
            removeElementByGid(id)
            deleteTreeNodeById(id)
        }
    }

    forward(){
        P("remove",this.msg);
    }

    backward(){
        let msg=[];
        msg['time']=this.time;
        P("readd",msg);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
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