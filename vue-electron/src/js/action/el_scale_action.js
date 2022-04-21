import {Base_action} from "@/js/action/base_action";
import {SocketItem} from "@/js/socket/socketItem";
import {DomOperator} from "@/js/dom/domOperation";
import {getCoreById} from "@/js/element/elementQueue_new";

export class El_scale_action extends Base_action{
    constructor(type,cid,id,transX,transY) {
        super(type);
        this.cid=cid;
        this.id=id;
        this.transX=transX;
        this.transY=transY;
    }
    working(msg){
        // scale_el(msg)
    }
    forward() {
        // super.forward();
        scale_el(this.cid,this.id,this.transX,this.transY);
    }
    backward() {
        // super.backward();
        scale_el(this.cid,this.id,-this.transX,-this.transY);
    }
}

export function scale_el(msg) {
    // console.log(svg_id);
    // let socket=new SocketItem();
    // socket.setMsgTo({type:"scale",core_id:core_id,svg_id:svg_id,move_x:move_x,move_y:move_y})
    // socket.sendTo();
    // //test部分：只测矩形的最一个点
    // let position=[];
    // let dom_change={};
    // // console.log(svg_id);
    // let item=document.getElementById(svg_id);
    // let x=parseInt(item.getAttribute("x"));
    // let y=parseInt(item.getAttribute("y"));
    // let width=parseInt(item.getAttribute("width"));
    // let height=parseInt(item.getAttribute("height"));
    // position[0]={cx:x,cy:y}
    // position[1]={cx:x+width,cy:y}
    // position[2]={cx:x+width,cy:y+height}
    // position[3]={cx:x,cy:y+height}
    // x=x+move_x;
    // y=y+move_y;
    // width=width-move_x;
    // height=height-move_y;
    // position[0].cx=x;position[0].cy=y;
    // position[1].cy=y;
    // position[3].cx=x;
    //
    // dom_change['x']=x;
    // dom_change['y']=y;
    // dom_change['width']=width;
    // dom_change['height']=height;

    //测试结束
    console.log(msg);
    let svg_id=msg['svg_id'];
    let dom_change=msg['dom_change'];
    let domOperator=new DomOperator();
    domOperator.setAttrById(svg_id,dom_change);

    if(!getCoreById(svg_id))return;
    for (let i=0;i<msg['X'].length;i++){
        let core=svg_id+"_"+i;
        let position={cx:msg['X'][i],cy:msg['Y'][i]}
        domOperator.setAttrById(core,position);
    }
}


export function create_Scale_Action(core_id,svg_id,move_x,move_y){
    let socket=new SocketItem();
    socket.setMsgTo({type:"scale",core_id:core_id,svg_id:svg_id,move_x:move_x,move_y:move_y})
    socket.sendTo();
}