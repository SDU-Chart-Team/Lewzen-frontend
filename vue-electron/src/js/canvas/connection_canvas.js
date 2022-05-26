import {DomOperator} from "@/js/util/domOperation";
import {createElementByTag} from "@/js/util/createSvgOperation";
import {getGuideBySvgId, getPositionAfterGuide} from "@/js/element/guide/guide_queue";
import {getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {getHoverPosition} from "@/svgParser/hoverProcessor";
import {Connect_point} from "@/js/element/anchor/connect_point";
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
        if(this.connect_map[g_id]===undefined){
            let position=getHoverPosition(g_id);
            console.log(position);
            this.connect_map[g_id]={};
            this.connect_map[g_id]['start']=this.connect_list.length;
            this.connect_map[g_id]['len']=position.length;
            for(let i=0;i<position.length;i++){
                let connect_point=new Connect_point({g_id:g_id,a_id:i,x:position[i]['cx'],y:position[i]['cy']})
                this.connect_list.push(connect_point);
            }
        }else{
            this.connect_list.splice(this.connect_map[g_id]['start'],this.connect_map[g_id]['len'])
            let position=getHoverPosition(g_id);
            this.connect_map[g_id]['start']=this.connect_list.length;
            this.connect_map[g_id]['len']=position.length;
            for(let i=0;i<position.length;i++){
                let connect_point=new Connect_point({g_id:g_id,a_id:i,x:position[i]['cx'],y:position[i]['cy']})
                this.connect_list.push(connect_point);
            }
        }
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
        for(let key in this.connect_map){
            let id=key;
            if(this.connect_map[id]===undefined)return;

            for(let i=0;i<this.connect_map[id]['len'];i++) {
                let index = this.connect_map[id]['start'] + i;
                this.connect_list[index].delete();
            }
        }

    }
}