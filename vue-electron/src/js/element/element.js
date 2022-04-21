// import {pushQueue} from "@/js/actionQueue";
// import {appendDom, elementScale} from "@/js/svg";
// import {createElementByTag} from "@/js/element/createElement";
// import {SocketItem} from "@/js/socket/socketItem";
// import {DomOperator} from "@/js/dom/domOperation";
// import {CorePoint} from "@/js/core/corePoint";
// import {El_scale_action} from "@/js/action/el_scale_action";
// import {addAction} from "@/js/action/actionQueue";
// import {HoverPoint} from "@/js/hover/hoverPoint";
//
// let idCnt=0;
// class Element_SVG {
//     constructor(shape_id) {
//         this.g_id=0;
//         this.shape_id=shape_id;
//         this.svg_id="";
//         this.isCore=false;
//         this.CoreList=[];
//         this.HoverList=[];
//         this.Dom=this.createSvg(shape_id);
//         this.isHover=false;
//         this.nowisHover=0;
//     }
//     setSvgID(svgId){
//         this.svg_id=svgId;
//     }
//
//     getElementByMsg(msg){
//         // let element=this.getElementByMsg(socketItem.getMsgBack());
//         let canvas=document.getElementById("mySvg");
//
//         let parser=new DOMParser();
//         msg["svg"]="<svg  xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n" +
//             "  <rect id='my' x=\"100\" y=\"100\" width=\"300\" height=\"100\"\n" +
//             "  style=\"fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)\"/>\n" +
//             "</svg> "
//         msg["svg_id"]="my";
//         //--------------
//         this.setSvgID(msg["svg_id"]);
//         // console.log(this.svg_id);
//         let item=parser.parseFromString(msg["svg"],"image/svg+xml");
//         // console.log(item.getElementById(svgId));
//         // let element=item.getElementById(svgId);
//         let element=item.getElementById(msg["svg_id"]);
//         let g_el=document.get(this.g_id);
//         let domOperator=new DomOperator();
//         domOperator.appendChildByDom(canvas,g_el);
//         domOperator.appendChildByDom(g_el,element);
//     }
//
//     createSvg(shape_id) {
//         let canvas=document.getElementById("mySvg");
//         /*
//         向后端发送socket，获取svg对象和svg对象的id
//          */
//         //测试用法
//         //需要用g进行包裹
//         // let g_el_id="shape_"+idCnt++;
//         let g_el_id="shape_10";
//         this.g_id=g_el_id;
//         let g_el=createElementByTag("g",g_el_id);
//         let socketItem=new SocketItem();
//         socketItem.setMsgTo({type:"create",shape_id:shape_id})
//         socketItem.sendTo();
//     }
//         // let element=this.getElementByMsg(socketItem.getMsgBack());
//
//         // let domOperator=new DomOperator();
//         // domOperator.appendChildByDom(canvas,g_el);
//         // domOperator.appendChildByDom(g_el,element);
//         // canvas.append(g_el);
//         // g_el.append(element);
//         // appendDom(svgId);
//         // //向动作队列中添加创建图形的action
//         // let action={
//         //     type:'create',
//         //     id:svgId
//         // }
//         // pushQueue(action);
//
//
//
//     //setCore
//     InCoreModel(){
//         if(this.isCore===true)return;
//         if(this.isHover)this.OffHoverModel();
//         this.isCore=true;
//         let socket=new SocketItem();
//         socket.clearMsg();
//         socket.setMsgTo({type:'core',svg_id:this.svg_id})
//         socket.sendTo();
//         //******test
//         let position1=[]
//         let item=document.getElementById(this.svg_id);
//         let x=parseInt(item.getAttribute("x"));
//         let y=parseInt(item.getAttribute("y"));
//         let width=parseInt(item.getAttribute("width"));
//         let height=parseInt(item.getAttribute("height"));
//         position1.push({x:x,y:y},{x:x+width,y:y},{x:x+width,y:y+height},{x:x,y:y+height});
//         socket.msgBack['position']=position1;
//         //*********
//         let position=socket.msgBack['position']
//
//         for(var i=0;i<position.length;i++){
//             let core_id=this.svg_id+"_"+i;
//             let core=new CorePoint(this.g_id,this.svg_id,core_id,position[i]['x'],position[i]['y']);
//             let domOperator=new DomOperator();
//             domOperator.appendChildById(this.g_id,core.dom);
//             this.CoreList.push(core);
//         }
//     }
//     //removeCore
//     OffCoreModel(){
//         if(this.isCore===false)return;
//         let domOperator=new DomOperator();
//         this.isCore=false;
//         for(var i=0;i<this.CoreList.length;i++){
//             domOperator.removeChildById(this.g_id,this.CoreList[i].core_id);
//         }
//         this.CoreList=[];
//
//     }
//
//     InHoverModel(){
//         if(this.isHover)return;
//         if(this.isCore)return;
//         this.isHover=true;
//         if(this.HoverList.length!==0){
//             for(var i=0;i<this.HoverList.length;i++){
//                 document.getElementById(this.HoverList[i].hover_id).style.display="block";
//             }
//             return;
//         }
//         let socket=new SocketItem();
//         socket.clearMsg();
//         socket.setMsgTo({type:'hover',svg_id:this.svg_id})
//         socket.sendTo();
//         //****test
//         let position1=[]
//         let item=document.getElementById(this.svg_id);
//         let x=parseInt(item.getAttribute("x"));
//         let y=parseInt(item.getAttribute("y"));
//         let width=parseInt(item.getAttribute("width"));
//         let height=parseInt(item.getAttribute("height"));
//         position1.push({x:x,y:y},{x:x+width,y:y},{x:x+width,y:y+height},{x:x,y:y+height})
//         position1.push({x:x+width/2,y:y},{x:x+width,y:y+height/2},{x:x+width/2,y:y+height},{x:x,y:y+height/2})
//         socket.msgBack['position']=position1;
//         //****test end
//
//         let position=socket.msgBack['position']
//
//         for(var i=0;i<position.length;i++){
//             let hover_id=this.svg_id+"$"+i;
//             let hover=new HoverPoint(this.g_id,this.svg_id,hover_id,position[i]['x'],position[i]['y']);
//             let domOperator=new DomOperator();
//             domOperator.appendChildById(this.g_id,hover.dom);
//             this.HoverList.push(hover);
//         }
//     }
//
//     OffHoverModel(){
//         if(!this.isHover)return;
//         if(this.nowisHover>0)return;
//         console.log(1111);
//         let domOperator=new DomOperator();
//         this.isHover=false;
//         for(var i=0;i<this.HoverList.length;i++){
//             document.getElementById(this.HoverList[i].hover_id).style.display="none";
//             // domOperator.removeChildById(this.g_id,this.HoverList[i].hover_id)
//         }
//         // this.HoverList=[];
//
//     }
// }