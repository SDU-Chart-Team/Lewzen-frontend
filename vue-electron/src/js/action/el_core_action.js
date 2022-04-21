import {SocketItem} from "@/js/socket/socketItem";
import {Base_action} from "@/js/action/base_action";
import {appendElement, setCoreModel} from "@/js/element/elementQueue_new";
import {Create} from "@/js/action/el_create_action";

export class El_core_action extends Base_action{
    constructor(type) {
        super(type);
    }
    working(msg){
        setCoreModel(msg);
    }
    after(){}

    forward() {
        Create(this.svg_id,this.visible)
    }
    backward() {
        Create(this.svg_id,!this.visible)
    }
}



export function create_core_Before(id){
    let socket=new SocketItem();
    socket.setMsgTo({type:"core",g_id:parseInt(id)})
    socket.sendTo();
}