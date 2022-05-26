import {createElementByTag} from "@/js/util/createSvgOperation";
import {DomOperator} from "@/js/util/domOperation";

class LinearGradientCreator {
    constructor() {
        this.defs="myDefs"
        this.counter=0;
        this.list={};
    }
    addLinearGradient(msg){
        let direction=msg['direction'];
        let start_color=msg['start_color'];
        let end_color=msg['end_color'];

        let start_style="stop-color:"+start_color;
        let end_style="stop-color:"+end_color;
        let id="gradient_"+this.counter;

        this.list[this.counter]={
            direction:msg['direction'],
            start_color:msg['start_color'],
            end_color:msg['end_color']
        }
        this.counter++;

        let node=createElementByTag("linearGradient",id);
        if(direction==="south"){
            node.setAttribute("x1","0%");
            node.setAttribute("x2","0%");
            node.setAttribute("y1","0%");
            node.setAttribute("y2","100%");
        }else if(direction==="north"){
            let tmp=start_style;
            start_style=end_style;
            end_style=tmp;
            node.setAttribute("x1","0%");
            node.setAttribute("x2","0%");
            node.setAttribute("y1","0%");
            node.setAttribute("y2","100%");
        }else if(direction==="east"){
            node.setAttribute("x1","0%");
            node.setAttribute("x2","100%");
            node.setAttribute("y1","0%");
            node.setAttribute("y2","0%");
        }else if(direction==="west"){
            let tmp=start_style;
            start_style=end_style;
            end_style=tmp;
            node.setAttribute("x1","0%");
            node.setAttribute("x2","100%");
            node.setAttribute("y1","0%");
            node.setAttribute("y2","0%");
        }
        let start=createElementByTag("stop");
        start.setAttribute("offset","0%")
        start.setAttribute("style",start_style)
        let end=createElementByTag("stop");
        end.setAttribute("offset","100%")
        end.setAttribute("style",end_style);
        node.append(start);
        node.append(end);
        let defs=document.getElementById(this.defs);
        defs.append(node);
        return id;
    }

    getMsgById(id){
        return this.list[id];
    }
}

let linearGradientCreator=new LinearGradientCreator();

export function addLinearGradient(msg){
    return linearGradientCreator.addLinearGradient(msg);
}
export function getGradient(id){
    return linearGradientCreator.getMsgById(id);
}