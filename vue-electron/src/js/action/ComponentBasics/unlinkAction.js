import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {linkInTree, unlinkInTree} from "@/js/element/module/module_tree";

export class UnlinkAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
        this.id1=msg['id1'];
        this.id2=msg['id2'];
    }

    before(){

    }

    after(){
        unlinkInTree(this.id1,this.id2);
    }

    forward(){
        P("unlink",{id1:this.id1,id2:this.id2})
    }

    backward(){
        P("link",{id1:this.id1,id2:this.id2})

    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}

export function createUnlinkAction(msg){//id
    let val={}
    val['command']="unlink";
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}