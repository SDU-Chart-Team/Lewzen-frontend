import {Base_action} from "@/js/action/base_action";
import {elementScale} from "@/js/svg";
import {DomOperator} from "@/js/dom/domOperation";
import {addAction} from "@/js/action/actionQueue";
import {getDomBySvgId} from "@/js/element/elementQueue";

export class El_delete_action extends Base_action{
    constructor(type,elements,visible) {
        super(type);
        this.elements=elements;
        this.visible=visible;
    }
    forward() {
        setVisible(this.elements,this.visible)
    }
    backward() {
        setVisible(this.elements,!this.visible)
    }
}

export function setVisible(elements,visible){
    let domOperator=new DomOperator();
    console.log(elements,visible);
    for(var i=0;i<elements.length;i++){
        if(!visible){
            // domOperator.removeChildById(elements[i]['g_id'],elements[i]['svg_id']);
            document.getElementById(elements[i]['svg_id']).style.display="none";

        }else{
            // let node=getDomBySvgId(elements[i]['svg_id'])
            // console.log(node)
            // domOperator.appendChildById(elements[i]['g_id'],node);
            document.getElementById(elements[i]['svg_id']).style.display="block";
        }
    }
}