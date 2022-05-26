import {createElementByTag} from "@/js/util/createSvgOperation";
import {DomOperator} from "@/js/util/domOperation";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {cssParser} from "@/js/util/cssParser";
import {
    getCoreList,
    moveUpdateStyle,
    offCoreByGid,
    offCoreBySvgId,
    OnInElement,
    pushElementInQueue,
    updateCoreMap
} from "@/js/element/core/core_queue";
import {create_core_Before} from "@/js/action/core_action";
import {P} from "@/js/action/actionQueue";
import {updateArrange} from "@/js/canvas/operation/canvas_arrange_operation";
import el from "element-ui/src/locale/lang/el";
import {createText} from "@/js/element/text/text_element";
import {clearMoveState, initMoveState} from "@/js/action/ComponentBasics/moveAction";
import {getAncestor, getAncestorAll} from "@/js/element/module/module_tree";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {anchor_update} from "@/js/element/anchor/anchor_queue";
import {canvas_update, guideSet} from "@/js/canvas/base_canvas";
import {updateStyleAfterChange} from "@/js/element/anchor/arrow_Queue";
import {get_rect_move_flag} from "@/js/element/last/last_map_operation";

export class Module_element {
    constructor(msg,flag) {
        this.g_id=msg["id"];
        //state记录
        this.isCore=false;//是否在核心状态
        this.isHover=false;//是否在hover状态
        this.isDelete=false;//是否已被删除
        this.show=msg['show']//是否为group rect group为false
        this.state=null;
        this.move=false;
        this.isLine=msg['is_line']
        console.log(this.isLine);
        this.rotate_x=0;
        this.rotate_y=0;
        this.center_x=0;
        this.center_y=0;
        //初始化操作
        // console.log(this.show);
        if(flag){
            this.setElementMouseClick();
            this.setElementMouseDown();
            this.setElementHover();
            this.setText();
        }
        // this.create(msg);
        this.theta=0;

    }
    setElementHover(){
        if(this.move)return;
        if(this.isLine)return;
        let node=document.getElementById(this.g_id);
        let that=this;
        let children=node.childNodes;
        for(let i=0;i<children.length;i++){
            node.onmouseenter=function (e) {
                // console.log(get_rect_move_flag());
                if(get_rect_move_flag()){
                    return;
                }
                if(!that.isCore){
                    canvas_update("connect",that.g_id,{type:"create"})
                }
                // anchor_update(that.g_id,"block");
            }
            node.onmouseleave=function (e) {
                // anchor_update(that.g_id,"none");
                canvas_update("connect",that.g_id,{type:"delete"})
            }
        }
    }
    setState(state){
        this.state=state;
    }

    create(msg){
        let parser=new DOMParser();

        let item=parser.parseFromString(msg['svg'],'image/svg+xml')

        let node=item.getElementById(msg["svg_id"]);

        let g_el=createElementByTag("g",this.g_id);

        let domOperator=new DomOperator();
        domOperator.appendChildByDom(g_el,node);

        let canvas=document.getElementById(getShapeMapId());
        domOperator.appendChildByDom(canvas,g_el);

    }

    delete(){
        this.isDelete=true;
        let node=document.getElementById(this.svg_id);
        let parser=new cssParser();
        parser.parseStyle(node.getAttribute("style"));
        parser.updateStyle({display:"none"})
        node.setAttribute("style",parser.get())
    }

    recreate(){
        this.isDelete=false;
        this.isDelete=true;
        let node=document.getElementById(this.svg_id);
        let parser=new cssParser();
        parser.parseStyle(node.getAttribute("style"));
        parser.updateStyle({display:"block"})
        node.setAttribute("style",parser.get())
    }

    setCore(){
        this.isCore=true;

        canvas_update("connect",this.g_id,{type:"delete"})
        // anchor_update(this.g_id,"modeloff")
        // anchor_update(this.g_id,"none")
    }

    setCoreOff(){
        this.isCore=false;
        // anchor_update(this.g_id,"modelon")
    }

