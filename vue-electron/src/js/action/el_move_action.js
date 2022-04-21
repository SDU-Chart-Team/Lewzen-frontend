import {Base_action} from "@/js/action/base_action";
import {SocketItem} from "@/js/socket/socketItem";
import {DomOperator} from "@/js/dom/domOperation";
import {getCanvasShape} from "@/js/canvasAction/canvasAction";
import {canvas_after_move, canvas_extend} from "@/js/canvasAction/canvasOperator";
import {getCoreById} from "@/js/element/elementQueue_new";

export class El_move_action extends Base_action{
    constructor(type,svg_id,transX,transY,startX,startY) {
        super(type);
        this.svg_id=svg_id;
        this.transX=transX;
        this.transY=transY;
        this.startX=startX;
        this.startY=startY;
    }

    working(msg){
        console.log(msg);
        // move_el(msg);
        // move_el(msg);
    }

    forward() {
        move_el(msg);
    }
    backward() {
        move_el(this.svg_id,-this.transX,-this.transY,this.transX+this.startX,this.transY+this.startX);
    }
}

function isOutPosition(position) {
    let attrs=getCanvasShape();
    let height=attrs['height'];
    let width=attrs['width'];
    // console.log(height,width);
    let top=false,bottom=false,left=false,right=false;
    for(var i=0;i<position.length;i++){
        var x=position[i]['cx'];
        var y=position[i]['cy'];
        // console.log(x,y)
        if(x<=0)left=true;
        if(y<=0)top=true;
        if(x>=width)right=true;
        if(y>=height)bottom=true;
    }
    return{
        top:top,
        bottom:bottom,
        left:left,
        right:right
    }
}


export function move_el(msg) {
    let domOperator = new DomOperator();
    // let socket = new SocketItem();
    // socket.setMsgTo({type: 'move', svg_id: svg_id, move_x: move_x, move_y})
    // socket.sendTo();
    //*****测试
    // let item = document.getElementById(svg_id);
    // // let x = parseInt(item.getAttribute("x"));
    // // let y = parseInt(item.getAttribute("y"));
    // let x=start_x;
    // let y=start_y;
    // let width = parseInt(item.getAttribute("width"));
    // let height = parseInt(item.getAttribute("height"));
    // x = x + move_x;
    // y = y + move_y;
    // let position=[];
    // let dom_change={};
    // position[0] = {cx: x, cy: y}
    // position[1] = {cx: x + width, cy: y}
    // position[2] = {cx: x + width, cy: y + height}
    // position[3] = {cx: x, cy: y + height}
    //
    // dom_change['x'] = x;
    // dom_change['y'] = y;
    // dom_change['width'] = width;
    // dom_change['height'] = height;
    // socket.msgBack["dom_change"] = dom_change;
    // socket.msgBack["position"] = position;
    //*****测试结束

    // let check=isOutPosition(socket.msgBack["position"])

    // if(check['top']) {
    //     console.log('top');
    // }
    // if(check['bottom']){
    //     console.log('bottom')
    // }
    // if(check['left']){
    //     console.log('left')
    // }
    // if(check['right']){
    //     console.log('right')
    // }
    // canvas_extend(check)
    console.log(msg)
    let svg_id=msg['svg_id']
    // let trans=canvas_after_move(msg['dom_change']['x'],msg['dom_change']['y']);
    // // console.log(trans);
    // msg['dom_change']['x']+=trans['width'];
    // msg['dom_change']['y']+=trans['height'];
    let attr={x:msg["dom_change"]['x'],y:msg["dom_change"]['y']}
    domOperator.setAttrById(svg_id, attr);
    if(!getCoreById(svg_id))return;
    for(let i=0;i<msg['X'].length;i++){
        let core_id=svg_id+"_"+i;
        // msg['X'][i]+=trans['width'];
        // msg['Y'][i]+=trans['height'];
        let attrs={cx:msg['X'][i],cy:msg['Y'][i]}
        domOperator.setAttrById(core_id,attrs);
    }
}


export function create_Move_Action(g_id,move_x,move_y,start_x,start_y){
    let socket=new SocketItem();
    socket.setMsgTo({type:"move",g_id:parseInt(g_id),move_x:move_x,move_y:move_y,start_x:start_x,start_y:start_y})
    socket.sendTo();
}