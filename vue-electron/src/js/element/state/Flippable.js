import {createHFlipAction} from "@/js/action/ComponentFlippable/hflipAction";

export class Flippable {
    constructor() {

    }

    hfilp(msg){
        createHFlipAction(msg);
    }

    vfilp(msg){
        createHFlipAction(msg);
    }
}