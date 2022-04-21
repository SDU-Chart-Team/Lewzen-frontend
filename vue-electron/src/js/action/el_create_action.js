import {Base_action} from "@/js/action/base_action";
import {setVisible} from "@/js/action/el_delete_action";
import {DomOperator} from "@/js/dom/domOperation";
import {offCoreById} from "@/js/element/elementQueue";
import {SocketItem} from "@/js/socket/socketItem";
import {Element_SVG} from "@/js/element/element_new";
import {appendElement} from "@/js/element/elementQueue_new";

export class El_create_action extends Base_action{
    constructor(type) {
        super(type);
    }
    working(msg){
        // console.log(msg);
        // let element=new Element_SVG(msg);
        appendElement(msg);
    }
    after(){}

    forward() {
        Create(this.svg_id,this.visible)
    }
    backward() {
        Create(this.svg_id,!this.visible)
    }
}

export function Create(svg_id,visible){
    let domOperator=new DomOperator();
    // console.log(svg_id,visible);
    if(!visible){
        document.getElementById(svg_id).style.display="none";
        offCoreById(svg_id);
    }else{
        document.getElementById(svg_id).style.display="block";
    }
}


export function create_Action_Before(shape_id){
    let socket=new SocketItem();
    socket.setMsgTo({type:"create",shape_id:parseInt(shape_id)})
    socket.sendTo();
}