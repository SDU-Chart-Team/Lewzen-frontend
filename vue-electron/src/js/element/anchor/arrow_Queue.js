import {getHoverPosition} from "@/svgParser/hoverProcessor";
import ar from "element-ui/src/locale/lang/ar";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {getCoreList} from "@/js/element/core/core_queue";
import {P} from "@/js/action/actionQueue";

class Arrow_Queue {
    constructor() {
        this.arrowList=[];
        this.fromarrowList={};
        this.toarrowList={};
        this.updateStartList={};
        this.updateEndList={};
    }

    add_arrow(id,from_id,from_a_id,to_id,to_a_id){
        if(id===undefined)return;
        // console.log(from_id,a_id,line_id)
        let arrow={}
        arrow['id']=id;
        arrow['from_id']=from_id;
        arrow['from_a_id']=from_a_id;
        arrow['to_id']=to_id;
        arrow['to_a_id']=to_a_id;
        this.arrowList.push(arrow);
        if(this.fromarrowList[from_id]===undefined){
            this.fromarrowList[from_id]=[];
        }
        this.fromarrowList[from_id].push({a_id:from_a_id,id:id});
        if(this.toarrowList[to_id]===undefined){
            this.toarrowList[to_id]=[];
        }
        this.toarrowList[to_id].push({a_id:to_a_id,id:id})
    }
    add_arrow_from(from_id,a_id,id){
        // console.log(from_id,a_id,id)
        if(from_id===undefined){
            for(let i=0;i<this.arrowList.length;i++){
                if(id===this.arrowList[i]['id']){
                    let from_id=this.arrowList[i]['from_id']
                    this.arrowList['from_id']=undefined;
                    this.arrowList['from_a_id']=undefined;
                    // console.log(this.arrowList);
                    // console.log(this.fromarrowList[from_id])
                    // console.log(from_id)
                    if(this.fromarrowList[from_id]===undefined){
                        return;
                    }
                    for(let j=0;j<this.fromarrowList[from_id].length;j++){
                        if(this.fromarrowList[from_id][j]['id']===id){
                            this.fromarrowList[from_id].splice(j,1);
                            // console.log(this.fromarrowList[from_id])
                            return;
                        }
                    }
                }
            }
        }

        // console.log(from_id,a_id,line_id)
        let arrow={}
        arrow['id']=id;
        arrow['from_id']=from_id;
        arrow['from_a_id']=a_id;
        this.arrowList.push(arrow);
        if(this.fromarrowList[from_id]===undefined){
            this.fromarrowList[from_id]=[];
        }
        this.fromarrowList[from_id].push({a_id:a_id,id:id});


    }
    add_arrow_to(to_id,a_id,line_id){
        // console.log(to_id,a_id,line_id)
        // alert(1);
        if(to_id===undefined){
            // console.log(111);
            for(let i=0;i<this.arrowList.length;i++){
                if(line_id===this.arrowList[i]['id']){
                    // console.log(111);

                    let to_id=this.arrowList[i]['to_id'];
                    this.arrowList['to_id']=undefined;
                    this.arrowList['to_a_id']=undefined;
                    if(this.toarrowList[to_id]===undefined){
                        return;
                    }
                    for(let j=0;j<this.toarrowList[to_id].length;j++){
                        if(this.toarrowList[to_id][j]['id']===line_id){
                            this.toarrowList[to_id].splice(j,1);
                            return;
                        }
                    }
                }
            }
        }

        for(let i=0;i<this.arrowList.length;i++){
            if(line_id===this.arrowList[i]['id']){
                this.arrowList['to_id']=to_id;
                this.arrowList['to_a_id']=a_id;
                if(this.toarrowList[to_id]===undefined){
                    this.toarrowList[to_id]=[];
                }
                this.toarrowList[to_id].push({a_id:a_id,id:line_id})

                break;
            }
        }
        // console.log(this.toarrowList);
        // console.log(this.fromarrowList);
    }

    update_arrow_by_g_id(g_id){
        for(let i=0;i<this.arrowList.length;i++){
            if(g_id===this.arrowList[i]['to_id']){
                let line_id=this.arrowList[i]['line_id'];
                let line=document.getElementById(line_id);
                let position=getHoverPosition(g_id);
                line.setAttribute("x2",position[this.arrowList[i]['to_a_id']]['cx'])
                line.setAttribute("y2",position[this.arrowList[i]['to_a_id']]['cy'])
            }
        }
        for(let i=0;i<this.arrowList.length;i++){
            if(g_id===this.arrowList[i]['from_id']){
                let line_id=this.arrowList[i]['line_id'];
                let line=document.getElementById(line_id);
                let position=getHoverPosition(g_id);
                line.setAttribute("x1",position[this.arrowList[i]['from_a_id']]['cx'])
                line.setAttribute("y1",position[this.arrowList[i]['from_a_id']]['cy'])
            }
        }
    }

