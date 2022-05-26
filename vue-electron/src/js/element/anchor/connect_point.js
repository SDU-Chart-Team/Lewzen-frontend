import {createElementByTag} from "@/js/util/createSvgOperation";
import {getHoverMapId} from "@/js/util/getCanvasIdOperation";
import {signal_arrow} from "@/js/element/anchor/arrow_operation";
import {getModuleByGid} from "@/js/element/module/module_queue";
import th from "element-ui/src/locale/lang/th";
import {getAncestorAll} from "@/js/element/module/module_tree";

export class Connect_point {
    constructor(msg) {
        this.g_id=msg['g_id'];
        this.a_id=msg['a_id'];
        this.connect_to=[];
        this.connect_from=[];
        // console.log(msg)
        this.x=msg['x'];
        this.y=msg['y'];
        this.id=this.g_id+"_"+this.a_id+"_"+"point"
        this.live=false;
    }
    create(){
        let node=createElementByTag("circle",this.id);
        let map_id=getHoverMapId();
        let map=document.getElementById(map_id);
        let that=this;
        let element=getModuleByGid(this.g_id);
        let center_x=element.center_x;
        let center_y=element.center_y;
        // console.log(center_x);
        // console.log(center_y);
        let x=this.x;
        let y=this.y;
        let theta=Math.atan((y-center_y)/(x-center_x));
        // console.log(theta)
        if(x<center_x){
            theta+=Math.PI;
        }

        // console.log(x,y,theta);
        theta=theta+element.theta;
        while(theta>2*Math.PI)theta-=2*Math.PI;
        while(theta<0)theta+=2*Math.PI;
        let len=Math.sqrt(((x-center_x)*(x-center_x)+(y-center_y)*(y-center_y)))
        console.log(theta);
        // console.log(theta,center_x+len*Math.cos(theta),center_y+len*Math.sin(theta))

        // console.log(theta,center_x+len*Math.cos(theta),center_y+len*Math.sin(theta))
        // console.log(theta*180/Math.PI);
        // alert(theta)
        node.setAttribute("cx",center_x+len*Math.cos(theta));
        node.setAttribute("cy",center_y+len*Math.sin(theta));
        node.setAttribute("r",5);
        node.setAttribute("fill","pink")
        node.onmouseenter=function(e){
            signal_arrow(that.g_id,that.a_id,{type:"auto",x:center_x+len*Math.cos(theta),y:center_y+len*Math.sin(theta)})
        }
        // alert(theta)
        map.appendChild(node);
        this.live=true;
    }

    delete(){
        if(!this.live)return;
        this.live=false;
        let map_id=getHoverMapId();
        let map=document.getElementById(map_id);
        let node=document.getElementById(this.id);
        map.removeChild(node);
    }
}