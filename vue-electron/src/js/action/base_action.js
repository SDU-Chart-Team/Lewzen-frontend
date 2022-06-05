import fa from "element-ui/src/locale/lang/fa";

export class Base_action {
    constructor(type) {
        this.type=type;
        this.actionAfter=[];
        this.actionBefore=[];
    }


    pushActionAfter(action){
        this.actionAfter.push(action);
    }

    pushActionBefore(action){
        this.actionBefore.push(action);
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

    getActionAfter(){
        return this.actionAfter;
    }

    getActionBefore(){
        return this.actionBefore;
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