    update_position_by_gid(g_id){
        let coreList=getCoreList();
        let mat_mul = (mat, p) => [p[0]*mat[0]+p[1]*mat[2],p[0]*mat[1]+p[1]*mat[3]];
        let mat=window.getComputedStyle(document.getElementById(g_id), null).getPropertyValue("transform");
        let rotation=[1,0,0,1]
        let translate=[0,0];
        if (mat!==undefined&&mat!=='none') {
            mat=mat.match(/\(([^)]+)\)/)[1].split(',').map(v=>Number(v));
            rotation=mat.splice(0,4);
            translate=mat.splice(0,2);
            // console.log(rotation, translate)
        }
        let toList=this.toarrowList[g_id];
        let fromList=this.fromarrowList[g_id];
        // console.log(fromList)
        // console.log(toList)
        let position=getHoverPosition(g_id);
        let element=getModuleByGid(g_id);
        let center_x=element.center_x;
        let center_y=element.center_y;
        if(center_x===undefined)return;
        for(let i=0;i<position.length;i++){
            // console.log(center_x);
            // console.log(center_y);

            let x=position[i]['cx'];
            let y=position[i]['cy'];
            let rp = mat_mul(rotation, [x, y]); rp=[rp[0]+translate[0],rp[1]+translate[1]];
            position[i]['cx']=rp[0];
            position[i]['cy']=rp[1];
        }
        // console.log(toList);
        // console.log(fromList);
        if(toList!==undefined){
            for(let i=0;i<toList.length;i++){
                let line_id=toList[i]['id']
                let line=document.getElementById(line_id);
                if(line===undefined)continue;
                let node=line.childNodes[0];
                if(node===undefined)continue;
                let d=node.getAttribute('d');
                d=Trim(d)
                // console.log(d)
                // console.log(node.getTotalLength())
                d=d.split(' ')
                d[d.length-1]=position[toList[i]['a_id']]['cy']
                d[d.length-2]=position[toList[i]['a_id']]['cx']
                this.updateEndList[toList[i]['id']]=1;
                let tmp=''
                for(let i=0;i<d.length;i++)tmp+=d[i]+" ";
                // console.log(tmp)
                node.setAttribute("d",tmp);

                // P("cursor",{ids:[line_id]})
                // P("set_end",{x:position[toList[i]['a_id']]['cx'],y:position[toList[i]['a_id']]['cy']})
                // line.setAttribute("x2",position[toList[i]['a_id']]['cx'])
                // line.setAttribute("y2",position[toList[i]['a_id']]['cy'])
            }
        }
        if(fromList!==undefined){
            for(let i=0;i<fromList.length;i++){
                let line_id=fromList[i]['id']
                let line=document.getElementById(line_id);
                // console.log(line);
                if(line===undefined)continue;
                let node=line.childNodes[0];
                if(node===undefined)continue;
                let d=node.getAttribute('d');
                // console.log(d)
                d=Trim(d)
                // console.log(node.getTotalLength())
                d=d.split(' ')
                d[1]=position[fromList[i]['a_id']]['cx']
                d[2]=position[fromList[i]['a_id']]['cy']
                this.updateStartList[fromList[i]['id']]=1;
                let tmp='';
                for(let i=0;i<d.length;i++)tmp+=d[i]+" ";
                // P("cursor",{ids:[line_id]})
                // P("set_start",{x:position[fromList[i]['a_id']]['cx'],y:position[fromList[i]['a_id']]['cy']})
                node.setAttribute("d",tmp);
                // console.log(tmp)
                // line.setAttribute("x1",position[fromList[i]['a_id']]['cx'])
                // line.setAttribute("y1",position[fromList[i]['a_id']]['cy'])
            }
        }
        // P("cursors",{ids:coreList})

    }
    updateStyleAfterChange(){
        let coreList=getCoreList();

        // for(let i=0;i<=this.updateEndList.length;i++){
        //
        //     P("cursors",[this.updateEndList[i]['id']])
        //     P("set_end",{x:this.updateEndList[i]['x'],y:this.updateEndList[i]['y']})
        // }
        // for(let i=0;i<=this.updateStartList.length;i++){
        //     P("cursors",[this.updateStartList[i]['id']])
        //     P("set_start",{x:this.updateStartList[i]['x'],y:this.updateStartList[i]['y']})
        // }
        // console.log(this.updateStartList);
        // console.log(this.updateEndList);
        for(let key in this.updateStartList){
            let line=document.getElementById(key);
            // console.log(line);
            if(line===undefined)continue;
            let node=line.childNodes[0];
            if(node===undefined)continue;

            let d=node.getAttribute('d');
            d=Trim(d)
            // console.log(node.getTotalLength())
            d=d.split(' ')

            P("cursors",{ids:[key]})
            P("set_start",{x:parseInt(d[1]),y:parseInt(d[2])})
        }

        for(let key in this.updateEndList){
            let line=document.getElementById(key);
            // console.log(line);
            if(line===undefined)continue;
            let node=line.childNodes[0];
            if(node===undefined)continue;
            let d=node.getAttribute('d');
            d=Trim(d)
            // console.log(node.getTotalLength())
            d=d.split(' ')
            P("cursors",{ids:[key]})
            // console.log(key)
            P("set_end",{x:parseInt(d[d.length-2]),y:parseInt(d[d.length-1])})
        }
        // console.log(coreList);
        P("cursors",{ids:coreList});
        this.updateEndList={};
        this.updateStartList={};
    }

    clear(){
        this.arrowList=[];
        this.updateStartList={};
        this.updateEndList={};
        this.fromarrowList={};
        this.toarrowList={};
    }
}

export function clearArrow(){
    arrowQueue.clear();
}
let arrowQueue=new Arrow_Queue();
export function add_arrow(id,from_id,from_a_id,to_id,to_a_id){
    arrowQueue.add_arrow(id,from_id,from_a_id,to_id,to_a_id);
}

export function add_arrow_to(to_id,a_id,line_id){
    arrowQueue.add_arrow_to(to_id,a_id,line_id);
}

export function add_arrow_from(from_id,a_id,line_id){
    arrowQueue.add_arrow_from(from_id,a_id,line_id);
}

export function update_position_by_gid(g_id){
    arrowQueue.update_position_by_gid(g_id)
}
export function updateStyleAfterChange(){
    arrowQueue.updateStyleAfterChange();
}
function Trim(str)
{
    if(str===undefined)return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}