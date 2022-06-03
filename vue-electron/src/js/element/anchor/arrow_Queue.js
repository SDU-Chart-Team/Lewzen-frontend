import {getHoverPosition} from "@/svgParser/hoverProcessor";
import ar from "element-ui/src/locale/lang/ar";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {getCoreList} from "@/js/element/core/core_queue";
import {P} from "@/js/action/actionQueue";
import {createArrowFromNullAction} from "../../action/ComponentLinear/setArrowFromNullAction";
import {createArrowToNullAction} from "../../action/ComponentLinear/setArrowToNullAction";

class Arrow_Queue {
    constructor() {
        this.arrowList={};
        this.fromarrowList={};
        this.toarrowList={};
        this.updateStartList={};
        this.updateEndList={};

    }

    add_arrow(id,from_id,from_a_id,to_id,to_a_id){
        // if(id===undefined)return;
        // // console.log(from_id,a_id,line_id)
        // let arrow={}
        // arrow['id']=id;
        // arrow['from_id']=from_id;
        // arrow['from_a_id']=from_a_id;
        // arrow['to_id']=to_id;
        // arrow['to_a_id']=to_a_id;
        // this.arrowList[id]=arrow;
        // if(this.fromarrowList[from_id]===undefined){
        //     this.fromarrowList[from_id]=[];
        // }
        // this.fromarrowList[from_id].push({a_id:from_a_id,id:id});
        // if(this.toarrowList[to_id]===undefined){
        //     this.toarrowList[to_id]=[];
        // }
        // this.toarrowList[to_id].push({a_id:to_a_id,id:id})
    }

    delete_arrow_from(id){
        // console.log(this.arrowList)
        // console.log(id);
        let from_id=this.arrowList[id]['from_id']
        this.arrowList[id]['from_id']=undefined;
        this.arrowList[id]['from_a_id']=undefined;
        let fromList=this.fromarrowList[from_id];
        // console.log(fromList);
        // console.log(this.fromarrowList)
        for(let i=0;i<fromList.length;i++){
            if(fromList[i]['id']===id){
                this.fromarrowList[from_id].splice(i,1);
                return;
            }
        }
    }

    add_arrow_from(from_id,a_id,id){
        // console.log(from_id,a_id,id);

        if(this.arrowList[id]===undefined){
            this.arrowList[id]={}
        }
        this.arrowList[id]['id']=id;
        this.arrowList[id]['from_id']=from_id;
        this.arrowList[id]['from_a_id']=a_id;
        if(this.fromarrowList[from_id]===undefined){
            this.fromarrowList[from_id]=[];
        }
        this.fromarrowList[from_id].push({a_id:a_id,id:id});
        // console.log(this.fromarrowList);
    }
    add_arrow_to(to_id,a_id,id){
        // console.log(to_id,a_id,id);
        if(this.arrowList[id]===undefined){
            this.arrowList[id]={};
        }
        this.arrowList[id]['id']=id;
        this.arrowList[id]['to_id']=to_id;
        this.arrowList[id]['to_a_id']=a_id;
        if(this.toarrowList[to_id]===undefined){
            this.toarrowList[to_id]=[];
        }

        this.toarrowList[to_id].push({a_id:a_id,id:id})
    }

    delete_arrow_to(id){
        // console.log(id);
        let to_id=this.arrowList[id]['to_id'];
        this.arrowList[id]['to_id']=undefined;
        this.arrowList[id]['to_a_id']=undefined;
        let toList=this.toarrowList[to_id];
        // console.log(toList);
        // console.log(this.toarrowList);
        for(let i=0;i<toList.length;i++){
            if(toList[i]['id']===id){
                this.toarrowList[to_id].splice(i,1);
                break;
            }
        }
    }

    update_arrow_by_g_id(g_id){
        // for(let i=0;i<this.arrowList.length;i++){
        //     if(g_id===this.arrowList[i]['to_id']){
        //         let line_id=this.arrowList[i]['line_id'];
        //         let line=document.getElementById(line_id);
        //         let position=getHoverPosition(g_id);
        //         line.setAttribute("x2",position[this.arrowList[i]['to_a_id']]['cx'])
        //         line.setAttribute("y2",position[this.arrowList[i]['to_a_id']]['cy'])
        //     }
        // }
        // for(let i=0;i<this.arrowList.length;i++){
        //     if(g_id===this.arrowList[i]['from_id']){
        //         let line_id=this.arrowList[i]['line_id'];
        //         let line=document.getElementById(line_id);
        //         let position=getHoverPosition(g_id);
        //         line.setAttribute("x1",position[this.arrowList[i]['from_a_id']]['cx'])
        //         line.setAttribute("y1",position[this.arrowList[i]['from_a_id']]['cy'])
        //     }
        // }
    }

    update_position_by_gid(g_id){
        // console.log(g_id);
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
        // console.log(this.fromarrowList);
        // console.log(g_id)
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
                this.updateEndList[toList[i]['id']]={x:d[d.length-2],y:d[d.length-1]};
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
                this.updateStartList[fromList[i]['id']]={x:d[1],y:d[2]};
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
        // console.log(new Date().getTime())
        let coreList=getCoreList();
        // console.log(this.updateStartList);
        // console.log(this.updateEndList);
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
            // console.log(new Date().getTime())

            // let d=node.getAttribute('d');
            // d=Trim(d)
            // // console.log(node.getTotalLength())
            // d=d.split(' ')

            let pointX=this.updateStartList[key]['x'];
            let pointY=this.updateStartList[key]['y'];

            // console.log(new Date().getTime())
            // console.log(new Date().getTime())

            P("cursor",{ids:[key]})
            // console.log(new Date().getTime())

            P("set_start",{x:pointX,y:pointY})
            // console.log(new Date().getTime())

        }


