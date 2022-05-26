import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {P} from "@/js/action/actionQueue";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import {setTextPosition} from "@/js/element/text/text_element";

export class Scale_action extends Base_action{
    constructor(type,msg) {
        super(type);
        this.msg=msg;
        this.core_num=getScaleState()['core_id']
        this.g_id=getScaleState()['g_id']
        this.move_x=getScaleState()['move_x']
        this.move_y=getScaleState()['move_y']
    }

    before(){

    }

    after(){
        // console.log(this.msg)
        // updateArrange();
        setTextPosition(this.g_id,this.msg["svg_id"],)

    }

    forward(){
        P("scale",{core_id:this.core_num,g_id:this.g_id,move_x:this.move_x,move_y:this.move_y})
        // create_Scale_Action(this.core_num,this.g_id,this.move_x,this.move_y)
    }

    backward(){
        P("scale",{core_id:this.core_num,g_id:this.g_id,move_x:-this.move_x,move_y:-this.move_y})
        // create_Scale_Action(this.core_num,this.g_id,-this.move_x,-this.move_y)
    }

    merge(action){
        if(action.type!==this.type)return false;
        if(action.core_num!==this.core_num)return false;
        if(action.g_id!==this.g_id)return false;
        return true;
    }
}
