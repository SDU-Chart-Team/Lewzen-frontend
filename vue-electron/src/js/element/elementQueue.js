// import {Element_SVG} from "@/js/element/element";
// import {CoreQueue} from "@/js/coreQueue/coreQueue";
// import {elementMove, elementScale, getCore, setCore} from "@/js/svg";
// import {pushQueue} from "@/js/actionQueue";
// import {El_scale_action, scale_el} from "@/js/action/el_scale_action";
// import {addAction} from "@/js/action/actionQueue";
// import {move_el, El_move_action} from "@/js/action/el_move_action";
// import el from "element-ui/src/locale/lang/el";
// import {El_delete_action, setVisible} from "@/js/action/el_delete_action";
// import {El_create_action} from "@/js/action/el_create_action";
// import {DomOperator} from "@/js/dom/domOperation";
// import {removeResizeListener} from "element-ui/src/utils/resize-event";
// import {createElementByTag} from "@/js/element/createElement";
// import {addLine} from "@/js/element/anchorCanvas";
//
// export class ElementQueue {
//     constructor() {
//         this.ElementQueue = []
//         this.coreQueue=new CoreQueue();
//         this.inElement=false;
//     }
//     appendElement(shape_id){
//         let element=new Element_SVG(shape_id);
//         // console.log(element);
//         // let action=new El_create_action("create",element.svg_id,true);
//         // addAction(action)
//         // this.setElementMouseDown(element);
//         // this.ElementQueue.push(element);
//         // this.setCore(element.svg_id);
//     }
//
//
//     setCore(svg_id) {
//         // console.log(1);
//         this.coreQueue.append(svg_id);
//         let cores = this.coreQueue.getCoreElement();
//         // console.log(cores);
//         for(var i=0;i<this.ElementQueue.length;i++){
//             let id=this.ElementQueue[i].svg_id;
//             // console.log(id);
//             if(cores[id]===1&&this.ElementQueue[i].isCore===false) {
//                 this.ElementQueue[i].InCoreModel();
//                 // console.log(1111);
//                 this.setCoreMouseDownAll(this.ElementQueue[i])
//             }
//             else if(cores[id]===0&&this.ElementQueue[i].isCore===true)
//                 this.ElementQueue[i].OffCoreModel();
//         }
//         // setRightBar();
//     }
//
//     getCore(svg_id){
//         for(var i=0;i<this.ElementQueue.length;i++){
//             if(this.ElementQueue[i].svg_id!==svg_id)continue;
//             return this.ElementQueue[i].isCore === true;
//         }
//     }
//     OffCoreAll(){
//         this.coreQueue.clear();
//         if(this.coreQueue.isCtrl)return;
//         for(var i=0;i<this.ElementQueue.length;i++){
//             this.ElementQueue[i].OffCoreModel();
//         }
//     }
//     setElementMouseDown(element){
//         let that=this;
//         let node=document.getElementById(element.svg_id);
//         // console.log(node);
//         node.onclick=function(){
//             // console.log(1);
//             that.inElement=true;
//             that.setCore(element.svg_id);
//         };
//
//         node.onmousedown=function(e){
//             // console.log(that.getCore(element.svg_id));
//             let item = document.getElementById(element.svg_id);
//             let x = parseInt(item.getAttribute("x"));
//             let y = parseInt(item.getAttribute("y"));
//             if(that.getCore(element.svg_id)){
//                 // console.log(1);
//                 let startX=e.offsetX;
//                 let startY=e.offsetY;
//                 let nowX=e.offsetX;
//                 let nowY=e.offsetY;
//                 document.onmousemove=function (e) {
//                     let newX=e.offsetX;
//                     let newY=e.offsetY;
//                     let transX=newX-nowX;
//                     let transY=newY-nowY;
//                     // console.log(transX,transY);
//                     move_el(element.svg_id,transX,transY,x,y);
//                     // elementMove(svgId,transX,transY);
//                 }
//                 document.onmouseup=function (e) {
//                     let endX=e.offsetX;
//                     let endY=e.offsetY;
//                     let action=new El_move_action('move',element.svg_id,endX-startX,endY-startY,x,y);
//                     addAction(action);
//                     document.onmousemove=null;
//                     document.onmouseup=null;
//                 }
//             }
//         }
//
//         node.onmouseenter=function (e) {
//             element.InHoverModel();
//             console.log(element.isHover);
//             if(!element.isHover)return;
//             that.setHoverMouseDownAll(element);
//         }
//         node.onmouseleave=function (e) {
//             element.OffHoverModel();
//         }
//     }
//     setHoverMouseDown(element,hover){
//         let hover_id=hover.hover_id;
//         let node=document.getElementById(hover_id);
//         var that=this;
//         let domOperator=new DomOperator();
//         node.onmouseenter=function (e) {
//             // console.log(hover_id)
//             element.nowisHover++;
//             domOperator.setAttrByDom(node,{r:10,style:'fill:#BCFFBC;opacity:0.8'})
//         }
//         node.onmouseleave=function () {
//             element.nowisHover--;
//             domOperator.setAttrByDom(node,{r:5,style:'fill:#29B6F2'})
//             node.style.display="none";
//         }
//         node.onmousedown=function (e) {
//             let attrs = domOperator.getAttrById(hover_id, ['cx', 'cy'])
//             // console.log(attrs);
//             let hover_line = hover_id + "_l";
//             // let line = createElementByTag("line", hover_line);
//             // let style = "stroke:black;stroke-width:1"
//             // domOperator.setAttrByDom(line, {x1: attrs['cx'], y1: attrs['cy'], x2: 0, y2: 0, style: style})
//             // domOperator.appendChildById(element.g_id, line);
//             // node.onmousemove = function (e) {
//             //     let x2 = e.offsetX;
//             //     let y2 = e.offsetY;
//             //     domOperator.setAttrByDom(line, {x2: x2, y2: y2});
//             // }
//             // node.onmouseup = function (e) {
//             //     node.onmousemove=null;
//             //     node.onmouseup=null;
//             // }
//             addLine(element.g_id,hover_id);
//         }
//     }
//     setHoverMouseDownAll(element){
//         for(var i=0;i<element.HoverList.length;i++){
//             this.setHoverMouseDown(element,element.HoverList[i]);
//         }
//     }
//
//     setCoreMouseDown(core){
//         let core_id=core.core_id;
//         let node=document.getElementById(core_id);
//         // console.log(core_id);
//         var that=this;
//         node.onmousedown=function (e) {
//             let startX=e.offsetX;
//             let startY=e.offsetY;
//             let nowX=e.offsetX;
//             let nowY=e.offsetY;
//             document.onmousemove=function (e) {
//                 // console.log(core.svg_id);
//                 let newX=e.offsetX;
//                 let newY=e.offsetY;
//                 let transX=newX-nowX;
//                 let transY=newY-nowY;
//                 nowX=newX;
//                 nowY=newY;
//                 // console.log(transX,transY);
//                 scale_el(core_id,core.svg_id,transX,transY);
//                 // elementScale(cid,domSvg[id].svgId,transX,transY);
//             }
//             document.onmouseup=function (e) {
//                 let endX=e.offsetX;
//                 let endY=e.offsetY;
//                 let transX=endX-startX;
//                 let transY=endY-startY;
//                 let action=new El_scale_action("scale",core_id,core.svg_id,transX,transY);
//                 // let action={
//                 //     type:'scale',
//                 //     cid:cid,
//                 //     id:domSvg[id].svgId,
//                 //     transX:transX,
//                 //     transY:transY
//                 // }
//                 // pushQueue(action);
//                 addAction(action);
//                 document.onmousemove=null;
//                 document.onmouseup=null;
//             }
//         }
//     }
//     setCoreMouseDownAll(element){
//         let coreLists=element.CoreList;
//         for (var i=0;i<coreLists.length;i++){
//             // console.log(coreLists[i]);
//             this.setCoreMouseDown(coreLists[i])
//         }
//     }
//
//     deleteInCore(){
//         // console.log(111);
//         let elements=[];
//         for(var i=0;i<this.ElementQueue.length;i++){
//             if(this.ElementQueue[i].isCore){
//                 elements.push({svg_id:this.ElementQueue[i].svg_id,g_id:this.ElementQueue[i].g_id})
//                 this.ElementQueue[i].OffCoreModel();
//             }
//         }
//         let action=new El_delete_action("delete",elements,false)
//         addAction(action);
//         // console.log(elements);
//         setVisible(elements,false);
//     }
//
//     getDomBySvgId(svg_id){
//         for(var i=0;i<this.ElementQueue.length;i++){
//             if(svg_id===this.ElementQueue[i].svg_id){
//                 return this.ElementQueue[i].Dom;
//             }
//         }
//     }
//     offCoreById(svg_id){
//         console.log(svg_id);
//         for(var i=0;i<this.ElementQueue.length;i++){
//             if(svg_id===this.ElementQueue[i].svg_id){
//                 console.log(111);
//                 this.ElementQueue[i].OffCoreModel();
//             }
//         }
//     }
// }
//
// let elementQueue=new ElementQueue();
// export function appendElement(svg_id,g_dom){
//     // elementQueue.appendElement(shape_id);
//     elementQueue.appendElement(svg_id,g_dom);
// }
// export function offCoreAll(){
//     if(!elementQueue.inElement) elementQueue.OffCoreAll();
//     else elementQueue.inElement=false;
// }
// export function getCoreById(svg_id) {
//     return elementQueue.getCore(svg_id)
// }
// export function deleteInCore(){
//     elementQueue.deleteInCore();
// }
// export function getDomBySvgId(svg_id){
//     return elementQueue.getDomBySvgId(svg_id);
// }
//
// export function offCoreById(svg_id){
//     elementQueue.offCoreById(svg_id);
// }