        for(let key in this.updateEndList){
            let line=document.getElementById(key);
            // console.log(line);
            if(line===undefined)continue;
            let node=line.childNodes[0];
            if(node===undefined)continue;
            // let d=node.getAttribute('d');
            // d=Trim(d)
            // // console.log(node.getTotalLength())
            // d=d.split(' ')
            let point_x=this.updateEndList[key]['x'];
            let point_y=this.updateEndList[key]['y'];
            P("cursor",{ids:[key]})
            // console.log(key)
            P("set_end",{x:point_x,y:point_y})
        }
        // console.log(coreList);
        // P("cursors",{ids:coreList});
        // console.log(new Date().getTime())

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


    removeLineFromQueue(g_id){
        // for(let i=0;i<this.arrowList.length;i++){
        //     if(this.arrowList[i]['id']===g_id){
        //         let from_id=this.arrowList[i]['from_id'];
        //         let to_id=this.arrowList[i]['to_id'];
        //         if(from_id!==undefined){
        //             let fromList=this.fromarrowList[from_id];
        //             if(fromList!==undefined){
        //                 for(let j=0;j<fromList.length;j++){
        //                     if(fromList[j]['id']===g_id){
        //
        //
        //
        //                         this.fromarrowList[from_id].splice(j,1);
        //                     }
        //                 }
        //             }
        //         }
        //         if(to_id!==undefined){
        //             let toList=this.toarrowList[to_id];
        //             // console.log(toList);
        //             if(toList!==undefined){
        //                 for(let j=0;j<toList.length;j++){
        //                     if(toList[j]['id']===g_id){
        //                         this.toarrowList[to_id].splice(j,1);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // console.log(this.arrowList);
        // console.log(this.toarrowList);
        // console.log(this.fromarrowList);
    }

    reAddLine(g_id){
        // for(let i=0;i<this.arrowList.length;i++){
        //     if(this.arrowList[i]['id']===g_id){
        //         let from_id=this.arrowList[i]['from_id'];
        //         let to_id=this.arrowList[i]['to_id'];
        //         if(from_id!==undefined){
        //             let fromList=this.fromarrowList[from_id];
        //             if(fromList!==undefined){
        //                 this.fromarrowList[from_id]=[];
        //             }
        //             this.fromarrowList[from_id].push({a_id:this.arrowList[i]['from_a_id'],id:g_id})
        //         }
        //         if(to_id!==undefined){
        //             let toList=this.toarrowList[to_id];
        //             if(toList!==undefined){
        //                 this.toarrowList[to_id]=[];
        //             }
        //             this.toarrowList[to_id].push({a_id:this.arrowList[i]['to_a_id'],id:g_id})
        //         }
        //     }
        // }
    }


    BeforeDeleteElement(g_id){//删除元素之前要进行的操作
        let from_list=this.fromarrowList[g_id];
        let to_list=this.toarrowList[g_id];
        if(from_list!==undefined){
            for(let i=0;i<from_list.length;i++){
                let val={
                    command:"arrow_from_null",
                    flag:true
                };
                let msg={g_id:g_id,line_id:from_list[i]['id'],a_id:from_list[i]['a_id']}
                createArrowFromNullAction(val,msg);
            }
        }
        if(to_list!==undefined){
            for(let j=0;j<to_list.length;j++){
                let val={
                    command:"arrow_to_null",
                    flag:true
                };
                let msg={g_id:g_id,line_id:from_list[i]['id'],a_id:from_list[i]['a_id']}
                createArrowToNullAction(val,msg);
            }
        }
    }

    BeforeDeleteLine(g_id){//删除line之前要进行的操作
        let arrow=this.arrowList[g_id];
        if(arrow['from_id']!==undefined){
            let val={
                command:"arrow_from_null",
                flag:true
            };
            let msg={g_id:arrow['from_id'],line_id:g_id,a_id:arrow['from_a_id']}
            createArrowFromNullAction(val,msg);
        }
        if(arrow['to_id']!==undefined){
            let val={
                command:"arrow_to_null",
                flag:true
            };
            let msg={g_id:arrow['to_id'],line_id:g_id,a_id:arrow['to_a_id']}
            createArrowToNullAction(val,msg);
        }
    }


    getArrow(g_id){
        return this.arrowList[g_id];
    }

    getArrowList(){
        return this.arrowList;
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

export function delete_arrow_to(id){
    arrowQueue.delete_arrow_to(id);
}

export function delete_arrow_from(id){
    arrowQueue.delete_arrow_from(id);
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

export function removeLineFromQueue(g_id){
    arrowQueue.removeLineFromQueue(g_id);
}


export function reAddLine(g_id){
    arrowQueue.reAddLine(g_id);
}

export function BeforeDeleteElement(g_id){
    arrowQueue.BeforeDeleteElement(g_id);
}

export function BeforeDeleteLine(g_id){
    arrowQueue.BeforeDeleteLine(g_id);
}

export function getArrow(g_id) {
    return arrowQueue.getArrow(g_id);
}

export function getArrowList(){
    return arrowQueue.getArrowList();
}