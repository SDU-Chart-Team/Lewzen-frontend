import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {linkByUser, linkInTree} from "@/js/element/module/module_tree";

export class LinkAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        // console.log(msg);
        // console.log(cmd);
        this.status=msg['status'];
        this.id1=msg['id1'];
        this.id2=msg['id2'];
    }

    before(){

    }

    after(){
        linkInTree(this.id1,this.id2);
    }

    forward(){
        P("link",{id1:this.id1,id2:this.id2})
    }

    backward(){
        P("unlink",{id1:this.id1,id2:this.id2})
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}
//id1,id2
export function createLinkAction(msg){
    let val={}
    val['command']="link";
    val['id1']=msg['id1'];
    val['id2']=msg['id2'];
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}