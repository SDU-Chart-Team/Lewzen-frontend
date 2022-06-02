import {P} from "@/js/action/actionQueue";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {getCoreList} from "@/js/element/core/core_queue";
import {getShapeMapId} from "@/js/util/getCanvasIdOperation";

let aliasCounter={
    circle:0,
    ellipse:0,
    rectangle:0,
    callout:0,
    cross:0,
    cylinder:0,
    data_storage:0,
    double_arrow:0,
    step:0,
    tee:0,
    user:0,
    and:0,
    diamond:0,
    envelope:0,
    corner:0,
    rounded_rectangle:0,
    star:0,
    triangle:0,
    big_arrow_left:0,
    isometric_cube:0,
    trapezoid:0,
    parallelogram:0,
    hexagon:0,


    arrow_right:0,
    arrow_left:0,
    arrow_up:0,
    arrow_down:0,
    chevron:0,
    notched:0,

    annotation:0,
    collate:0,
    data:0,
    delay:0,
    display:0,
    document:0,
    internal_storage:0,
    manual_input:0,
    plus:0,
    tape:0,
    card:0,
    off_page_connector:0,
    process:0,
    preparation:0,
    sort:0,
    start:0,
    terminator:0,
    tape_data:0,
    decision:0,
    stored_data:0,
    manual_operation:0,
    normal_process:0,


    entity:0,
    relation:0,
    weak_relation:0,

    actor:0,
    use_case:0,
    package:0,
    swimming_lane:0,
    frame:0,
    notes:0,
    interfaces_classes:0,
    classes:0,
    activities:0,
    multi_instance_class:0,
    send_signal:0,
    receive_signal:0,
    time_signal:0,
    delete:0,
    element:0,
    lifeline:0,
    generalize:0,
    generalize_all:0,
    bind:0,
    entity_circle:0,

    line:0,
}
//rectangle_1;link;rectangle_2
class Module_tree {
    constructor() {
        this.head=[]
        this.aliasList={}
        this.nameList={}
        this.typeList={}
        this.nodeList={}//id not alias
    }

    addModule(id,type){
        if(this.nodeList[id]!==undefined)return;
        let counter=++aliasCounter[type];
        this.aliasList[type+"_"+counter]=id;
        this.nameList[id]=type+"_"+counter;
        this.typeList[id]=type;
        // console.log(this.aliasList);
        // console.log(this.nameList);
        let item={};
        item['id']=this.nameList[id];
        item['children']=[];
        item['tid']=this.head.length;
        item['father']=this.head.length;
        item['theta']=0;
        this.nodeList[id]=this.head.length;
        this.head.push(item);
        // console.log(this.head);
    }




    //别名link
    linkByAlias(id1,id2,flag=true){
        // console.log(this.head);
        P("link",{id1:this.aliasList[id1],id2:this.aliasList[id2]},flag)
    }
    //id link
    linkById(id1,id2,flag=true){
        id1=this.nameList[id1];
        id2=this.nameList[id2];
        this.linkByAlias(id1,id2,flag);
    }

    linkInTree(id1,id2){
        id1=this.nameList[id1];
        id2=this.nameList[id2];
        let module1="";
        let module2="";
        //找到两个节点
        for(var i=0;i<this.head.length;i++){
            if(this.head[i]['id']===id1){
                module1=i;
                break;
            }
        }
        for(var i=0;i<this.head.length;i++){
            if(this.head[i]['id']===id2){
                module2=this.head[i];
                this.head[module1]['father']=module2['tid'];
                module2['children'].push(this.head[module1]['tid']);
                break;
            }
        }
        // console.log(this.head)

    }

    unlinkInTree(id1,id2){
        id1=this.nameList[id1];
        id2=this.nameList[id2];
        let module1="";
        let module2="";
        //找到两个节点
        for(var i=0;i<this.head.length;i++){
            if(this.head[i]['id']===id1){
                module1=i;
                this.head[i]['father']=this.head[i]['tid'];
                break;
            }
        }
        for(var i=0;i<this.head.length;i++){
            if(this.head[i]['id']===id2){
                module2=this.head[i];
                for(let i=0;i<module2['children'].length;i++){
                    if(module2['children'][i]===this.head[module1]['tid']){
                        module2['children'].splice(i,1);
                        break;
                    }
                }
                // module2['children'].push(this.head[module1]['tid']);
                // break;
            }
        }
        // console.log(this.head)
    }



    getRelationById(id){
        let now=this.nodeList[id];
        // console.log(now);
        // console.log(this.head);
        while(true){
            if(this.head[now]['tid']!==this.head[now]['father']){
                now=this.head[now]['father'];
            }else{
                break;
            }
        }
        let msg=this.getTree(now,0);
        return msg
        // console.log(id);
        // console.log(list)
    }

