import {createGroupAction} from "@/js/action/ComponentGroupable/groupAction";
import {createUngroupAction} from "@/js/action/ComponentGroupable/ungroupAction";
import {createResizeAction} from "@/js/action/ComponentGroupable/resizeAction";
import {createGetGAction} from "@/js/action/ComponentGroupable/getGAction";

export class Groupable {
    group(msg){
        createGroupAction(msg);
    }

    ungroup(msg){
        createUngroupAction(msg);
    }

    resize(msg){
        createResizeAction(msg);
    }

    get_g(msg){
        createGetGAction(msg);
    }
}