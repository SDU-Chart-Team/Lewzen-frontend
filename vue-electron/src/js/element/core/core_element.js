import {DomOperator} from "@/js/util/domOperation";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getHoverMapId, getKeyMapId, getLastMapId, getMySvg} from "@/js/util/getCanvasIdOperation";
import en from "element-ui/src/locale/lang/en";
import {getModuleByGid, getModuleBySid} from "@/js/element/module/module_queue";
import {P, updateState} from "@/js/action/actionQueue";
import {clearScaleState} from "@/js/action/ComponentBasics/movePAction";
import {getCoreList, moveUpdateStyle, updateCoreMap} from "@/js/element/core/core_queue";
import {getAncestorAll, setTreeSonCenter, setTreeSonTheta} from "@/js/element/module/module_tree";
import {anchor_update} from "@/js/element/anchor/anchor_queue";
import {getHoverPosition} from "@/svgParser/hoverProcessor";
import {cssParser} from "@/js/util/cssParser";
import {canvas_update} from "@/js/canvas/base_canvas";
import {updateStyleAfterChange} from "@/js/element/anchor/arrow_Queue";
let style_core="fill:#29B6F2"

export class Core_element {
    constructor(points) {
        this.points=points;
        this.g_id=points[0]['comp_id'];
        // this.X=msg['position']['X']
        // this.Y=msg['position']['Y']
        // this.svg_id=msg['svg_id']
        this.coreList=[];
        this.create();
        this.show=true;
    }
    create(){
        // console.log(this.points[0]['comp_id']);
        let element=getModuleByGid(this.g_id);
        element.setCore();
        let points=this.points;
        let domOperator=new DomOperator();
        let canvas_id=getKeyMapId();

        let canvas=document.getElementById(canvas_id);
        for(let i=0;i<points.length;i++){
            let core_id=points[i].comp_id+"_"+points[i].id;
            let x=points[i].x;
            let that=this;
            let y=points[i].y;
            let node=createElementByTag("circle",core_id);
            domOperator.setAttrByDom(node,{
                cx:x,cy:y,r:5,style:style_core
            })
            domOperator.appendChildByDom(canvas,node);

            if(points[i].id==="RT"){

                let node=createElementByTag("svg",points[i].comp_id+"rotate");
                node.setAttribute("viewBox","0 0 1024 1024")
                node.setAttribute("xmlns","http://www.w3.org/2000/svg")
                node.setAttribute("width","15")
                node.setAttribute("height","15")
                let path=createElementByTag("path")
                path.setAttribute("d","M935.497143 659.017143a36.937143 36.937143 0 0 1-1.755429 18.505143 434.322286 434.322286 0 0 1-370.980571 337.773714C325.632 1045.650286 107.373714 876.251429 77.531429 637.293714a435.712 435.712 0 0 1 378.587428-487.131428c5.778286-1.243429 13.385143-1.901714 19.748572-1.974857-2.633143-24.137143-5.851429-46.518857-7.899429-66.267429-3.291429-25.526857-6.582857-44.617143-6.582857-50.980571-1.974857-7.021714-1.389714-15.36 3.657143-21.065143a21.796571 21.796571 0 0 1 31.305143-4.608l0.585142 1.243428 17.993143 16.530286 126.683429 98.962286 17.92 13.312 15.36 11.410285c5.12 3.803429 7.68 8.850286 8.996571 14.628572a20.260571 20.260571 0 0 1-4.388571 16.603428l-11.410286 15.36-13.312 17.92L555.885714 337.92l-14.555428 18.578286-1.243429 0.658285a23.625143 23.625143 0 0 1-31.890286 3.291429c-5.778286-5.12-9.654857-12.726857-8.411428-19.748571-1.316571-5.705143-3.291429-25.453714-6.582857-50.980572-2.633143-17.846857-5.266286-38.838857-7.899429-59.904-6.436571 0-13.385143 1.974857-19.748571 1.974857-193.828571 24.502857-332.726857 201.801143-308.297143 395.556572 24.502857 193.828571 201.801143 332.726857 395.556571 308.224a353.426286 353.426286 0 0 0 303.616-281.307429 40.082286 40.082286 0 0 1 34.377143-30.134857c22.235429-3.291429 43.373714 13.165714 44.763429 34.889143z")
                path.setAttribute("fill","#1188EE")
                node.append(path)
                let canvas=document.getElementById(getHoverMapId());
                if(element.center_y===undefined){

                    node.setAttribute("x",points[i].x+10);
                    node.setAttribute("y",points[i].y-10);

                    let x=points[i].x+10;
                    let y=points[i].y-10;
                }else{
                    let theta_tmp=that.getTheta(points[i].x,points[i].y,element.center_x,element.center_y);
                    node.setAttribute("x",points[i].x+10*Math.cos(theta_tmp));
                    node.setAttribute("y",points[i].y-10*Math.sin(theta_tmp));
                    let x=points[i].x+10*Math.cos(theta_tmp);
                    let y=points[i].y-10*Math.sin(theta_tmp);
                }
                node.setAttribute("r",5);
                node.onmousedown=function(e){
                    let start_x=e.offsetX;
                    let start_y=e.offsetY;
                    let svg=document.getElementById(getMySvg());
                    that.rotate_core_none();
                    canvas_update("connect",that.g_id,{type:"flag",flag:false})
                    svg.onmousemove=function(e){
                        let end_x=e.offsetX;
                        let end_y=e.offsetY;
                        let center_x=element.center_x;
                        let center_y=element.center_y;
                        let theta1=that.getTheta(start_x,start_y,center_x,center_y)
                        let theta2=that.getTheta(end_x,end_y,center_x,center_y);
                        let theta=element.theta+theta2-theta1;
                        let len=Math.sqrt((center_x-x)*(center_x-x)+(center_y-y)*(center_y-y));
                        console.log(len)
                        // console.log(theta2);
                        updateState({theta:theta})
                        P("set_theta",{theta:theta})
                        node.setAttribute("x",center_x+Math.cos(theta2)*len);
                        node.setAttribute("y",center_y+Math.sin(theta2)*len);
                        node.setAttribute("style","opacity:0")
                        that.updateRotate(theta)
                        start_x=end_x
                        start_y=end_y
                    }
                    svg.onmouseup=function(e){
                        // that.rotate_core_block();
                        // setTreeSonCenter(that.g_id)

                        canvas_update("connect",that.g_id,{type:"flag",flag:true})
                        P("cursors",getCoreList());
                        P("get_center",{})
                        updateStyleAfterChange()
                        svg.onmousemove=null;
                        svg.onmouseup=null;

                    }
                }
                canvas.appendChild(node);
            }
        }
        this.setCoreMouseDown();
        // this.update_rotate_center();
    }

