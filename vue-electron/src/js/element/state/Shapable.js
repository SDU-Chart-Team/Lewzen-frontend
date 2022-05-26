import {createAddPAction} from "@/js/action/ComponentShapable/addPAction";
import {createRemovePAction} from "@/js/action/ComponentShapable/removePAction";

export class Shapable {
    constructor() {
        this.cursor=null;
        this.p=null;
    }

    add_p(msg){
        createAddPAction(msg);
    }

    remove_p(msg){
        createRemovePAction(msg);
    }
}
