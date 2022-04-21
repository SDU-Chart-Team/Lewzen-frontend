import {DomOperator} from "@/js/dom/domOperation";

class CanvasAction {

}

export function getCanvasShape(){
    let domOperator=new DomOperator();
    let attrs_need=['width','height'];
    let attrs=domOperator.getAttrById("mySvg", attrs_need);
    // console.log(attrs);
    attrs['height']=parseInt(attrs['height'].substr(0,attrs['height'].length-2));
    attrs['width']=parseInt(attrs['width'].substr(0,attrs['width'].length-2));
    return attrs;
}