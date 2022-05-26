import {getCoreList} from "@/js/element/core/core_queue";
import {getModuleBySid} from "@/js/element/module/module_queue";
import {P} from "@/js/action/actionQueue";

export function updateTextSet(){
    // P("get_theta",{})
    let coreList=getCoreList();
    if(coreList.length>1){
        // setPosition({flag:false})
        // setElementSize({flag:false})
    }else{
        // P("get_rect",{})
        P("get_alignment",{})
        P("get_html",{})
        P("get_spacing",{})
    }
}