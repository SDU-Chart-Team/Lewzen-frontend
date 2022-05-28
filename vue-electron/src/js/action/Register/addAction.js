import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P, P_More, updateCMD} from "@/js/action/actionQueue";
import {createLine, createModule} from "@/js/element/module/module_queue";
import {createReAddAction} from "@/js/action/Register/reAddAction";
import {createRemoveAction} from "@/js/action/Register/removeAction";
import {addModuleToTree, linkByGroup} from "@/js/element/module/module_tree";
import {cssParser} from "@/js/util/cssParser";
import {getCoreList} from "@/js/element/core/core_queue";
import {anchor_add} from "@/js/element/anchor/anchor_queue";
import {set_move_center} from "@/js/util/canvas_operation";

export class AddAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.msg=msg;
        this.cmd=cmd;
        // console.log(cmd);
        // console.log(msg);
        this.command=msg["command"];//命令
        this.id=msg['id'];//组件g_id
        this.type=msg['type'];//组件类型
        this.status=msg['status'];//状态码
    }

    updateState(){
        this.state=getState();
    }

    after(){
        this.msg['show']=this.cmd['show'];
        if(!this.cmd['show']){
            let node=document.getElementById(this.id);
            let parser=new cssParser();
            parser.parseStyle(node.getAttribute("style"))
            parser.updateStyle({display:"none"})
            parser.updateStyle({'stroke-width':0})
            node.setAttribute("style",parser.get());
            createModule(this.msg,false);
            addModuleToTree(this.id,this.type);
            let coreList=getCoreList();
            for (var i=0;i<coreList.length;i++){
                linkByGroup(coreList[i],this.id);
            }
            P("cursors",{ids:[this.msg['id']]})
            P("cover_children",{})
            // P("enable_scale_bind",{})
            P("cursors",{ids:[this.msg['id']]})
            return;
        }
        if(this.type==="line"){
            createLine(this.msg);
        }else{
            createModule(this.msg);//需要修改
        }
        addModuleToTree(this.id,this.type);
        P("cursors",{ids:[this.msg['id']]})
        let move=set_move_center();
        let bbox=document.getElementById(this.id).getBBox();
        let msg={g_id:getCoreList()[0],move_x:move['x']-bbox.width/2,move_y:move['y']-bbox.height/2}
        P("move",msg,false)
        P("cursors",{ids:[this.msg['id']]})

        // anchor_add(this.id);
    }

    forward(){
        let msg=[];
        msg['time']=this.time;
        P("readd",msg,false);
    }

    backward(){
        let coreList=getCoreList();
        P("cursors",{ids:this.id},false);
        let msg=[];
        // msg['id']=this.id;
        let time=getActionCounter();
        msg['time']=time;
        this.time=time;
        P("remove",msg,false);
        P("cursors",{ids:coreList},false);
    }

    merge(action){
        return false;
    }

    filter() {
        return true;
    }
}
let create_List={
    0:'rectangle',
    7:'line'
}
export function createAddAction(msg,flag){//type,x,y
    let val={}
    // val['type']=msg['type'];
    // val['x']=msg['x']===undefined?'0':msg['x'];
    // val['y']=msg['y']===undefined?'0':msg['y'];
    // console.log(msg);
    val['cmd']="add rectangle";
    let cmd={
        command: "add",
        type: create_List[parseInt(msg['id'])],
        flag:flag,
        show:msg['show']===undefined?true:false
    }
    cmd=JSON.stringify(cmd)
    // updateCMD(val['cmd'])
    sendSocket({"cmd": cmd})
}