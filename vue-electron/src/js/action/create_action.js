import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {createModule, getModuleByGid, getModuleBySid} from "@/js/element/module/module_queue";
import {create_core_Before} from "@/js/action/core_action";
import {P} from "@/js/action/actionQueue";

export class Create_action extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){
        createModule(this.msg);
        P("core",{id:this.msg["g_id"]})
        // create_core_Before(this.msg['g_id'])
    }

    forward(){
        let element=getModuleBySid(this.msg['svg_id'])
        element.recreate();
    }

    backward(){
        let element=getModuleBySid(this.msg['svg_id'])
        element.delete();
    }

    merge(action){
        return false;
    }
}

export function create_Action_Before(msg){
    sendSocket({type:"create",shape_id:parseInt(msg["shape_id"])})
}