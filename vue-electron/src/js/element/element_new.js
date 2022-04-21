import {pushQueue} from "@/js/actionQueue";
import {appendDom, elementScale} from "@/js/svg";
import {createElementByTag} from "@/js/element/createElement";
import {SocketItem} from "@/js/socket/socketItem";
import {DomOperator} from "@/js/dom/domOperation";
import {CorePoint} from "@/js/core/corePoint";
import {El_scale_action} from "@/js/action/el_scale_action";
import {addAction} from "@/js/action/actionQueue";
import {HoverPoint} from "@/js/hover/hoverPoint";
import {appendElement, OnInElement} from "@/js/element/elementQueue_new";
import {create_core_Before} from "@/js/action/el_core_action";
import {create_Move_Action, El_move_action} from "@/js/action/el_move_action";

let idCnt=0;
export class Element_SVG {
    constructor(msg) {

        this.g_id=msg["g_id"];
        // this.shape_id=shape_id;
        this.svg_id=msg['svg_id'];
        this.isCore=false;
        this.CoreList=[];
        this.HoverList=[];
        this.g_Dom=this.createSvg(msg);
        this.isHover=false;

        //事件定义
        this.setElementMouseClick();
        this.setElementMouseDown();
        this.setElementMouseEnterAndLeave();

    }
    createSvg(msg) {
        let parser=new DOMParser();
        // msg["svg"]="<svg  xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n" +
        //     "  <rect id='7' x=\"100\" y=\"100\" width=\"300\" height=\"100\"\n" +
        //     "  style=\"fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)\"/>\n" +
        //     "</svg> "
        // msg["svg_id"]=7;
        let item=parser.parseFromString(msg["svg"],"image/svg+xml")
        // console.log(item);
        // console.log(item.getElementById(svgId));
        // let element=item.getElementById(svgId);
        let node=item.getElementById(msg["svg_id"]);
        // console.log(node);
        // let g_el_id="shape_"+idCnt;
        let g_el=createElementByTag("g",this.g_id);
        // g_el=g_el.getElementById(g_el_id);
        // console.log(g_el);
        // let g_el=document.getElementById(g_el_id);
        let domOperator=new DomOperator();
        domOperator.appendChildByDom(g_el,node);
        let canvas=document.getElementById("mySvg");
        domOperator.appendChildByDom(canvas,g_el);
    }
    // get_gDom(){
    //     return this.g_Dom;
    // }

    setElementMouseClick(){
        let that=this;
        let node=document.getElementById(this.svg_id);
        // console.log(node);
        node.onclick=function(){
            // console.log(1);
            OnInElement();
            create_core_Before(that.g_id);
        };
    }

    setElementMouseDown(){
        let that=this;
        let node=document.getElementById(this.svg_id);
        node.onmousedown=function(e){
            // console.log(that.getCore(element.svg_id));
            let item = document.getElementById(that.svg_id);
            let x = parseInt(item.getAttribute("x"));
            let y = parseInt(item.getAttribute("y"));
            if(that.isCore){
                // console.log(1);
                let startX=e.offsetX;
                let startY=e.offsetY;
                let nowX=e.offsetX;
                let nowY=e.offsetY;
                document.onmousemove=function (e) {
                    let newX=e.offsetX;
                    let newY=e.offsetY;
                    let transX=newX-nowX;
                    let transY=newY-nowY;
                    // console.log(transX,transY);
                    nowX=newX;
                    nowY=newY

                    create_Move_Action(that.g_id,transX,transY);
                    // move_el(element.svg_id,transX,transY,x,y);

                    // elementMove(svgId,transX,transY);
                }
                document.onmouseup=function (e) {
                    let endX=e.offsetX;
                    let endY=e.offsetY;
                    let action=new El_move_action('move',that.svg_id,endX-startX,endY-startY,x,y);
                    addAction(action);
                    document.onmousemove=null;
                    document.onmouseup=null;
                }
            }
        }

        node.onmouseenter=function (e) {
            that.InHoverModel();
            // console.log(element.isHover);
            if(!that.isHover)return;
            // that.setHoverMouseDownAll(element);

        }
        node.onmouseleave=function (e) {
            that.OffHoverModel();
        }
    }

