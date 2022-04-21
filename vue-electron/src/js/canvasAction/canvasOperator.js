import {Grid_canvas} from "@/js/canvas/grid_canvas";
import {Base_canvas} from "@/js/canvas/base_canvas";
import ca from "element-ui/src/locale/lang/ca";

class CanvasOperator {
    constructor() {
        this.canvas=new Base_canvas();
    }
    update_canvas(){
        this.canvas.unInit();
        this.canvas=new Grid_canvas(20);
    }
    delete_canvas(){
        this.canvas.unInit();
        this.canvas=new Base_canvas();
    }
    scaleCanvas(scale){
        this.canvas.scaleCanvas(scale);
    }
    canvas_adjust(scale,height,width){
        this.canvas.adjustCanvas(width,height,scale);
    }
    canvas_extend(state){

    }
    canvas_after_move(left_top_x, left_top_y){
        return this.canvas.AfterMove(left_top_x,left_top_y);
    }
}

let canvas;

export function canvas_init(){
    canvas=new CanvasOperator();
}

export function canvas_change(){
    canvas.update_canvas();
}
export function canvas_delete(){
    canvas.delete_canvas();
}
export function canvas_scale(scale,height,width) {
    canvas.scaleCanvas(scale)
    canvas.canvas_adjust(scale,height,width);
}
export function canvas_adjust(scale,height,width) {
    canvas.canvas_adjust(scale,height,width);
}

export function canvas_extend(state){
    canvas.canvas_extend(state);
}

export function canvas_after_move(left_top_x, left_top_y){
    return canvas.canvas_after_move(left_top_x,left_top_y);
}