    setElementMouseClick(){
        let that=this;
        let element=document.getElementById(this.g_id);
        // for(let i=0;i<element.childNodes.length;i++){
        //     let node=element.childNodes[i];
        //     node.onclick=function(){
        //         if(that.move){
        //             that.move=false;
        //         }else if(that.isCore===false) {
        //             let ancestor=undefined;
        //             let ancestorList=getAncestorAll(that.g_id);
        //             for(let i=0;i<ancestorList.length;i++) {
        //                 let el = getModuleByGid(ancestorList[i])
        //                 if(el.isCore){
        //                     i++;
        //                     while(i<ancestorList.length){
        //                         el=getModuleByGid(ancestorList[i])
        //                         if(!el.show)ancestor=el.g_id;
        //                         break;
        //                     }
        //                     if (ancestor===undefined){
        //                         ancestor=that.g_id;
        //                     }
        //                     pushElementInQueue([ancestor]);
        //                     return;
        //                 }
        //             }
        //             for(let i=0;i<ancestorList.length;i++){
        //                 let el = getModuleByGid(ancestorList[i])
        //                 if(!el.show)ancestor=el.g_id;
        //                 break;
        //             }
        //             if (ancestor===undefined){
        //                 ancestor=that.g_id;
        //             }
        //             // console.log(ancestor);
        //             pushElementInQueue([ancestor]);
        //             // P("cursor",{id:that.g_id})
        //             // create_core_Before(that.g_id);
        //         }else{
        //             offCoreByGid(that.g_id);
        //             // updateArrange();
        //         }
        //     }
        // }

    }


    setElementMouseDown(){
        let that=this;
        let element=document.getElementById(this.g_id);
        for(let i=0;i<element.childNodes.length;i++){
            let node=element.childNodes[i];
            node.onmousedown=function(e){
                let flag=false;
                let ancestorList=getAncestorAll(that.g_id);
                for(let i=0;i<ancestorList.length;i++) {
                    let el = getModuleByGid(ancestorList[i])
                    if(el.isCore){
                        flag=true;
                        break;
                    }
                }
                if(!flag){
                    pushElementInQueue([that.g_id]);
                }
                if(flag||that.isCore){
                    clearMoveState();
                    let msg={}
                    let bbox=document.getElementById(that.g_id).getBBox();
                    initMoveState({start_x:bbox.x,start_y:bbox.y});
                    let startX=e.offsetX;
                    let startY=e.offsetY;
                    let nowX=startX;
                    let nowY=startY;
                    // let svg=document.getElementById(getMySvg());
                    document.onmousemove=function (e) {
                        that.move=true;
                        // anchor_update(that.g_id,"none")
                        canvas_update("connect",this.g_id,{type:"delete"})

                        moveUpdateStyle()
                        let newX=e.offsetX;
                        let newY=e.offsetY;
                        let transX=newX-nowX;
                        // console.log(e.offsetX,e.offsetY,e.target);
                        // console.log(e.target.id);
                        let transY=newY-nowY;
                        nowX=newX;
                        nowY=newY;
                        let msg={g_id:that.g_id,move_x:transX,move_y:transY}
                        P("move",msg)
                        // create_Move_Action(that.g_id,transX,transY);
                    }
                    document.onmouseup=function (e) {
                        updateCoreMap();
                        updateStyleAfterChange()
                        // anchor_update(that.g_id,"block")
                        guideSet(that.g_id,false)
                        let coreList=getCoreList();
                        let ancestorList=getAncestorAll(that.g_id);
                        ancestorList.reverse();
                        for(let i=0;i<ancestorList.length;i++) {
                            let el = getModuleByGid(ancestorList[i])
                            if(!el.show){
                                P("cursors",{ids:[el.g_id]})
                                P("cover_children",{})
                            }
                        }
                        P("cursors",{ids:coreList})
                        document.onmousemove=null;
                        document.onmouseup=null;
                    }
                }
            }
        }
    }

    setText() {
        // createText(this.g_id,this.svg_id);
    }
}