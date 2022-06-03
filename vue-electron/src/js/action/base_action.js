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

    backFilter(action){
        return false;
    }

    frontFilter(action){
        if(action.type==="arrow_from"){
            return true;
        }
        if(action.type==="arrow_from_null"){
            return true;
        }
        if(action.type==="arrow_to"){
            return true;
        }
        if(action.type==="arrow_to_null"){
            return true;
        }
        return false;
    }
}