import {updateCtrlOnFalse, updateCtrlOnTrue} from "@/js/element/core/core_queue";
import {canvas_scale, canvas_scale_down, canvas_scale_up} from "@/js/util/canvas_operation";
import {getMySvg} from "@/js/util/getCanvasIdOperation";


let key_code_map={}
let ctrlOn=false;
export function initKey(){
    document.onkeydown=function (e) {
        key_code_map[e.keyCode]=true;
        // console.log(e.keyCode)
        if(e.ctrlKey){
            updateCtrlOnTrue();
            ctrlOn=true;
        }else{
            ctrlOn=false;
        }
        if(e.keyCode===97){
            // console.log(111);
            if(key_code_map[e.keyCode]){
                // console.log(e)
                canvas_scale_up()
            }
        }else if(e.keyCode===99){
            if(key_code_map[e.keyCode]){
                canvas_scale_down()
            }
        }
    }

    document.onkeyup=function(e){
        // console.log("ctrl off");
        key_code_map[e.keyCode]=false;
        if(!e.ctrlKey){
            updateCtrlOnFalse();
            ctrlOn=false;
        }
    }

    document.onmousewheel = function (e) {
        if(e.wheelDelta > 0){
            if(ctrlOn){
                canvas_scale_up();
            }
        }else{
            if(ctrlOn){
                canvas_scale_down();
            }
        }
    }
}