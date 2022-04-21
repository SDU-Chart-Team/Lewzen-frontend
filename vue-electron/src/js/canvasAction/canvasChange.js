import {Grid_canvas} from "@/js/canvas/grid_canvas";


class CanvasChange extends CanvasAction{
    createGrid(x){
        let canvas_grid=new Grid_canvas();
        canvas_grid.createGrid(20);
    }
}

export function createGrid(x){
    let canvas_grid=new Grid_canvas();
    canvas_grid.createGrid(20);

    // let svg=document.getElementById('mySvg');
    // // console.log(svg.getAttribute("height"));
    // // console.log(svg.getAttribute('width'));
    // let height=svg.getAttribute("height");
    // let width=svg.getAttribute("width");
    // let heightNum=height/x;
    // let widthNum=width/x;
    // let style="stroke:#DCDCDC;stroke-width:1"
    // let style_normal="stroke:rgb(246,246,246);stroke-width:1"
    // for(var i=1;i<=heightNum;i++){
    //     let lineId='line_y_'+i;
    //     let node=document.createElementNS(
    //         "http://www.w3.org/2000/svg",
    //         "line"
    //     )
    //     node.setAttribute("x1",0)
    //     node.setAttribute("y1",i*x)
    //     node.setAttribute("x2",width)
    //     node.setAttribute("y2",i*x)
    //     node.setAttribute("id",lineId);
    //     if(i%4===0)node.setAttribute("style",style)
    //     else node.setAttribute("style",style_normal)
    //     grid.push(lineId);
    //     svg.append(node);
    // }
    // for(var i=1;i<=widthNum;i++){
    //     let lineId='line_x_'+i;
    //     let node=document.createElementNS(
    //         "http://www.w3.org/2000/svg",
    //         "line"
    //     )
    //     node.setAttribute("x1",i*x)
    //     node.setAttribute("y1",'0')
    //     node.setAttribute("x2",i*x)
    //     node.setAttribute("y2",height)
    //     node.setAttribute("id",lineId);
    //     if(i%4===0)node.setAttribute("style",style)
    //     else node.setAttribute("style",style_normal)
    //     grid.push(lineId);
    //     svg.append(node);
    // }
}