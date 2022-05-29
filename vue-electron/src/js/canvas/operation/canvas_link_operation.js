import {getCoreList} from "@/js/element/core/core_queue";
import {getTree} from "@/js/element/module/module_tree";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {P} from "@/js/action/actionQueue";
import {getAlias} from "../../element/module/module_tree";

export function updateLink(){



    let flag=true;
    let coreList=getCoreList();
    if(coreList.length>1){
        return;
    }
    // console.log(coreList.length);
    P("get_scale_bind",{})
    P("get_rotate_bind",{})
    P("get_flip_bind",{})
    P("get_move_bind",{})

    if(coreList.length===1){
        let element=getModuleByGid(coreList[0])
        if(!element.show){
            flag=false;
        }
    }
    setGroupType(flag)
    if(coreList.length!==1)return;
    let id=coreList[0];
    let msg=getTree(id);
    DrawRelation(msg)

    let alias=getAlias(id);
    alias_update(alias)
}