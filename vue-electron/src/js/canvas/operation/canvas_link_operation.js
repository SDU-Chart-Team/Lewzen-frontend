import {getCoreList} from "@/js/element/core/core_queue";
import {getTree} from "@/js/element/module/module_tree";
import {getModuleByGid} from "@/js/element/module/module_queue";

export function updateLink(){

    let flag=true;

    let coreList=getCoreList();

    if(coreList.length===1){
        let element=getModuleByGid(coreList[0])
        if(!element.show){
            flag=false;
        }
    }
    setGroupType(flag)
    if(coreList.length>1)return;
    let id=coreList[0];
    let msg=getTree(id);
    DrawRelation(msg)
}