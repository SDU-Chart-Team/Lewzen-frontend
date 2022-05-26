import fa from "element-ui/src/locale/lang/fa";

export class Base_action {
    constructor(type) {
        this.type=type;
    }

    before(){

    }

    after(){

    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }

    filter(){
        return false;
    }
}