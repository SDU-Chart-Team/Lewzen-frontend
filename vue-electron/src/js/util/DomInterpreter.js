import {getMySvg} from "@/js/util/getCanvasIdOperation";
import {set_coordinate_canvas} from "../element/last/last_map_operation";
import {canvasAdjust} from "../canvas/base_canvas";
import {reverseUTF8} from "./utilChinese";
import {getCoreList} from "../element/core/core_queue";

export function parserCmd(cmd){
    let domCmd=cmd["domcmd"];
    let msg=cmd["returns"][0];
    let id=getMySvg();
    let root=document.getElementById(id);
    // console.log(domCmd);
    interpreterDom(root,domCmd);
    // for(let i=0;i<cmd.length;i++){
    //     let control=cmd[i];
    //     control=Trim(control);
    //     if(match(control,"!")){
    //         continue ;
    //     }else if(match(control,"domcmd")){
    //         i++;
    //         let domCmd="";
    //         for(let j=i;j<cmd.length;j++){
    //             domCmd+=cmd[j]+" ";
    //         }
    //         let id=getMySvg();
    //         let root=document.getElementById(id);
    //         // console.log(domCmd);
    //         interpreter(root,domCmd);
    //         break;
    //     }else{
    //         let tmp=control.split('=');
    //         val[tmp[0]]=tmp[1];
    //     }
    // }
    return msg;
}


