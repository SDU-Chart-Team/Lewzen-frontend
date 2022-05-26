import {createSetStrokeAction} from "@/js/action/ComponentStylizable/setStrokeAction";
import {createSetFillAction} from "@/js/action/ComponentStylizable/setFillAction";
import {createGetStrokeAction} from "@/js/action/ComponentStylizable/getStrokeAction";

export class Stylizable {
    constructor() {
        this.stroke=null;
        this.fill=null;
    }

    set_stroke(msg){
        createSetStrokeAction(msg);
    }

    set_fill(msg){
        createSetFillAction(msg);
    }

    get_stroke(msg){
        createGetStrokeAction(msg);
    }

    get_fill(msg){
        createSetFillAction(msg);
    }
}