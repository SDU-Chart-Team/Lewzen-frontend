import {DomOperator} from "@/js/util/domOperation";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getGuideBySvgId, getPositionAfterGuide} from "@/js/element/guide/guide_queue";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {getHoverPosition} from "@/svgParser/hoverProcessor";
import {Connect_point} from "@/js/element/anchor/connect_point";
import {from_point_remove} from "../element/anchor/arrow_operation";
let counter=0;
export class Connection_canvas {
    constructor() {
        this.isOpen=false;
        this.connect_map={}
        this.connect_list=[];
        this.flag=true;
    }

    getState(){
        return this.isOpen;
    }

    setState(isOpen){
        this.isOpen=isOpen;
        // console.log(isOpen);
    }

    update_connect_point(g_id){
        if(!this.flag)return;
        from_point_remove();
        let mat=window.getComputedStyle(document.getElementById(g_id), null).getPropertyValue("transform");
        let rotation=[1,0,0,1]
        let translate=[0,0];
        if (mat!==undefined&&mat!=='none') {
            mat=mat.match(/\(([^)]+)\)/)[1].split(',').map(v=>Number(v));
            rotation=mat.splice(0,4);
            translate=mat.splice(0,2);
            console.log(rotation, translate)
        }
        if(this.connect_map[g_id]===undefined){
            let position=getHoverPosition(g_id);
            // console.log(position);
            let item={
                start:this.connect_list.length,
                len:position.length
            }
            this.connect_map[g_id]=item;
            // this.connect_map[g_id]['start']=this.connect_list.length;
            // this.connect_map[g_id]['len']=position.length;
            console.log(this.connect_map[g_id]);
            console.log(g_id);
            console.log(this.connect_map)
            for(let i=0;i<position.length;i++){
                let connect_point=new Connect_point({rotation:rotation,translate:translate,g_id:g_id,a_id:i,x:position[i]['cx'],y:position[i]['cy']})
                this.connect_list.push(connect_point);
            }
        }else{
            for(let i=this.connect_map[g_id]['start'];i<this.connect_map[g_id]['start']+this.connect_map[g_id]['len'];i++){
                this.connect_list[i].delete();
            }
            this.connect_list.splice(this.connect_map[g_id]['start'],this.connect_map[g_id]['len'])
            let position=getHoverPosition(g_id);
            this.connect_map[g_id]['start']=this.connect_list.length;
            this.connect_map[g_id]['len']=position.length;
            for(let i=0;i<position.length;i++){
                let connect_point=new Connect_point({rotation:rotation,translate:translate,g_id:g_id,a_id:i,x:position[i]['cx'],y:position[i]['cy']})
                this.connect_list.push(connect_point);
            }
        }
        console.log(this.connect_map)
        this.show_connect_point(g_id)
    }

    show_connect_point(g_id){
        for(let i=0;i<this.connect_map[g_id]['len'];i++){
            let index=this.connect_map[g_id]['start']+i;
            this.connect_list[index].create();
        }
    }



    update(g_id,msg){
        if(msg['type']==='create'){
            this.update_connect_point(g_id);
        }else if(msg['type']==="delete"){
            this.delete_connect_point(g_id);
        }else if(msg['type']==="flag"){
            this.flag=msg['flag']
        }
    }

    delete_connect_point(g_id){
        from_point_remove();
        for(let key in this.connect_map){
            let id=key;
            for(let i=0;i<this.connect_map[id]['len'];i++) {
                let index = this.connect_map[id]['start'] + i;
                this.connect_list[index].delete();
            }
        }
        // let id=g_id
        // console.log(this.connect_map);
        // if(this.connect_map[g_id]===undefined)return;
        // for(let i=0;i<this.connect_map[id]['len'];i++) {
        //     let index = this.connect_map[id]['start'] + i;
        //     this.connect_list[index].delete();
        // }
        // this.connect_map[g_id]=undefined;
    }

    get_connect_point_list(msg){
        let x=parseFloat(msg['x']),y=parseFloat(msg['y']);
        console.log(x,y)
        let list=[]
        for(let i=0;i<this.connect_list.length;i++){
            let point=this.connect_list[i].get_point();
            let x1=parseFloat(point['x'])
            let y1=parseFloat(point['y'])
            // console.log(x1,y1);
            // console.log((x-x1)*(x-x1)+(y-y1)*(y-y1))
            if((x-x1)*(x-x1)+(y-y1)*(y-y1)<300){
                list.push(this.connect_list[i]);
            }
        }
        return list;
    }


    clear(){
        this.connect_map={};
        this.connect_list=[];
        this.delete_connect_point("");
        from_point_remove();
    }
}
