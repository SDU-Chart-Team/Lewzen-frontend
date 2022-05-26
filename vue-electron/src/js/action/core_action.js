import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getModuleBySid} from "@/js/element/module/module_queue";
import {setCore} from "@/js/element/core/core_queue";
import {inElementStyleModel} from "@/js/canvas/operation/canvas_model_operation";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";

export class Core_action extends Base_action{
    constructor(type,msg) {
        super(type);

        this.msg=msg;

    }

    before(){
    }

    after(){
        setCore(this.msg)
        inElementStyleModel(this.msg["svg_id"]);
        // updateArrange();
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function create_core_Before(msg){
    sendSocket({type:"core",g_id:parseInt(msg["id"])})
}