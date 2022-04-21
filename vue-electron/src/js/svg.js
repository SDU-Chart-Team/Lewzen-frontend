//domSvg数组维护当前画布中的所有组件
import {pushQueue} from "@/js/actionQueue";
let idCnt=0;
let parser=new DOMParser();
let domSvg=[];
//创建组件


export function createSvg(shape_id) {
    let canvas=document.getElementById("mySvg");
    /*
    向后端发送socket，获取svg对象和svg对象的id
     */
    //测试用法
    //需要用g进行包裹

    let g_el=document.createElementNS(
        "http://www.w3.org/2000/svg","g"
    )
    g_el.setAttribute("id","shape_"+idCnt);
    idCnt++;
    let svg="<svg  xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">\n" +
        "  <rect id='my' x=\"100\" y=\"100\" width=\"300\" height=\"100\"\n" +
        "  style=\"fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)\"/>\n" +
        "</svg> "
    let svgId="my";
    let item=parser.parseFromString(svg,"image/svg+xml");
    console.log(item.getElementById(svgId));
    let element=item.getElementById(svgId);
    element.onclick=function(e){
        setCore(svgId);
    };
    element.onmousedown=function(e){
        if(getCore(svgId)){
            let startX=e.offsetX;
            let startY=e.offsetY;
            let nowX=e.offsetX;
            let nowY=e.offsetY;
            document.onmousemove=function (e) {
                let newX=e.offsetX;
                let newY=e.offsetY;
                let transX=newX-nowX;
                let transY=newY-nowY;
                nowX=newX;
                nowY=newY;
                // console.log(transX,transY);
                elementMove(svgId,transX,transY);
            }
            document.onmouseup=function (e) {
                let endX=e.offsetX;
                let endY=e.offsetY;
                let action={
                    type:'move',
                    id:svgId,
                    transX:endX-startX,
                    transY:endY-startY
                }
                pushQueue(action);
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
    }
    canvas.append(g_el);
    g_el.append(element);
    appendDom(svgId);
    //向动作队列中添加创建图形的action
    let action={
        type:'create',
        id:svgId
    }
    pushQueue(action);
}

//按照id恢复组件
export function createElementById(id){
    for(var i=0;i<domSvg.length;i++){
        if (id===domSvg[i].svgId){
            let item=document.getElementById("shape_"+i);
            item.append(domSvg[i].doc);
        }
    }
}


//向domSvg数组中添加组件
export function appendDom(svgId){
    let item={
        svgId:svgId,
        isCore:false,//该组件是否处于核心态
        isShow:true,//该组件是否在显示状态->对应删除与未被删除
        key_point_array:[],
        doc:document.getElementById(svgId)
    }
    domSvg.push(item);
}

//删去所有的关键点
export function delete_all_key() {
    for(var i=0;i<domSvg.length;i++){
        domSvg[i].isCore=false;
        coreChange(i);
    }
}

//改变画布上组件的core
function coreChange(i){
    if(domSvg[i].isCore===false){
        let item=document.getElementById(domSvg[i].svgId);
        if(domSvg[i].key_point_array.length!==0){
            for(let j=0;j<=domSvg[i].key_point_array.length;j++){
                item.removeChild(document.getElementById(domSvg[i].key_point_array[j]));
            }
            domSvg[i].key_point_array=[];
        }
    }else{
        if(domSvg[i].key_point_array.length!==0)return;
        /*
          向后端发送core的信息，获取所有的关键点的位置;（形式：（x,y））
        */
        // console.log("111")
        let position=[]
        let item=document.getElementById(domSvg[i].svgId);
        let x=parseInt(item.getAttribute("x"));
        let y=parseInt(item.getAttribute("y"));
        let width=parseInt(item.getAttribute("width"));
        let height=parseInt(item.getAttribute("height"));
        position.push({x:x,y:y},{x:x+width,y:y},{x:x+width,y:y+height},{x:x,y:y+height});
        for(var j=0;j<position.length;j++){
            createCorePoint(i,position[j].x,position[j].y,j);
            domSvg[i].key_point_array.push(domSvg[i].svgId+"_"+j);
        }
    }
}

//为组件创建核心点
function createCorePoint(id,x,y,core_id) {
    let cid=domSvg[id].svgId+"_"+core_id;
    let item=document.getElementById("shape_"+id);
    let node=document.createElementNS(
        "http://www.w3.org/2000/svg","circle"
    )
    node.setAttribute("cx",x+"");
    node.setAttribute("cy",y+"");
    node.setAttribute("r",5);
    node.setAttribute("style",
        "fill:green");
    node.setAttribute("id",cid);

    node.onmousedown=function (e) {
        let startX=e.offsetX;
        let startY=e.offsetY;
        let nowX=e.offsetX;
        let nowY=e.offsetY;
        document.onmousemove=function (e) {
            let newX=e.offsetX;
            let newY=e.offsetY;
            let transX=newX-nowX;
            let transY=newY-nowY;
            nowX=newX;
            nowY=newY;
            console.log(transX,transY);
            elementScale(cid,domSvg[id].svgId,transX,transY);
        }
        document.onmouseup=function (e) {
            let endX=e.offsetX;
            let endY=e.offsetY;
            let transX=endX-startX;
            let transY=endY-startY;
            let action={
                type:'scale',
                cid:cid,
                id:domSvg[id].svgId,
                transX:transX,
                transY:transY
            }
            pushQueue(action);
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }
    item.append(node);
}

//设置组件为核心态
function setCore(svgId){//目前的关键点的要求不支持连选。
    for(var i=0;i<domSvg.length;i++){
        domSvg[i].isCore = domSvg[i].svgId === svgId;
        coreChange(i);
    }
}

//得到组件是否处于核心态
export function getCore(svgId){
    for(var i=0;i<domSvg.length;i++){
        if(domSvg[i].svgId===svgId)return domSvg[i].isCore;
    }
}

//元素移动
export function elementMove(svgId,move_x,move_y) {
    let position=[];
    let dom_change={};
    let item=document.getElementById(svgId);
    //test部分：
    let x=parseInt(item.getAttribute("x"));
    let y=parseInt(item.getAttribute("y"));
    let width=parseInt(item.getAttribute("width"));
    let height=parseInt(item.getAttribute("height"));
    x=x+move_x;
    y=y+move_y;
    position[0]={cx:x,cy:y}
    position[1]={cx:x+width,cy:y}
    position[2]={cx:x+width,cy:y+height}
    position[3]={cx:x,cy:y+height}
    dom_change['x']=x;
    dom_change['y']=y;
    dom_change['width']=width;
    dom_change['height']=height;

    //测试结束
    for (var i in dom_change){
        item.setAttribute(i,dom_change[i]);
    }
    for (let i=0;i<position.length;i++){
        let core=svgId+"_"+i;
        let node=document.getElementById(core);
        node.setAttribute('cx',position[i].cx)
        node.setAttribute('cy',position[i].cy);
    }

}

//元素放缩
export function elementScale(core_id,svgId,move_x,move_y) {
    let position=[];
    let dom_change={};
    let item=document.getElementById(svgId);
    //test部分：只测矩形的最一个点
    let x=parseInt(item.getAttribute("x"));
    let y=parseInt(item.getAttribute("y"));
    let width=parseInt(item.getAttribute("width"));
    let height=parseInt(item.getAttribute("height"));
    position[0]={cx:x,cy:y}
    position[1]={cx:x+width,cy:y}
    position[2]={cx:x+width,cy:y+height}
    position[3]={cx:x,cy:y+height}
    x=x+move_x;
    y=y+move_y;
    width=width-move_x;
    height=height-move_y;
    position[0].cx=x;position[0].cy=y;
    position[1].cy=y;
    position[3].cx=x;

    dom_change['x']=x;
    dom_change['y']=y;
    dom_change['width']=width;
    dom_change['height']=height;

    //测试结束
    for (var i in dom_change){
        item.setAttribute(i,dom_change[i]);
    }
    for (let i=0;i<position.length;i++){
        let core=svgId+"_"+i;
        let node=document.getElementById(core);
        node.setAttribute('cx',position[i].cx)
        node.setAttribute('cy',position[i].cy);
    }
}

//删除元素
export function deleteElement(){
    let elements=[]
    let canvas=document.getElementById("myCanvas");
    for(let i=0;i<domSvg.length;i++){
        if(domSvg[i].isCore){
            let node=document.getElementById("shape_"+i);
            node.removeChild(document.getElementById(domSvg[i].svgId))
            for(var j=0;j<domSvg[i].key_point_array.length;j++){
                node.removeChild(document.getElementById(domSvg[i].svgId+"_"+j));
            }
            domSvg[i].isCore=false;
            domSvg[i].isShow=false;
            domSvg[i].key_point_array=[];
            elements.push(domSvg[i].svgId);
        }
    }
    let action={
        type:'delete',
        id:elements,
    }
    pushQueue(action)
}

export function deleteElementById(svgId){
    // console.log("delete")
    let canvas=document.getElementById("myCanvas");
    for(let i=0;i<domSvg.length;i++){
        console.log(svgId,domSvg[i].svgId);
        if(domSvg[i].svgId===svgId){
            // console.log("true");
            let node=document.getElementById("shape_"+i);
            node.removeChild(document.getElementById(domSvg[i].svgId))
            for(var j=0;j<domSvg[i].key_point_array.length;j++){
                node.removeChild(document.getElementById(domSvg[i].svgId+"_"+j));
            }
            domSvg[i].key_point_array=[];
        }
    }
}