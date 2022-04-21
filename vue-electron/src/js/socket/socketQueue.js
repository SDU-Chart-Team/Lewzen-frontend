import {DomOperator} from "@/js/dom/domOperation";
import {createElementByTag} from "@/js/element/createElement";
import {El_create_action} from "@/js/action/el_create_action";
import {El_core_action} from "@/js/action/el_core_action";
import {El_move_action} from "@/js/action/el_move_action";
import {El_scale_action} from "@/js/action/el_scale_action";

let socketQueue={}

export function socketPush(socket_return){
    let type=socket_return["type"];
    let domOperator=new DomOperator();
    if(socket_return["dom_change"]!==undefined)
        domOperator.changeAttrs(socket_return["dom_change"])

    if(type==="create"){
        createAction(socket_return);
    }else if(type==="core"){
        coreAction(socket_return);
    }else if(type==="move"){
        moveAction(socket_return);
    }else if(type==='scale'){
        scaleAction(socket_return);
    }
}


function createAction(msg) {
    let el_create_action=new El_create_action("create");
    el_create_action.working(msg);
}

function coreAction(msg) {
    // console.log(msg);
    let el_core_action=new El_core_action("core");
    el_core_action.working(msg);
}

function moveAction(msg) {
    let el_move_action=new El_move_action("move");
    el_move_action.working(msg);
    // console.log("___________________")
    // console.log(msg);
}

function scaleAction(msg){
    let el_scale_action=new El_scale_action("scale");
    el_scale_action.working(msg);
}