    update(points){
        if(!this.show){
            this.deleteMoveLinear();
        }
        this.show=true;
        this.delete();
        this.points=points;
        this.create();
        // this.update_rotate_center();

    }

    delete() {
        let domOperator = new DomOperator();
        let canvas_id = getKeyMapId();
        let canvas = document.getElementById(canvas_id);
        let length = this.points.length;
        for (var i = 0; i < length; i++) {
            let core_id = this.points[i].comp_id + "_" + this.points[i].id;
            domOperator.removeChildById(canvas_id, core_id);
        }
        let node = document.getElementById(this.g_id+ "rotate")
        let canvas_hover = document.getElementById(getHoverMapId());
        if(node!==null) canvas_hover.removeChild(node);
    }

    setCoreMouseDown(){
        let points=this.points;
        let that=this;
        for(var i=0;i<this.points.length;i++){
            let core_id=this.points[i].comp_id+"_"+this.points[i].id;
            let id=this.points[i].id;
            let that=this;
            let node=document.getElementById(core_id);
            node.onmousedown=function (e) {
                let startX=e.offsetX;
                let startY=e.offsetY;
                let nowX=e.offsetX;
                let nowY=e.offsetY;
                clearScaleState();
                document.onmousemove=function (e) {
                    that.movePUpdateStyle(core_id);
                    let newX=e.offsetX;
                    let newY=e.offsetY;
                    let transX=newX-nowX;
                    let transY=newY-nowY;
                    nowX=newX;
                    nowY=newY;
                    let msg={core_id:id,g_id:that.g_id,move_x:transX,move_y:transY}
                    P("move_point",msg)
                    // create_Scale_Action(core_num,that.g_id,transX,transY)
                    // anchor_update(that.g_id,"none")
                }
                document.onmouseup=function (e) {
                    updateStyleAfterChange();
                    updateCoreMap();
                    // anchor_update(that.g_id,"block")
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

    movePUpdateStyle(core_id){

        for(let i=0;i<this.points.length;i++){
            let id=this.points[i]['comp_id']+"_"+this.points[i]['id'];
            if(id===core_id){
                continue;
            }
            let node=document.getElementById(id);
            node.setAttribute("style","display:none")
        }
        let node=document.getElementById(this.g_id+"rotate")
        if(node!==null) node.setAttribute("style","display:none")
    }

    updateMovePStyle(core_id,move_x,move_y){
        for(let i=0;i<this.points.length;i++){
            let id=this.points[i]['comp_id']+"_"+this.points[i]['id'];
            if(id===this.g_id+"_"+core_id){
                let node=document.getElementById(id);
                let cx=parseInt(node.getAttribute("cx"))+move_x;
                let cy=parseInt(node.getAttribute("cy"))+move_y
                node.setAttribute("cx",cx);
                node.setAttribute("cy",cy);
            }
        }
    }

    moveModel(){
        if(!this.show){
            this.updateMoveLinear();
            return;
        }
        this.show=false;
        let domOperator=new DomOperator();
        let length=this.points.length;
        for(var i=0;i<length;i++){
            let core_id=this.points[i].comp_id+"_"+this.points[i].id;
            let node=document.getElementById(core_id);
            node.setAttribute("style","display:none");
        }
        let node=document.getElementById(this.g_id+"rotate")
        if(node!==null) {
            console.log(node)
            node.setAttribute("style","display:none")
        }
        this.setMoveLinear();
    }

    setMoveLinear(){
        let g_id=this.g_id;
        let node=document.getElementById(g_id);
        let childNodes=node.childNodes;
        let states=[];
        for(let i=0;i<childNodes.length;i++){
            states[i]={}
            states[i]['stroke_width']=childNodes[i].getAttribute("stroke_width")
            states[i]['stroke']=childNodes[i].getAttribute("stroke")
            states[i]['stroke_dasharray']=childNodes[i].getAttribute("stroke_dasharray")
            childNodes[i].setAttribute("stroke-width",2);
            childNodes[i].setAttribute("stroke","blue");
            childNodes[i].setAttribute("stroke-dasharray",'3,3')
        }
        this.states=states;
        // let bbox=node.getBBox();
        // let path=createElementByTag("polyline",this.g_id+"_linear");
        // let points="";
        // for(let i=0;i<this.points.length;i++){
        //     points+=this.points[i].x+","+this.points[i].y+" ";
        // }
        // points+=this.points[0].x+","+this.points[0].y+" ";
        // points+=(bbox.x)+","+(bbox.y)+" ";
        // points+=(bbox.x+bbox.width)+","+(bbox.y)+" ";
        // points+=(bbox.x+bbox.width)+","+(bbox.y+bbox.height)+" ";
        // points+=(bbox.x)+","+(bbox.y+bbox.height)+" ";
        // points+=(bbox.x)+","+(bbox.y)+" ";
        // path.setAttribute("points",points);
        // path.setAttribute("stroke-width",2);
        // path.setAttribute("stroke","blue");
        // path.setAttribute("opacity",1);
        // path.setAttribute("stroke-dasharray",'3,3')
        // let domOperator=new DomOperator();
        // let canvas_id=getKeyMapId();
        // let canvas=document.getElementById(canvas_id);
        // canvas.append(path);
    }

    updateMoveLinear(){
        // let g_id=this.g_id;
        // let points="";
        // let node=document.getElementById(g_id);
        // let bbox=node.getBBox();
        // let path=document.getElementById(this.g_id+"_linear");
        // points+=(bbox.x)+","+(bbox.y)+" ";
        // points+=(bbox.x+bbox.width)+","+(bbox.y)+" ";
        // points+=(bbox.x+bbox.width)+","+(bbox.y+bbox.height)+" ";
        // points+=(bbox.x)+","+(bbox.y+bbox.height)+" ";
        // points+=(bbox.x)+","+(bbox.y)+" ";
        // path.setAttribute("points",points);
    }

    deleteMoveLinear(){
        let g_id=this.g_id;
        let node=document.getElementById(g_id);
        let childNodes=node.childNodes;
        let states=this.states;
        for(let i=0;i<childNodes.length;i++){
            childNodes[i].setAttribute("stroke-width",states[i]['stroke_width']);
            childNodes[i].setAttribute("stroke",states[i]['stroke']);
            childNodes[i].setAttribute("stroke-dasharray",states[i]['stroke-dasharray'])
        }
        this.states=[];
    }


    update_rotate_center(){
        let points=this.points;
        let rotate_x=0;
        let rotate_y=0;
        for(let i=0;i<points.length;i++){
            let x=points[i].x;
            let y=points[i].y;
            rotate_x+=x;
            rotate_y+=y;
        }
        rotate_x/=this.points.length;
        rotate_y/=this.points.length;
        let module=getModuleByGid(this.g_id);
        module.rotate_x=rotate_x;
        module.rotate_y=rotate_y;
    }

    vectorAngle(x,y){
        let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
        let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
        return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
    }


    getTheta(x,y,center_x,center_y){
        let theta=Math.atan((y-center_y)/(x-center_x));
        // console.log(theta)
        if(x<center_x){
            theta+=Math.PI;
        }
        return theta
    }


    rotate_core_none(){
        let length=this.points.length;
        for(var i=0;i<length;i++){
            let core_id=this.points[i].comp_id+"_"+this.points[i].id;
            let node=document.getElementById(core_id);
            node.setAttribute("style","display:none");
        }
    }

    rotate_core_block(){
        let length=this.points.length;
        for(var i=0;i<length;i++){
            let core_id=this.points[i].comp_id+"_"+this.points[i].id;
            let node=document.getElementById(core_id);
            node.setAttribute("style","display:block");
        }
    }

    updateRotate(theta){
        let length=this.points.length;
        for(var i=0;i<length;i++){
            let x=this.points[i].x;
            let y=this.points[i].y;

        }
    }
}