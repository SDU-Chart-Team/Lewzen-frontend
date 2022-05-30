import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {linkByUser, linkInTree} from "@/js/element/module/module_tree";
import {updateLink} from "../../canvas/operation/canvas_link_operation";

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
        if(this.status==="!succeed"){
            linkInTree(this.id1,this.id2);
            updateLink()
        }
    }

    forward(){
        if(this.status==="!succeed"){
            P("link",{id1:this.id1,id2:this.id2},false)
        }
    }

    backward(){
        if(this.status==="!succeed"){
            P("unlink",{id1:this.id1,id2:this.id2},false)

        }
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}
//id1,id2
export function createLinkAction(msg,flag){
    let val={}
    val['command']="link";
    val['id1']=msg['id1'];
    val['id2']=msg['id2'];
    val['flag']=flag
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}