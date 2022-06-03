import {getCoreList} from "@/js/element/core/core_queue";
import {getModuleBySid} from "@/js/element/module/module_queue";
import {P} from "@/js/action/actionQueue";
import {getModuleByGid} from "../../element/module/module_queue";

export function updateTextSet(){
    // P("get_theta",{})
    let coreList=getCoreList();
    if(coreList.length>1){
        offText();
        // setPosition({flag:false})
        // setElementSize({flag:false})
    }else if(coreList.length===1){
        let element=getModuleByGid(coreList[0]);
        if(element.isLine){
            offText();
            return;
        }
        onText();
        // P("get_rect",{})
        P("get_alignment",{})
        P("get_html",{})
        P("get_spacing",{})
    }
}