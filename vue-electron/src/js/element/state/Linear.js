import {createGetStartAction} from "@/js/action/ComponentLinear/getStartAction";
import {createSetStartAction} from "@/js/action/ComponentLinear/setStartAction";

export class Linear {

    get_start(msg){
        createGetStartAction(msg);
    }

    set_start(msg){
        createSetStartAction(msg);
    }
}