import {RectParser} from "@/svgParser/rectParser";
import {LineParser} from "@/svgParser/lineParser";
import {EllipaseParser} from "@/svgParser/ellipaseParser";
import {PathParser} from "@/svgParser/pathParser";
import {CircleParser} from "@/svgParser/circleParser";
import {PolygonParser} from "@/svgParser/polygonParser";

class HoverProcessor {

    constructor() {
        this.parser_set={
            rect:new RectParser(),
            line:new LineParser(),
            circle:new CircleParser(),
            ellipse:new EllipaseParser(),
            polygon:new PolygonParser(),
            polyline:new PolygonParser(),
            path:new PathParser(),
        }
    }

    getHoverPosition(g_id){
        let element=document.getElementById(g_id);
        let position=[];
        for(let key in this.parser_set){
            let nodes=element.getElementsByTagName(key);
            for(let i=0;i<nodes.length;i++){
                let node=nodes[i];
                let tmp=this.parser_set[key].getHoverPosition(node)
                for(let i=0;i<tmp.length;i++){
                    position.push(tmp[i]);
                }
            }
        }
        return position;
    }

    getXGuide(g_id){
        let element=document.getElementById(g_id);
        let bbox=element.getBBox();
        let position=[];
        position.push(bbox.x);
        position.push(bbox.x+bbox.width/2);
        position.push(bbox.x+bbox.width);
        return position;
    }

    getYGuide(g_id){
        let element=document.getElementById(g_id);
        let bbox=element.getBBox();
        let position=[];
        position.push(bbox.y);
        position.push(bbox.y+bbox.height/2);
        position.push(bbox.y+bbox.height);
        return position;
    }
}

let hoverProcessor=new HoverProcessor();

export function getHoverPosition(g_id){
    return hoverProcessor.getHoverPosition(g_id)
}

export function getXGuide(g_id){
    return hoverProcessor.getXGuide(g_id);
}

export function getYGuide(g_id){
    return hoverProcessor.getYGuide(g_id);
}