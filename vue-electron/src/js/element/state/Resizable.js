import {createGetLeftTopAction} from "@/js/action/ComponentResizable/getLeftTopAction";
import {createSetLeftTopAction} from "@/js/action/ComponentResizable/setLeftTopAction";
import {createGetWidthAction} from "@/js/action/ComponentResizable/getWidthAction";
import {createSetWidthAction} from "@/js/action/ComponentResizable/setWidthAction";
import {createGetHeightAction} from "@/js/action/ComponentResizable/getHeightAction";
import {createSetHeightAction} from "@/js/action/ComponentResizable/setHeightAction";

export class Resizable {
    get_lefttop(msg){
        createGetLeftTopAction(msg);
    }

    set_lefttop(msg){
        createSetLeftTopAction(msg);
    }

    get_width(msg){
        createGetWidthAction(msg);
    }

    set_width(msg){
        createSetWidthAction(msg);
    }

    get_height(msg){
        createGetHeightAction(msg);
    }

    set_height(msg){
        createSetHeightAction(msg);
    }
}