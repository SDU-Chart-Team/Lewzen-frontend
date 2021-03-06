import {Grid_canvas} from "@/js/canvas/grid_canvas";
import {Guide_canvas} from "@/js/canvas/guide_canvas";
import {Connection_canvas} from "@/js/canvas/connection_canvas";

class Base_canvas {
    constructor() {
        this.canvasList={
            grid:new Grid_canvas(),
            guide:new Guide_canvas(),
            connect:new Connection_canvas(),
        }
    }
    setState(sort,state){
        this.canvasList[sort].setState(state);
    }

    adjust(sort,msg={}){
        this.canvasList[sort].adjust(msg)
    }

    getState(sort){
        return this.canvasList[sort].getState(sort);
    }
    guideSet(g_id,flag){
        if(flag){
            this.canvasList['guide'].adjust(g_id)
        }else{
            this.canvasList['guide'].deleteGuide();
        }
    }
    guideCancel(){
        this.canvasList['guide'].delete();
    }
    updatePosition(msg){
        let trans={x:0,y:0};
        if(this.getState("grid")){
            trans=this.canvasList['grid'].updatePosition(msg);
        }else if(this.getState("guide")){
            trans=this.canvasList['guide'].updatePosition(msg);
        }
        return trans;
    }

    updatePPosition(msg){
        let trans={x:0,y:0}
        if(this.getState("grid")){
            trans=this.canvasList['grid'].updatePPosition(msg);
        }else if(this.getState("guide")){
            trans=this.canvasList['guide'].updatePPosition(msg);
        }
        return trans;
    }

    update(sort,g_id,msg){
        if(sort==="connect"){
            this.canvasList['connect'].update(g_id,msg);
        }
    }

    get_connect_point_list(msg){
        return this.canvasList['connect'].get_connect_point_list(msg);
    }

    clear(){
        this.canvasList['guide'].clear();
        this.canvasList['connect'].clear();
    }
}

let base_canvas=new Base_canvas();

export function setCanvasState(sort,state){
    base_canvas.setState(sort,state);
}

export function getCanvasState(sort){
    return base_canvas.getState(sort);
}

export function canvasAdjust(sort,msg={}){
    base_canvas.adjust(sort,msg);
}

export function guideSet(g_id,flag=true){
    base_canvas.guideSet(g_id,flag);
}

export function guideCancel(msg){
    base_canvas.guideCancel(msg);
}

export function updatePosition(msg) {
    return base_canvas.updatePosition(msg);
}

export function updatePPosition(msg){
    return base_canvas.updatePPosition(msg);
}

export function canvas_update(sort,g_id,msg){
    base_canvas.update(sort,g_id,msg);
}


export function get_connect_point_list(msg){
    return base_canvas.get_connect_point_list(msg);
}

export function clearState(){
    base_canvas.clear();
}