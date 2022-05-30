import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, getState, P} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {getChildren, getTree, setTreeSonTheta} from "@/js/element/module/module_tree";
import {updateGuide} from "@/js/element/guide/guide_queue";
import {guideSet} from "@/js/canvas/base_canvas";
import {update_position_by_gid} from "@/js/element/anchor/arrow_Queue";
import {updateStyleAfterChange} from "../../element/anchor/arrow_Queue";

export class SetThetaAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
        this.core=[];
        this.state={};
    }

    before(){
    }


    after(){
        let coreList=getCoreList();
        this.core=coreList;
        this.state=getState();
        for(let i=0;i<coreList.length;i++){
            let module=getModuleByGid(coreList[i]);
            module.theta=this.msg['theta'];
            setTreeSonTheta(coreList[i],this.msg['theta'])
        }

        let ids=getCoreList();
        for(let i=0;i<ids.length;i++){
            // console.log(this.msg);
            // anchor_update(this.ids[i])
            // update_arrow(this.ids[i])
            update_position_by_gid(ids[i])
            let list=getChildren(ids[i])
            for(let j=0;j<list.length;j++){
                update_position_by_gid(list[j])
            }
        }

    }

    forward(){
        P("cursors",{ids:this.core},false);
        P("set_theta",{theta:this.msg['theta']},false)
        P("cursors",{ids:this.core},false)
        updateStyleAfterChange()

    }

    backward(){
        P("cursors",{ids:this.core},false);
        P("set_theta",{theta:this.state['theta']},false)
        P("cursors",{ids:this.core},false)
        updateStyleAfterChange()
    }

    merge(action){
        if(action.type!=="set_theta")return false;
        let map={}
        for(let i=0;i<this.core.length;i++){
            map[this.core[i]]=1;
        }
        for(let i=0;i<action.core.length;i++){
            if(map[action.core[i]]===undefined)return false;
        }
        this.state=action.state;
        return true;
    }

    filter() {
        return true;
    }
}

//theta
export function createSetThetaAction(msg,flag){
    let val={}
    val['command']="set_theta";
    val['theta']=msg['theta'];
    val['flag']=flag
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}