    setTreeSonTheta(id,theta){
        let list=[]
        let now=this.nodeList[id];
        let queue=[];
        queue.push(now);
        list.push(now);
        this.head[now]['theta']=theta;
        let core_list=getCoreList();
        while(queue.length!==0){
            let node=queue[0];
            list.push(node);
            queue.splice(0,1);
            let children=this.head[node]['children'];
            for(let i=0;i<children.length;i++){
                queue.push(children[i]);
                let nod=this.aliasList[this.head[children[i]]['id']];
                // console.log(nod);
                let element=getModuleByGid(nod);
                element.theta=this.head[node]['theta']+this.head[children[i]]['theta'];

                // console.log(element.g_id,element.theta)
            }
        }
    }

    setTreeSonCenter(id,center){
        let list=[]
        let now=this.nodeList[id];
        let queue=[];
        queue.push(now);
        while(queue.length!==0){
            let node=queue[0];
            // list.push(node);
            queue.splice(0,1);
            let children=this.head[node]['children'];
            for(let i=0;i<children.length;i++){
                queue.push(children[i]);
                let nod=this.aliasList[this.head[children[i]]['id']];
                list.push(nod);
                // console.log(nod);
                // let element=getModuleByGid(nod);
            }
        }
        for(let i=0;i<list.length;i++){
            let element=getModuleByGid(list[i])
            element.center_x=center['x'];
            element.center_y=center['y'];
            // console.log(list[i])
            // console.log(element.center_y)
            // console.log(element.center_x)
        }
        // let core_list=getCoreList();
        // P("cursors",list);
        // P("get_center",{})
        // P("cursors",core_list)
    }

    getChildren(id){
        let list=[]
        let now=this.nodeList[id];
        let queue=[];
        queue.push(now);
        while(queue.length!==0){
            let node=queue[0];
            // list.push(node);
            queue.splice(0,1);
            let children=this.head[node]['children'];
            for(let i=0;i<children.length;i++){
                queue.push(children[i]);
                let nod=this.aliasList[this.head[children[i]]['id']];
                list.push(nod);
                // console.log(nod);
                // let element=getModuleByGid(nod);
            }
        }
        let list_order=[];
        let map={};
        for(let i=0;i<list.length;i++){
            map[list[i]]=1;
        }
        let children=document.getElementById(getShapeMapId()).childNodes;
        for(let i=0;i<children.length;i++){
            if(map[children[i].getAttribute("id")]!==undefined){
                list_order.push(children[i].getAttribute("id"));
            }
        }

        return list_order;
    }
    getChildrenOneList(id){
        let list=[]
        let now=this.nodeList[id];
        let queue=[];
        queue.push(now);
        while(queue.length!==0){
            let node=queue[0];
            // list.push(node);
            queue.splice(0,1);
            let children=this.head[node]['children'];
            for(let i=0;i<children.length;i++){
                // queue.push(children[i]);
                let nod=this.aliasList[this.head[children[i]]['id']];
                list.push(nod);
                // console.log(nod);
                // let element=getModuleByGid(nod);
            }
        }
        let list_order=[];
        let map={};
        for(let i=0;i<list.length;i++){
            map[list[i]]=1;
        }
        let children=document.getElementById(getShapeMapId()).childNodes;
        for(let i=0;i<children.length;i++){
            if(map[children[i].getAttribute("id")]!==undefined){
                list_order.push(children[i].getAttribute("id"));
            }
        }

        return list_order;
    }