    setElementMouseEnterAndLeave(){
        let that=this;
        let node=document.getElementById(this.svg_id);
        node.onmouseenter=function (e) {
            that.InHoverModel();
            // console.log(element.isHover);
            if(!that.isHover)return;
            // that.setHoverMouseDownAll(element);

        }
        node.onmouseleave=function (e) {
            that.OffHoverModel();
        }
    }

    //setCore
    InCoreModel(msg){
        if(this.isCore===true)return;
        if(this.isHover)this.OffHoverModel();
        this.isCore=true;
        // let socket=new SocketItem();
        // socket.clearMsg();
        // socket.setMsgTo({type:'core',svg_id:this.svg_id})
        // socket.sendTo();
        //******test
        // let position1=[]
        // let item=document.getElementById(this.svg_id);
        // let x=parseInt(item.getAttribute("x"));
        // let y=parseInt(item.getAttribute("y"));
        // let width=parseInt(item.getAttribute("width"));
        // let height=parseInt(item.getAttribute("height"));
        // position1.push({x:x,y:y},{x:x+width,y:y},{x:x+width,y:y+height},{x:x,y:y+height});
        // socket.msgBack['position']=position1;
        // //*********
        // let position=socket.msgBack['position']

        // console.log(111);
        let position=msg['position'];
        // console.log(position);

        for(var i=0;i<position['X'].length;i++){
            // console.log(1);
            let core_id=this.svg_id+"_"+i;
            let core=new CorePoint(this.g_id,this.svg_id,i,core_id,position['X'][i],position['Y'][i]);
            let domOperator=new DomOperator();
            // console.log(core.dom);
            domOperator.appendChildById(this.g_id,core.dom);
            this.CoreList.push(core);
        }
        for(var i=0;i<this.CoreList.length;i++){
            this.CoreList[i].setCoreMouseDown();
        }
    }
    //removeCore
    OffCoreModel(){
        if(this.isCore===false)return;
        let domOperator=new DomOperator();
        this.isCore=false;
        for(var i=0;i<this.CoreList.length;i++){
            domOperator.removeChildById(this.g_id,this.CoreList[i].core_id);
        }
        this.CoreList=[];

    }

    InHoverModel(){
        this.getLength();
        if(this.isHover)return;
        if(this.isCore)return;
        this.isHover=true;


        let position=[]
        let item=document.getElementById(this.svg_id);
        let x=parseInt(item.getAttribute("x"));
        let y=parseInt(item.getAttribute("y"));
        let width=parseInt(item.getAttribute("width"));
        let height=parseInt(item.getAttribute("height"));
        position.push({cx:x,cy:y},{cx:x+width,cy:y},{cx:x+width,cy:y+height},{cx:x,cy:y+height})
        position.push({cx:x+width/2,cy:y},{cx:x+width,cy:y+height/2},{cx:x+width/2,cy:y+height},{cx:x,cy:y+height/2})
        //****test end

        if(this.HoverList.length!==0){
            let domOperator=new DomOperator();
            for(var i=0;i<this.HoverList.length;i++){
                let hover_id=this.svg_id+"$"+i;
                domOperator.setAttrById(hover_id,position[i]);
                document.getElementById(this.HoverList[i].hover_id).style.display="block";
            }
            return;
        }
        //****test


        for(var i=0;i<position.length;i++){
            let hover_id=this.svg_id+"$"+i;
            let hover=new HoverPoint(this.g_id,this.svg_id,hover_id,position[i]['cx'],position[i]['cy']);
            let domOperator=new DomOperator();
            domOperator.appendChildById(this.g_id,hover.dom);
            this.HoverList.push(hover);
        }
        for(var i=0;i<this.HoverList.length;i++){
            this.HoverList[i].setHoverMouseDown();
        }
    }

    OffHoverModel(){
        if(!this.isHover)return;
        // console.log(1111);
        let domOperator=new DomOperator();
        this.isHover=false;
        for(var i=0;i<this.HoverList.length;i++){
            document.getElementById(this.HoverList[i].hover_id).style.display="none";
            // domOperator.removeChildById(this.g_id,this.HoverList[i].hover_id)
        }
        // this.HoverList=[];

    }

    getLength(){
        let node=document.getElementById(this.svg_id);
        console.log(node.getTotalLength());
    }

}