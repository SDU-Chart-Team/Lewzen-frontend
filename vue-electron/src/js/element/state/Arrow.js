import {createSetArrowAction} from "@/js/action/ComponentArrowed/setArrowAction";
import {createGetArrowAction} from "@/js/action/ComponentArrowed/getArrowAction";

export class Arrow {
    constructor() {
        this.arrow=null;//箭头样式
    }

    setAttribute(msg){
        if(msg['arrow']!==undefined){
            this.arrow=msg['arrow'];
        }
    }

    set_arrow(msg){
        createSetArrowAction(msg);
    }

    get_arrow(msg){
        createGetArrowAction(msg);
    }
}