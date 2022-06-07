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
import {clearMoveState, initMoveState} from "../ComponentBasics/moveAction";
import {getAllModules} from "../../element/module/module_queue";
import {guideSet} from "../../canvas/base_canvas";
import {createGroupAction} from "./groupAction";
import {getBBox} from "../../util/bboxUtil";
import {after_register_set} from "../actionQueue";
import {
    get_arrow_end_Before,
    get_arrow_start_Before,
    get_dotted_line_type_Before,
    get_line_type_Before
} from "../../util/setLineType";

export class AddAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type)
        this.msg=msg;
        this.cmd=cmd;
        // console.log(cmd);
        // console.log(msg);
        this.command=msg["command"];//命令
        this.id=msg['ids'];//组件g_id
        this.type=msg['type'];//组件类型
        this.status=msg['status'];//状态码
    }

    updateState(){
        this.state=getState();
    }

    after(){
        this.msg['show']=this.cmd['show'];
        if(!this.cmd['show']){
            for(let i=0;i<this.id.length;i++){
                let node=document.getElementById(this.id[i]);
                let parser=new cssParser();
                parser.parseStyle(node.getAttribute("style"))
                parser.updateStyle({display:"none"})
                parser.updateStyle({'stroke-width':0})
                node.setAttribute("style",parser.get());
                P("cursor",{ids:[this.id[i]]})
                P("set_style",{style:parser.get()})
                this.msg['id']=this.id[i];
                createModule(this.msg,false);
                addModuleToTree(this.id[i],this.type);

                let val={
                    command:"group",
                    flag:true,
                }
                let coreList=getCoreList();
                let groupMsg={group_id:this.id[i],son:coreList}
                after_register_set(true);
                createGroupAction(val,groupMsg);
                // for (var j=0;j<coreList.length;j++){
                //     linkByGroup(coreList[j],this.id[i]);
                // }
                // P("cursor",{ids:this.msg['ids']})
                // P("cover_children",{})
                // // P("enable_scale_bind",{})
                // P("cursors",{ids:this.msg['ids']})
            }
            return;
        }
        for(let i=0;i<this.id.length;i++){
            if(this.type==="line"){
                this.msg['id']=this.id[i];
                createLine(this.msg);
            }else{
                this.msg['id']=this.id[i];
                createModule(this.msg);//需要修改
            }
            addModuleToTree(this.id[i],this.type);
            P("cursor",{ids:[this.msg['id']]})
            clearMoveState();

            let move=set_move_center();
            let bbox=getBBox(this.id[i])
            // let bbox=document.getElementById(this.id[i]).getBBox();

            initMoveState({start_x:bbox.x,start_y:bbox.y})

            let msg={g_id:this.id[i],move_x:move['x']-bbox.width/2,move_y:move['y']-bbox.height/2}
            P("move",msg,false)
            P("cursors",{ids:this.msg['ids']})
            if(this.type==="line"){
                P("set_line_type",{line_type:get_line_type_Before()})
                P("set_dotted_line",{dot_type:get_dotted_line_type_Before()})
                P("set_start_arrow",{start_arrow:get_arrow_start_Before()})
                P("set_end_arrow",{end_arrow:get_arrow_end_Before()})


            }
            guideSet(this.id[i],false);
        }

        // anchor_add(this.id);
    }

    forward(){
        let msg=[];
        msg['time']=this.time;
        console.log(this.time);
        P("readd",msg,false);
    }

    backward(){
        let coreList=getCoreList();
        P("cursor",{ids:this.id},false);
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

    frontFilter(action) {
        if(action.type==="group"){
            return true;
        }
        if(action.type==="arrow_from"){
            return true;
        }
        if(action.type==="arrow_from_null"){
            return true;
        }
        if(action.type==="arrow_to"){
            return true;
        }
        if(action.type==="arrow_to_null"){
            return true;
        }
        return false;
    }
}
let create_List={
    0:'circle',
    1:'ellipse',
    2:'rectangle',
    3:'callout',
    4:'cross',
    5:'cylinder',
    6:'data_storage',
    7:'double_arrow',
    8:'step',
    9:'tee',
    10:'user',
    11:'and',
    12:'diamond',
    13:'envelope',
    14:'corner',
    15:'rounded_rectangle',
    16:'star',
    17:'triangle',
    18:'big_arrow_left',
    19:'isometric_cube',
    20:'trapezoid',
    21:'parallelogram',
    22:'hexagon',


    40:'arrow_right',
    41:'arrow_left',
    42:'arrow_up',
    43:'arrow_down',
    44:'chevron',
    45:'notched',


    60:'annotation',
    61:'collate',
    62:'data',
    63:'delay',
    64:'display',
    65:'document',
    66:'internal_storage',
    67:'manual_input',
    68:'plus',
    69:'tape',
    70:'card',
    71:'off_page_connector',
    72:'process',
    73:'preparation',
    74:'sort',
    75:'start',
    76:'terminator',
    77:'tape_data',
    78:'decision',
    79:'stored_data',
    80:'manual_operation',
    81:'normal_process',

    120:'entity',
    121:'relation',
    122:'weak_relation',


    90:'actor',
    91:'use_case',
    92:'package',
    93:'swimming_lane',
    94:'frame',
    95:'notes',
    96:'interfaces_classes',
    97:'classes',
    98:'activities',
    99:'multi_instance_class',
    100:'send_signal',
    101:'receive_signal',
    102:'time_signal',
    103:'delete',
    104:'element',
    105:'lifeline',
    106:'generalize',
    107:'generalize_all',
    108:'bind',
    109:'entity_circle',

    30:'line',
}
export function createAddAction(msg,flag){//type,x,y
    let val={}
    // val['type']=msg['type'];
    // val['x']=msg['x']===undefined?'0':msg['x'];
    // val['y']=msg['y']===undefined?'0':msg['y'];
    // console.log(msg);
    // val['cmd']="add rectangle";
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