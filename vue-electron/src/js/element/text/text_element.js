import {createElementByTag} from "@/js/util/createSvgOperation";
import {getCoreList} from "@/js/element/core/core_queue";
import {getTextMapId} from "@/js/util/getCanvasIdOperation";
import {getBBox} from "../../util/bboxUtil";

export function createText(g_id,svg_id){
    let foreign=createElementByTag("foreignObject");
    let attrs=getAttrsAboutForeign(svg_id);
    foreign.setAttribute("width",100)
    foreign.setAttribute("height",100)
    foreign.setAttribute("x",attrs['x'])
    foreign.setAttribute("y",attrs['y']+attrs['height']/2-10)
    foreign.setAttribute("id","text_"+g_id);
    foreign.setAttribute("style","display: inline-block;overflow:visible")
    let div=document.createElement("div");
    div.setAttribute("xmlns","http://www.w3.org/1999/xhtml")
    // let style="display: inline-block;width:"+(attrs['width']*3)+"px;height:"+attrs['height']+"px";
    div.setAttribute("style","display: inline-block;")
    div.setAttribute("id",svg_id+"_html");
    div.innerHTML="<p><em>hel11111</em><em><strong>111</strong></em><u><em><strong>111</strong></em></u><u><em>1lo</em></u></p>\n"
    foreign.appendChild(div);
    foreign.ondblclick=function(e){
        let node=document.getElementById(svg_id+"_html");
        setValueHtml(node.innerHTML);
        changeText();
    }
    // let g=document.getElementById(g_id);
    let g=document.getElementById(getTextMapId());
    console.log(g);
    g.appendChild(foreign);

    // let node=document.getElementById(svg_id);
    // g.removeChild(node);
    // g.appendChild(node);
}

export function setTextPosition(g_id,svg_id){
    let foreign=document.getElementById("text_"+g_id);
    let attrs=getAttrsAboutForeign(svg_id);
    foreign.setAttribute("x",attrs['x'])
    foreign.setAttribute("y",attrs['y']+attrs['height']/2-10)}

function getAttrsAboutForeign(svg_id){
    let node=document.getElementById(svg_id);
    let attrs={};
    let bbox=getBBox(svg_id);
    // let bbox=node.getBBox();
    attrs['x']=bbox.x;
    attrs['y']=bbox.y;
    attrs['width']=bbox.width;
    attrs['height']=bbox.height;
    return attrs;
}
