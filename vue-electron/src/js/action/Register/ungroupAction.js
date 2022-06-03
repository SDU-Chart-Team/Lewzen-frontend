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

export class UngroupAction extends Base_action {
    constructor(type, cmd, msg) {
        super(type)
        this.cmd = cmd;
        this.msg = msg;
    }

    before() {

    }

    after() {
        let id = this.msg['group_id'];
        let list = this.msg['son']
        for (var j = 0; j < list.length; j++) {
            P("unlink", {id1: list[j], id2: id}, false)
        }

    }

    forward() {
        let id = this.msg['group_id'];
        let list = this.msg['son']
        for (var j = 0; j < list.length; j++) {
            P("unlink", {id1: list[j], id2: id}, false)
        }
    }

    backward() {
        let id = this.msg['group_id'];
        let list = this.msg['son']

        for (var j = 0; j < list.length; j++) {
            linkByGroup(list[j], id);
        }
        P("cursor", {ids: [id]})
        P("cover_children", {})
        P("cursors", {ids: [id]})
    }

    merge(action) {
        return false;
    }

    filter() {
        return true;
    }

    frontFilter(action) {
        if(action.type==="remove"){
            return true;
        }
        return false;
    }
}



export function createUngroupAction(cmd,msg){//time
    let action=new UngroupAction("ungroup",cmd,msg);
    let socket={type:"ungroup",action:action};
    socketPush(socket);
    // pushAction(action);
}