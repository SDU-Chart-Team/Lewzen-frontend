import {getModuleByGid} from "@/js/element/module/module_queue";
import {anchor_element} from "@/js/element/anchor/anchor_element";
import {getCoreList} from "@/js/element/core/core_queue";
import {getHoverPosition} from "@/svgParser/hoverProcessor";
import {P} from "@/js/action/actionQueue";

class Anchor_queue {
    constructor() {
        this.anchor_queue={};
        this.arrow_state=false;
        this.arrow_counter=0;
        this.arrow_to=[];
        this.arrow_from=[];
        this.map={}
        this.arrow={};
        this.arrow_list={};
    }

    add(g_id){
        let anchor=new anchor_element(g_id);
        anchor.update();
        this.anchor_queue[g_id]=anchor;
    }

    update(g_id,type){
        // console.log(g_id,type);
        if(type==="arrow_on"){
            this.arrow_state=true;
        }
        else if(type==="arrow_off"){
            this.arrow_state=false;
        }
        else if(type==="arrow_get"){
            return this.arrow_state;
        }
        let anchor=this.anchor_queue[g_id];
        if(anchor===undefined)return undefined;
        else if(type==="modelon") anchor.model_on();
        else if(type==="modeloff") anchor.model_off();
        else if(type==="normal") anchor.update()
        else if(type==="block") anchor.display_block();
        else if(type==="none") anchor.display_none();
        return undefined;
    }

    delete(g_id){
        let anchor=this.anchor_queue[g_id];
        if(anchor===undefined)return undefined;
        anchor.delete()
    }

    query(g_id){
        let anchor=this.anchor_queue[g_id];
        return anchor;
    }


    get_anchor_point(x,y){
        let start_x=x-2;
        let end_x=x+2;
        let start_y=y-2;
        let end_y=y+2;
        for(let xi=start_x;xi<=end_x;xi++){
            for(let yi=start_y;yi<=end_y;yi++){
                if(this.map[xi]===undefined)continue;
                if(this.map[xi][yi]===undefined)continue;
                if(this.map[xi][yi].length===0)continue;
                return this.map[xi][yi][0];
            }
        }
        return undefined;
    }
    update_anchor_map(position_old,position_new,g_id){
        console.log(position_old)
        console.log(position_new)
        for(let i=0;i<position_old.length;i++){
            if(this.map[position_old[i]['cx']]===undefined){
                this.map[position_old[i]['cx']]={};
            }
            if(this.map[position_old[i]['cx']][position_old[i]['cy']]===undefined){
                this.map[position_old[i]['cx']][position_old[i]['cy']]=[];
            }
            let item=this.map[position_old[i]['cx']][position_old[i]['cy']];
            let x=this.map[position_old[i]['cx']];
            let y=this.map[position_old[i]['cy']];
            for(let j=0;j<item.length;j++){
                if(item[j]['g_id']===g_id&&item[j]['a_id']===i){
                    this.map[position_old[i]['cx']][position_old[i]['cy']].splice(j,1);
                    break;
                }
            }
        }
        for(let i=0;i<position_new.length;i++){
            if(this.map[position_new[i]['cx']]===undefined){
                this.map[position_new[i]['cx']]={};
            }
            if(this.map[position_new[i]['cx']][position_new[i]['cy']]===undefined){
                this.map[position_new[i]['cx']][position_new[i]['cy']]=[];
            }
            this.map[position_new[i]['cx']][position_new[i]['cy']].push({g_id:g_id,a_id:i})
        }
        console.log(this.map);
    }

    anchor_arrow_add(g_id,a_id){
        let id=getCoreList()[0];
        this.arrow={
            g_id:g_id,
            a_id:a_id,
            id:id
        }
        if(this.arrow_list[id]===undefined){
            this.arrow_to.push({g_id:g_id,a_id:a_id,id:id})
            this.arrow_list[id]=1;
        }
    }

    anchor_arrow_link(g_id,a_id){
        let id=this.arrow['id'];
        for(let i=0;i<this.arrow_to.length;i++){
            if(this.arrow_to[i]['id']===id){
                this.arrow_to[i]['to_g_id']=g_id;
                this.arrow_to[i]['to_a_id']=a_id;
                let arrow_from_tmp={};
                arrow_from_tmp['from_g_id']=this.arrow_to[i]['g_id'];
                arrow_from_tmp['from_a_id']=this.arrow_to[i]['a_id'];
                arrow_from_tmp['g_id']=g_id;
                arrow_from_tmp['a_id']=a_id;
                arrow_from_tmp['id']=id;
                this.arrow_from.push(arrow_from_tmp);
                break;
            }
        }
        // console.log(this.arrow_to);
        // console.log(this.arrow_from);
    }
    update_arrow(g_id){
        let cursor=getCoreList();
        let position=getHoverPosition(g_id);
        for(let i=0;i<this.arrow_to.length;i++){
            if(this.arrow_to[i]['g_id']===g_id){
                let a_id=this.arrow_to[i]['a_id'];
                // P("cursors",[this.arrow_to[i]['id']]);
                // P("set_start",{x:position[a_id],y:position[a_id]})
            }
        }
        // P("cursors",cursor)
    }
}

let anchor_queue=new Anchor_queue();

export function anchor_add(g_id){
    anchor_queue.add(g_id);
}

export function anchor_update(g_id,type="normal"){
   return anchor_queue.update(g_id,type)
}

export function anchor_delete(g_id){
    anchor_queue.delete(g_id);
}

export function anchor_query(g_id){
    anchor_queue.query(g_id);
}

export function get_anchor_point(x,y){
    return anchor_queue.get_anchor_point(x,y);
}

export function anchor_arrow_add(g_id,a_id){
    anchor_queue.anchor_arrow_add(g_id,a_id);
}

export function anchor_arrow_link(g_id,a_id){
    anchor_queue.anchor_arrow_link(g_id,a_id);
}

export function update_anchor_map(position_old,position_new,g_id){
    anchor_queue.update_anchor_map(position_old,position_new,g_id);
}

export function update_arrow(g_id){
    anchor_queue.update_arrow(g_id);
}