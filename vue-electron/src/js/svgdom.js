import it from "element-ui/src/locale/lang/it";
import {appendDom,setCore,delete_all_key,elementMove,getCore} from "@/js/svg";
import {pushQueue} from "@/js/actionQueue";
import ca from "element-ui/src/locale/lang/ca";
let scaleBase=1.0

export function init() {
    // createGrid(20);
}

let grid=[]
// export function createGrid(x){
//     let canvas_grid=new Grid_canvas();
//     canvas_grid.createGrid(20);
//
//     // let svg=document.getElementById('mySvg');
//     // // console.log(svg.getAttribute("height"));
//     // // console.log(svg.getAttribute('width'));
//     // let height=svg.getAttribute("height");
//     // let width=svg.getAttribute("width");
//     // let heightNum=height/x;
//     // let widthNum=width/x;
//     // let style="stroke:#DCDCDC;stroke-width:1"
//     // let style_normal="stroke:rgb(246,246,246);stroke-width:1"
//     // for(var i=1;i<=heightNum;i++){
//     //     let lineId='line_y_'+i;
//     //     let node=document.createElementNS(
//     //         "http://www.w3.org/2000/svg",
//     //         "line"
//     //     )
//     //     node.setAttribute("x1",0)
//     //     node.setAttribute("y1",i*x)
//     //     node.setAttribute("x2",width)
//     //     node.setAttribute("y2",i*x)
//     //     node.setAttribute("id",lineId);
//     //     if(i%4===0)node.setAttribute("style",style)
//     //     else node.setAttribute("style",style_normal)
//     //     grid.push(lineId);
//     //     svg.append(node);
//     // }
//     // for(var i=1;i<=widthNum;i++){
//     //     let lineId='line_x_'+i;
//     //     let node=document.createElementNS(
//     //         "http://www.w3.org/2000/svg",
//     //         "line"
//     //     )
//     //     node.setAttribute("x1",i*x)
//     //     node.setAttribute("y1",'0')
//     //     node.setAttribute("x2",i*x)
//     //     node.setAttribute("y2",height)
//     //     node.setAttribute("id",lineId);
//     //     if(i%4===0)node.setAttribute("style",style)
//     //     else node.setAttribute("style",style_normal)
//     //     grid.push(lineId);
//     //     svg.append(node);
//     // }
// }

export function deleteGrid(){
    let svg=document.getElementById('mySvg');
    // console.log(svg.getAttribute("height"));
    // console.log(svg.getAttribute('width'));
    let height=svg.getAttribute("height");
    let width=svg.getAttribute("width");
    for(var i=0;i<grid.length;i++){
        let node=document.getElementById(grid[i]);
        svg.removeChild(node);
    }
    grid=[]
}

export function moveSvg() {
    alert("move");
    let circle=document.getElementById("circle1");
    circle.setAttribute("r",100);
}

export function scaleSvg(x){
    let svg=document.getElementById("mySvg");
    let canvas=document.getElementById("myCanvas");
    let width=canvas.style.width;
    let height=canvas.style.height;
    console.log(parseInt(width));
    x=x*1.0/100;
    scaleBase=x;
    canvas.style.width="3000px";
    canvas.style.height="2500px";
    svg.style.transform="scale("+x+","+x+")";
}

export function extendSvg(x,y){
    return {x:x,y:y};
}

export function adjustCanvas(x,y){
    let canvas=document.getElementById("myCanvas");
    let height=y+300+'px';
    let width=x+300+'px';
    canvas.style.width=width;
    canvas.style.height=height;
}