export function interpreterDom(root, cmds){
    // let node=document.getElementById(getCoreList()[0])
    // if(node!==undefined&&node!==null){
    //     console.log(node.getAttribute("style"))
    //
    // }
    let i = 0;
    let next_parameter = () => {
        let j = i;
        while (cmds[j] !== ' ' && cmds[j] !== '\t' && cmds[j] !== '\n' && j < cmds.length) j++;
        let str = cmds.substring(i, j);
        i = j + 1;
        return str;
    }
    let next_string_nonspace = () => {
        let j = i + 1;
        while (cmds[j] !== '"' && j < cmds.length) {
            j++;
        }

        let str = cmds.substring(i + 1, j);
        i = j + 2;
        return str;
    }
    let next_string = (len) => {
        let str = cmds.substring(i, i + len);
        i = i + len + 1;
        return str;
    }
    let current = root;
    let index="";
    let attr="";
    let val="";
    while (i < cmds.length) {
        let cmd = next_parameter(i);
        switch (cmd) {
            case '':
                break;
            case 'child':
                index = Number(next_parameter(i));
                current = current.childNodes[index];
                break;
            case 'parent':
                current = current.parentNode;
                break;
            case 'remove':
                index = Number(next_parameter(i));
                current.removeChild(current.childNodes[index]);
                break;
            case 'append':
                let xml = unescape(next_string(Number(next_parameter(i))));
                // xml=reverseUTF8(xml)
                current.insertAdjacentHTML('beforeend', xml);
                console.log(current.id);
                let id=current.id;
                // if(id!==undefined&&id!==null){
                //     id=id.split("_");
                //     if(id[id.length-1]==="text"){
                //         let node=current.childNodes[0].childNodes[0];
                //         let html=node.innerHTML;
                //         html=reverseUTF8(html);
                //         node.innerHTML=html;
                //         // console.log(node)
                //     }else{
                //         let nodeList=current.getElementsByTagName("foreignObject");
                //         console.log(nodeList)
                //         if(nodeList!==undefined&&nodeList!==null){
                //             let node=nodeList[0];
                //             if(node!==undefined&&node!==null){
                //                 let nid=node.getAttribute("id");
                //                 // console.log(nid);
                //                 if(nid!==undefined&&nid!==null){
                //                     nid=nid.split("_");
                //                     if(nid[nid.length-1]==="text"){
                //                         let nod=node.childNodes[0].childNodes[0];
                //                         let html=nod.innerHTML;
                //                         html=reverseUTF8(html);
                //                         nod.innerHTML=html;
                //                         // console.log(node)
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
                break;
            case 'sort':
                let indices = next_string_nonspace(i);
                indices = indices.split(',').map(x => Number(x));
                [...current.childNodes]
                    .map((node,i)=>{node._index=indices[i];return node;})
                    .sort((a,b)=>a._index>b._index?1:-1)
                    .forEach(node=>current.appendChild(node));
                break;
            case 'translate':
                let x=next_parameter(i);
                let y=next_parameter(i);
                // let canvas=document.getElementById(getMySvg());
                // let height=parseInt(canvas.getAttribute("height"));
                // let width=parseInt(canvas.getAttribute("width"));
                // console.log(height,width)
                // canvas.setAttribute("width",width+x);
                // canvas.setAttribute("height",height+y);
                // let viewBox=canvas.getAttribute("viewBox");
                // if(viewBox===undefined)return;
                // viewBox=viewBox.split(" ");
                // console.log(viewBox);
                // let msg={}
                // msg['height']=parseInt(viewBox[3]);
                // msg['width']=parseInt(viewBox[2]);
                // let transform="translate("+(parseInt(x))+","+(parseInt(y))+")";
                // console.log(transform)
                // mapUpdate(msg);
                // canvas.setAttribute("transform",transform);
                break;
            case 'modify':
                attr = next_parameter(i);
                val = next_string_nonspace(i);
                if(attr==="viewBox"){
                    let canvas=document.getElementById(getMySvg());
                    let viewBox=canvas.getAttribute("viewBox")
                    console.log(viewBox);
                    let d=[];
                    if(viewBox!==null){
                        d=viewBox.split(' ');
                    }else{
                        d.push(0)
                        d.push(0)
                    }

                    console.log(d);
                    let tmp=val.split(' ');
                    console.log(tmp);
                    let msg={}
                    msg['height']=parseInt(tmp[3]);
                    msg['width']=parseInt(tmp[2]);
                    mapUpdate(msg);
                    canvasAdjust("grid")
                    // let node1=document.getElementById("myCanvas");
                    let node=document.getElementById("main_canvas");
                    // console.log(node1.getAttribute("width"))
                    // node.scrollHeight=node1.getAttribute("height")
                    // node.scrollWidth=node1.getAttribute("width")
                    // console.log(node1.getAttribute("height"))
                    // node.removeChild(node1);
                    // node.appendChild(node1);
                    // console.log(node.scrollHeight)
                    let top=parseInt(node.scrollTop)-parseInt(tmp[1])+parseInt(d[1]);
                    let left=parseInt(node.scrollLeft)-parseInt(tmp[0])+parseInt(d[0]);
                    set_coordinate_canvas(parseInt(tmp[0]),parseInt(tmp[1]));
                    let last=document.getElementById("last")
                    last.setAttribute("x",tmp[0])
                    last.setAttribute("y",tmp[1])
                    // console.log(node.getAttribute(""))

                    // console.log(top,left);
                    // node.setAttribute("scrollTop",top+"px")
                    // node.setAttribute("scrollLeft",left+"px")
                    node.scrollTop=top;
                    node.scrollLeft=left;
                    // console.log(node.scrollTop,node.scrollLeft);
                    // console.log(node.scrollHeight,node.scrollWidth);
                    // let transform="translate("+(parseInt(tmp[0]))+","+(parseInt(tmp[1]))+")";
                    // node.scrollTop=top;
                    // node.scrollLeft=left;
                    // console.log(node.scrollTop);
                    // console.log(node.scrollLeft);
                    // let transform="translate("+(parseInt(tmp[0]))+","+(parseInt(tmp[1]))+")";
                    // let canvas=document.getElementById(getMySvg());
                    // canvas.setAttribute("transform",transform);
                }
                // let tmp=val.split(' ');
                // console.log(tmp);
                // if(tmp[0]==="viewBox"){
                //     msg['height']=parseInt(tmp[3]);
                //     msg['width']=parseInt(tmp[2]);
                //     let transform="translate("+(parseInt(tmp[0]))+","+(parseInt(tmp[1]))+")";
                //     // console.log(transform)
                //     mapUpdate(msg);
                // }

                current.setAttribute(attr, val);
                break;
            case 'reset':
                attr = next_parameter(i);
                current.removeAttribute(attr);
                break;
            default:
                console.log('DOM CMD Interpret: Unknown CMD "' + cmd + '"');

        }
        // if(node!==undefined&&node!==null){
        //     console.log(node.getAttribute("style"))
        // }
    }
}

function Trim(str)
{
    if(str===undefined)return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function match(string,val){
    // console.substr(0,val.length)
    // console.log(val);
    return string.substr(0,val.length)===val;
}


