import {createGetThetaAction} from "@/js/action/ComponentRotatable/getThetaAction";
import {createSetThetaAction} from "@/js/action/ComponentRotatable/setThetaAction";

export class Rotatable {
    get_theta(msg){
        createGetThetaAction(msg);
    }

    set_theta(msg){
        createSetThetaAction(msg);
    }
}