//
// function createRect() {
//     var svg=document.getElementById("mySvg");
//     var item=document.createElementNS(
//         "http://www.w3.org/2000/svg","svg"
//     )
//     var rect=document.createElementNS(
//         "http://www.w3.org/2000/svg","rect"
//     );
//     item.append(rect);
//     rect.setAttribute("width",100);
//     rect.setAttribute("height",30);
//     rect.setAttribute("x",100);
//     rect.setAttribute("y",200);
//     rect.setAttribute("style",
//         "fill:yellow");
//     item.setAttribute("id","rect1_g")
//     rect.setAttribute("id","rect1");
//     rect.onclick=function(){
//         let g=document.getElementById("rect1_g")
//         let item=document.getElementById("rect1");
//         let x=item.getAttribute("x");
//         let y=item.getAttribute("y");
//         let width=item.getAttribute("width");
//         let height=item.getAttribute("height");
//         let node1=document.createElementNS(
//             "http://www.w3.org/2000/svg","circle"
//         );
//         node1.setAttribute("cx",x);
//         node1.setAttribute("cy",y);
//         node1.setAttribute("r",5);
//         node1.setAttribute("style",
//             "fill:green");
//         node1.onmousedown=function(e){
//             let nowX=e.offsetX;
//             let nowY=e.offsetY;
//             document.onmousemove=function(e){
//                 let newX=e.offsetX;
//                 let newY=e.offsetY;
//                 // console.log(newX-nowX);
//                 // console.log(newY-nowY);
//                 let transX=""+newX-nowX;
//                 let transY=""+newY-nowY;
//                 let trans="translate("+transX+" "+transY+")";
//                 // console.log(trans);
//                 node1.setAttribute("transform",trans);
//
//             }
//             document.onmouseup=function(e){
//                 document.onmousemove=null;
//                 document.onmouseup=null;
//             }
//         }
//         let node2=document.createElementNS(
//             "http://www.w3.org/2000/svg","circle"
//         );
//         node2.setAttribute("cx",parseInt(x)+parseInt(width)+"");
//         node2.setAttribute("cy",y);
//         node2.setAttribute("r",5);
//         node2.setAttribute("style",
//             "fill:rbg(0,0,255);stroke-width:1;stroke:rgb(0,0,0)");
//         let node3=document.createElementNS(
//             "http://www.w3.org/2000/svg","circle"
//         );
//         node3.setAttribute("cx",parseInt(x)+parseInt(width)+"");
//         node3.setAttribute("cy",parseInt(y)+parseInt(height)+"");
//         node3.setAttribute("r",5);
//         node3.setAttribute("style",
//             "fill:rbg(0,0,255);stroke-width:1;stroke:rgb(0,0,0)");
//         let node4=document.createElementNS(
//             "http://www.w3.org/2000/svg","circle"
//         );
//         node4.setAttribute("cx",x);
//         node4.setAttribute("cy",parseInt(y)+parseInt(height)+"");
//         node4.setAttribute("r",5);
//         node4.setAttribute("style",
//             "fill:rbg(0,0,255);stroke-width:1;stroke:rgb(0,0,0)");
//         g.append(node1);
//         svg.append(node2);
//         svg.append(node3);
//         svg.append(node4);
//     }
//     // rect.onmousedown=function(e){
//     //     let nowX=e.offsetX;
//     //     let nowY=e.offsetY;
//     //     document.onmousemove=function (e) {
//     //         let tranOdd=rect.getAttribute("transform");
//     //         console.log(tranOdd);
//     //         let newX=e.offsetX;
//     //         let newY=e.offsetY;
//     //         let transX=newX-nowX;
//     //         let transY=newY-nowY;
//     //         let trans="translate("+transX+" "+transY+")";
//     //         rect.setAttribute("transform",trans);
//     //     }
//     // }
//     svg.append(item);
// }
// function createCircle() {
//     var svg=document.getElementById("mySvg");
//
//     let circle=document.createElementNS(
//         "http://www.w3.org/2000/svg","circle"
//     );
//     circle.setAttribute("cx",200);
//     circle.setAttribute("cy",300);
//     circle.setAttribute("r",40);
//     circle.setAttribute("style",
//         "fill:rbg(0,0,255);stroke-width:1;stroke:rgb(0,0,0)");
//     circle.setAttribute("id","circle1");
//     svg.append(circle);
// }
// function createRect_Active(){
//     let rect=document.getElementById("rect1");
//     console.log(rect);
// }

