import {getMySvg} from "@/js/util/getCanvasIdOperation";
import {P} from "@/js/action/actionQueue";
import {canvasAdjust} from "@/js/canvas/base_canvas";
import {getCoreList} from "@/js/element/core/core_queue";

let canvas_scale_counter=1.0

export function canvas_scale_up(){
    canvas_scale_counter+=0.01
    if(canvas_scale_counter>2)canvas_scale_counter=2
    let svg=document.getElementById(getMySvg());
    let scale="transform:scale("+canvas_scale_counter+","+canvas_scale_counter+");"
    canvasAdjust("grid")
    mapUpdate({})
}

export function canvas_scale_down(){
    canvas_scale_counter-=0.01
    if(canvas_scale_counter<0.5)canvas_scale_counter=0.5
    let svg=document.getElementById(getMySvg());
    let scale="transform:scale("+canvas_scale_counter+","+canvas_scale_counter+");"
    canvasAdjust("grid")
    mapUpdate({})
}

export function get_canvas_scale(){
    return canvas_scale_counter;
}

let shape_create=undefined;

let move_flag=false;
let move_enter={}
export function set_shape_create(sort){
    shape_create=sort;
    var body = document.querySelector("body")
    body.style.cursor= "move"
    let node=document.getElementById(getMySvg());
    node.onmouseenter=function (e) {
        if(shape_create!==undefined){
            // alert(1);
            P("create",{id:shape_create})
            move_enter['x']=e.offsetX;
            move_enter['y']=e.offsetY;
            move_flag=true;
            cancel_shape_create()
        }
        // P("create",{id:shape_create})
    }
}


export function set_move_center(){
    if(move_flag){
        move_flag=false;
        return {x:move_enter['x'],y:move_enter['y']};
    }
    let node=document.getElementById("main_canvas");
    let scrollTop=node.scrollTop;
    let scrollLeft=node.scrollLeft;
    let width=node.clientWidth;
    let height=node.clientHeight;
    // console.log(scrollTop);
    // console.log(scrollLeft);
    // console.log(width)
    // console.log(height)
    return{x:scrollLeft+width/2,y:scrollTop+height/2};
}

export function cancel_shape_create(){
    shape_create=undefined;
    let node=document.getElementById(getMySvg());
    node.onmouseenter=null;
}

export function setSvgScaleNum(command){
    canvas_scale_counter=command
    let svg=document.getElementById(getMySvg());
    let scale="transform:scale("+canvas_scale_counter+","+canvas_scale_counter+");"
    canvasAdjust("grid")
    mapUpdate({})

}