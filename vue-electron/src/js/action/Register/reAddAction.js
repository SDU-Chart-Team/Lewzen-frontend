import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, updateCMD} from "@/js/action/actionQueue";
import {createModule} from "@/js/element/module/module_queue";
import {addModuleToTree} from "@/js/element/module/module_tree";
import {getTypeById} from "../../element/module/module_tree";
import {createLine} from "../../element/module/module_queue";
import {reAddLine} from "../../element/anchor/arrow_Queue";

export class ReAddAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        this.ids=msg['ids'];
        // console.log(msg);
        // console.log(cmd);
        // console.log(this.ids);
    }

    before(){

    }

    after(){
        for(let i=0;i<this.ids.length;i++){
            let msg={}
            msg['id']=this.ids[i];
            let node=document.getElementById(msg['id']);
            msg['type']=getTypeById(msg['id']);
            let display=node.style.display;
            // console.log(display);
            let show=true;
            if(display!==undefined){
                if(display==="none"){show=false;}
            }
            msg['show']=show;

            if(msg['type']==="line"){
                createLine(msg)
                reAddLine(this.ids[i]);
            }else{
                createModule(msg);
            }
            addModuleToTree(this.ids[i],msg['type']);
        }
        P("cursors",{ids:this.ids})
    }

    forward(){
        return null;
    }

    backward(){
        return null;
    }

    merge(action){
        return false;
    }

}

export function createReAddAction(msg,flag){//time
    let val={}
    val["command"]="readd";
    val['flag']=flag;
    let cmd=JSON.stringify(val);

    sendSocket({cmd:cmd})
}