    getTree(now,width){
        let linkList=[];
        let nodeList=[];
        let queue=[];
        let node={id:this.head[now]['id'],width:width,tid:this.head[now]['tid'],eid:this.aliasList[this.head[now]['id']]}
        queue.push(node);
        while(queue.length!==0){
            let node=queue[0];
            queue.splice(0,1);
            nodeList.push(node);
            let tid=node['tid'];
            let children=this.head[tid]['children'];
            for(let i=0;i<children.length;i++){
                let child=this.head[children[i]];
                let nod={id:child['id'],width:node['width']+1,tid:child['tid'],eid:this.aliasList[child['id']]};
                linkList.push({source:node['id'],target:nod['id']});
                queue.push(nod)
            }
        }
        let msg={node:nodeList,link:linkList};
        return msg;
    }
    // getTree(now,width){
    //     let linkList=[];
    //     let nodeList=[];
    //     let node={id:this.head[now]['id'],width:width}
    //     nodeList.push(node);
    //     // console.log(nodeList)
    //     for(var i=0;i<this.head[now]['children'].length;i++){
    //         let child=this.head[now]['children'][i];
    //         let link={}
    //         link['source']=this.head[now]['id'];
    //         link['target']=this.head[child]['id'];
    //         linkList.push(link);
    //         let msg=this.getTree(child,width+1);
    //         let nodList=msg['node'];
    //         let list=msg['link'];
    //         for(let j=0;j<list.length;j++){
    //             linkList.push(list[i]);
    //         }
    //         for(let j=0;j<nodList.length;j++){
    //             nodeList.push(nodList[j]);
    //         }
    //     }
    //     // console.log(linkList);
    //     let msg={node:nodeList,link:linkList};
    //     return msg;
    // }
    //得到第几层的祖先，最上面是第0层
    getAncestor(id,width){
        let path=[]
        let now=this.nodeList[id];
        path.push(now);
        console.log(now);
        while(true){
            if(this.head[now]['tid']!==this.head[now]['father']){
                now=this.head[now]['father'];
                path.push(now);
            }else{
                break;
            }
        }
        path.reverse();
        // console.log(path);
        if(width>=path.length)return undefined;
        return this.aliasList[this.head[path[width]]['id']]
    }
    getAncestorAll(id){
        let path=[]
        let now=this.nodeList[id];
        path.push(now);
        // console.log(now);
        // console.log(this.head)
        while(true){
            if(this.head[now]['tid']!==this.head[now]['father']){
                now=this.head[now]['father'];
                path.push(now);
            }else{
                break;
            }
        }
        path.reverse();
        for(let i=0;i<path.length;i++){
            path[i]=this.aliasList[this.head[path[i]]['id']]
        }
        return path;
    }

    deleteById(id){
        let now=this.nodeList[id];
        let father=this.head[now]['father']
        if(father!==now){
            father=this.head[father];

            for(let i=0;i<this.head[now]['children'].length;i++){
                if(father['children'][i]===this.head[now]['tid']){
                    father['children'].splice(i,1);
                }
            }
        }
        let children=this.head[now]['children']
        for(let i=0;i<children.length;i++){
            let child=this.head[children[i]]['tid'];
            child=this.head[child];
            child['father']=child['tid'];
        }
        this.head[now]["father"]=this.head[now]['tid']
        this.head[now]["children"]=[]
        // console.log(this.head)
    }

    setAlias(alias){
        let id=getCoreList()[0];
        if(this.aliasList[alias]!==undefined){
            alert("alias repeat")
            return;
        }
        let alias_before=this.nameList[id];
        for(let i=0;i<this.head.length;i++){
            if(this.head[i]['id']===alias_before){
                this.head[i]['id']=alias;
                this.nameList[id]=alias;
                this.aliasList[alias]=this.aliasList[alias_before];
                this.aliasList[alias_before]=null;
                return;
            }
        }
    }
    getAlias(id){
        return this.nameList[id];
    }

    getTypeById(id){
        return this.typeList[id];
    }

    clear(){
        this.head=[]
        this.aliasList={}
        this.nameList={}
        this.typeList={}
        this.nodeList={}//id not alias
    }
}


export function clearTree(){
    module_tree.clear();
}

let module_tree=new Module_tree();

function Trim(str)
{
    if(str===undefined)return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


export function linkByUser(link_text) {
    link_text=link_text.split(";");
    if(link_text.length!==3||(Trim(link_text[1])!=="unlink"&&Trim(link_text[1])!=="link")){
        alert("invalid")
    }
    let id1=Trim(link_text[0])
    let command=Trim(link_text[1])
    let id2=Trim(link_text[2])
    if (command==="link"){
        module_tree.linkByAlias(id1,id2);
    }
}

export function linkByGroup(id1,id2){
    module_tree.linkById(id1,id2,false);
}

export function addModuleToTree(id,type) {
    module_tree.addModule(id,type);
}
export function linkInTree(id1,id2) {
    module_tree.linkInTree(id1,id2);
}

export function unlinkInTree(id1,id2){
    module_tree.unlinkInTree(id1,id2);
}

export function getTree(id){
    return module_tree.getRelationById(id);
}

export function getAncestor(id,width){
    return module_tree.getAncestor(id,width);
}

export function getAncestorAll(id){
    return module_tree.getAncestorAll(id)
}
export function deleteTreeNodeById(id){
    return module_tree.deleteById(id);
}
export function setTreeSonTheta(id,theta){
    return module_tree.setTreeSonTheta(id,theta);
}

export function setTreeSonCenter(id,center){
    return module_tree.setTreeSonCenter(id,center);
}

export function getChildren(id) {
    return module_tree.getChildren(id);
}

export function getChildrenOneList(id) {
    return module_tree.getChildrenOneList(id);
}


export function setAlias(alias){
    module_tree.setAlias(alias);
}
export function getAlias(id){
    return module_tree.getAlias(id);
}
export function getTypeById(id){
    return module_tree.getTypeById(id);
}