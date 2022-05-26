import {createGetRegisterAction} from "@/js/action/ComponentBasics/getRegisterAction";
import {createGetPAction} from "@/js/action/ComponentBasics/getPAction";
import {createMoveAction} from "@/js/action/ComponentBasics/moveAction";
import {createBackwardAction} from "@/js/action/ComponentBasics/backwardAction";
import {createFrontwardAction} from "@/js/action/ComponentBasics/frontwardAction";
import {createBackAction} from "@/js/action/ComponentBasics/backAction";
import {createFrontAction} from "@/js/action/ComponentBasics/frontAction";
import {createMovePAction} from "@/js/action/ComponentBasics/movePAction";

export class Basic {

    constructor() {
        this.p=null;
    }

    setAttribute(msg){
        if(msg['p']!==undefined){
            this.p=null;
        }
    }

    get_register(msg){
        createGetRegisterAction(msg);
    }

    get_p(msg){
        createGetPAction(msg);
    }

    move(msg){
        createMoveAction(msg);
    }

    backward(msg){
        createBackwardAction(msg);
    }

    frontward(msg){
        createFrontwardAction(msg);
    }

    back(msg){
        createBackAction(msg);
    }

    front(msg){
        createFrontAction(msg);
    }

    move_p(msg){
        createMovePAction(msg);
    }
}