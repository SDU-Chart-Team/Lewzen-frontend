import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {createModule} from "@/js/element/module/module_queue";
import {addModuleToTree} from "@/js/element/module/module_tree";
import {getTypeById, linkByGroup} from "../../element/module/module_tree";
import {createLine} from "../../element/module/module_queue";
import {reAddLine} from "../../element/anchor/arrow_Queue";
import {pushAction} from "../actionQueue";
import {socketPush} from "../../socket/socketQueue";

export class GroupAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
    }

    before(){

    }

    after(){
        // console.log(this.msg);
        let id=this.msg['group_id'];
        let list=this.msg['son']

        for (var j=0;j<list.length;j++){
            linkByGroup(list[j],id);
        }
        P("cursor",{ids:[id]})
        P("cover_children",{})
        P("cursors",{ids:[id]})
    }

    forward(){
        let id=this.msg['group_id'];
        let list=this.msg['son']

        for (var j=0;j<list.length;j++){
            linkByGroup(list[j],id);
        }
        P("cursor",{ids:[id]})
        P("cover_children",{})
        P("cursors",{ids:[id]})
    }

    backward(){
        let id=this.msg['group_id'];
        let list=this.msg['son']
        for(var j=0;j<list.length;j++){
            P("unlink",{id1:list[j],id2:id},false)
        }
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }

}

export function createGroupAction(cmd,msg){//time
    let action=new GroupAction("group",cmd,msg);
    let socket={type:"group",action:action};
    socketPush(socket);
    // pushAction(action);
}