import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {createModule} from "@/js/element/module/module_queue";
import {addModuleToTree} from "@/js/element/module/module_tree";
import {getTypeById, linkByGroup} from "../../element/module/module_tree";
import {createLine} from "../../element/module/module_queue";
import {add_arrow_to, delete_arrow_to, reAddLine} from "../../element/anchor/arrow_Queue";
import {pushAction} from "../actionQueue";
import {socketPush} from "../../socket/socketQueue";

export class SetArrowToAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        this.line_id=msg['line_id']
        this.g_id=msg['g_id'];
        this.a_id=msg['a_id'];
    }

    before(){

    }

    after(){
        add_arrow_to(this.g_id,this.a_id,this.line_id);
    }

    forward(){
        add_arrow_to(this.g_id,this.a_id,this.line_id);
    }

    backward(){
        delete_arrow_to(this.line_id)
    }
    merge(action){
        return false;
    }

    filter() {
        return true;
    }

    backFilter(action) {
        return true;
    }
}

export function createArrowToAction(cmd,msg){//time
    let action=new SetArrowToAction("arrow_to",cmd,msg);
    let socket={type:"arrow_to",action:action};
    socketPush(socket);
    // pushAction(action);
}