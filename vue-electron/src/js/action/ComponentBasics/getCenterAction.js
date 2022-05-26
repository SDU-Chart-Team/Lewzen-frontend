import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter} from "@/js/action/actionQueue";
import {getCoreList} from "@/js/element/core/core_queue";
import {getModuleByGid} from "@/js/element/module/module_queue";
import {setTreeSonCenter} from "@/js/element/module/module_tree";
import el from "element-ui/src/locale/lang/el";

export class GetCenterAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.cmd=cmd;
        this.msg=msg;
        console.log(cmd);
        console.log(msg);
    }

    before(){

    }

    after(){
        let coreList=getCoreList();
        console.log(coreList);
        for(let i=0;i<coreList.length;i++){
            let element=getModuleByGid(coreList[i]);
            element.center_x=this.msg['centers'][i]['x']
            element.center_y=this.msg['centers'][i]['y']
            // console.log(element.center_x,element.center_y);
            // console.log(this.msg['centers'])
            // console.log(element.center_x,element.center_y)
            setTreeSonCenter(coreList[i],{x:this.msg['centers'][i]['x'],y:this.msg['centers'][i]['y']})
        }

    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createGetCenterAction(msg){//id
    let val={}
    val['command']="get_center";
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}