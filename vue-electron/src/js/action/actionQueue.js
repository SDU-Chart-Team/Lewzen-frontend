import {create_Action_Before} from "@/js/action/create_action";
import {create_core_Before} from "@/js/action/core_action";
import {create_Scale_Action} from "@/js/action/scale_action";
import de from "element-ui/src/locale/lang/de";
import {createAddAction} from "@/js/action/Register/addAction";
import {createCursorAction} from "@/js/action/Register/cursorAction";
import {createReAddAction} from "@/js/action/Register/reAddAction";
import {createRemovePAction} from "@/js/action/ComponentShapable/removePAction";
import {createRemoveAction} from "@/js/action/Register/removeAction";
import {createGetPAction} from "@/js/action/ComponentBasics/getPAction";
import {createMoveAction} from "@/js/action/ComponentBasics/moveAction";
import {createCursorsAction} from "@/js/action/Register/cursorsAction";
import {createMovePAction} from "@/js/action/ComponentBasics/movePAction";
import {createCopyAction} from "@/js/action/Register/copyAction";
import {createDiscardAction} from "@/js/action/Register/discardAction";
import {createSaveAction} from "@/js/action/Register/saveAction";
import {createGetModuleAction} from "@/js/action/ComponentBasics/getModuleAction";
import {createGetChildrenAction} from "@/js/action/ComponentBasics/getChildrenAction";
import {createGetParentAction} from "@/js/action/ComponentBasics/getParentAction";
import {createGetAncestorsAction} from "@/js/action/ComponentBasics/getAncestorsAction";
import {createLinkAction} from "@/js/action/ComponentBasics/linkAction";
import {createUnlinkAction} from "@/js/action/ComponentBasics/unlinkAction";
import {createBackwardAction} from "@/js/action/ComponentBasics/backwardAction";
import {createFrontwardAction} from "@/js/action/ComponentBasics/frontwardAction";
import {createBackAction} from "@/js/action/ComponentBasics/backAction";
import {createFrontAction} from "@/js/action/ComponentBasics/frontAction";
import {createSetThetaAction} from "@/js/action/ComponentRotatable/setThetaAction";
import {createGetThetaAction} from "@/js/action/ComponentRotatable/getThetaAction";
import {createUnCursorsAction} from "@/js/action/Register/unCursorAction";
import {createSetStyleAction} from "@/js/action/ComponentStylizable/setStyleAction";
import {createGetStyleAction} from "@/js/action/ComponentStylizable/getStyleAction";
import {createGetRectAction} from "@/js/action/ComponentGroupable/getRectAction";
import {createSetRectAction} from "@/js/action/ComponentGroupable/setRectAction";
import {createCoverChildAction} from "@/js/action/ComponentGroupable/coverChildrenAction";
import {createSetStartAction} from "@/js/action/ComponentLinear/setStartAction";
import {createSetEndAction} from "@/js/action/ComponentLinear/setEndAction";
import {createSetHtmlAction} from "@/js/action/ComponentWritable/setHtmlAction";
import {createGetHtmlAction} from "@/js/action/ComponentWritable/getHtmlAction";
import {createSetAlignmentAction} from "@/js/action/ComponentWritable/setAlignmentAction";
import {createGetAlignmentAction} from "@/js/action/ComponentWritable/getAlignmentAction";
import {createSetSpacingAction} from "@/js/action/ComponentWritable/setSpacingAction";
import {createGetSpacingAction} from "@/js/action/ComponentWritable/getSpacingAction";
import {createGetCenterAction} from "@/js/action/ComponentBasics/getCenterAction";
import {createEnableScaleBindAction} from "@/js/action/ComponentBindable/enableScaleBindAction";
import {createFilpAction} from "@/js/action/ComponentFlippable/filpAction";
import {createGetStartAction} from "@/js/action/ComponentLinear/getStartAction";
import {createGetEndAction} from "@/js/action/ComponentLinear/getEndAction";
import {createSetStartArrowAction} from "@/js/action/ComponentLinear/setStartArrowAction";
import {createGetStartArrowAction} from "@/js/action/ComponentLinear/getStartArrowAction";
import {createSetLineTypeAction} from "@/js/action/ComponentLinear/setLineType";
import {createOnOffsetAction} from "@/js/action/ComponentLinear/onOffsetAction";
import {createSetDottedLineAction} from "@/js/action/ComponentLinear/setDottedLineAction";
import {createSetEndArrowAction} from "@/js/action/ComponentLinear/setEndArrowAction";
import {createGetEndArrowAction} from "@/js/action/ComponentLinear/getEndArrowAction";
import {createLoadAction} from "@/js/action/Register/loadAction";
import {createEnableFlipBindAction} from "@/js/action/ComponentBindable/enableFlipBindAction";
import {createEnableRotateBindAction} from "@/js/action/ComponentBindable/enableRotateBindAction";
import {createEnableMoveBindAction} from "@/js/action/ComponentBindable/enableMoveBindAction";
import {createDisableScaleBindAction} from "@/js/action/ComponentBindable/disableScaleBindAction";
import {createDisableFlipBindAction} from "@/js/action/ComponentBindable/disableFlipBindAction";
import {createDisableRotateBindAction} from "@/js/action/ComponentBindable/disableRotateBindAction";
import {createDisableMoveBindAction} from "@/js/action/ComponentBindable/disableMoveBindAction";
import {createGetScaleBindAction} from "@/js/action/ComponentBindable/getScaleBindAction";
import {createGetFlipBindAction} from "@/js/action/ComponentBindable/getFlipBindAction";
import {createGetRotateBindAction} from "@/js/action/ComponentBindable/getRotateBindAction";
import {createGetMoveBindAction} from "@/js/action/ComponentBindable/getMoveBindAction";
class ActionQueue {
    constructor() {
        this.actionQueue=[];
        this.backQueue=[];
        this.pointer=0;
        this.actionFlag=false;
        this.msgQueue=[];
    }

    filter(action){
        // console.log(action.cmd)
        // console.log(action)
        if(!action.cmd['flag'])return false;

        return action.filter()
        // let type=action.type;
        // //箭头模块
        //
        // //基础模块
        // //back
        // //backward
        // //frontward
        // //front
        // if(type==="get_ancestors")return false;
        // if(type==="get_center")return false;
        // if(type==="get_children")return false;
        // if(type==="get_module")return false;
        // if(type==="get_points")return false;
        // if(type==="get_parent")return false;
        // if(type==="get_register")return false;
        // //link
        // //move
        // //movep
        // //unlink
        //
        // //翻转模块
        // //filp
        //
        // //分组模块
        // if(type==="cover_children")return false;
        // if(type==="get_rect")return false;
        // //set_rect
        //
        // if(type==="cursor")return false;
        // if(type==="get_points")return false;
        // if(type==="cursors")return false;
        // if(type==="uncursor")return false;
        // if(type==="discard")return false;
        // if(type==="get_theta")return false;
        // return true;
    }
    pushAction(action){
        action.after();
        V();
        if(this.filter(action)) {
            if(this.actionQueue.length>0){
                if(action.merge(this.actionQueue[this.actionQueue.length-1])){
                    this.actionQueue.pop();
                }
            }
            this.actionQueue.push(action);
            // console.log(this.actionQueue);
            if(this.backQueue.length>0){
                let time=getActionCounter();
                P("discard",{time:time});
            }
            this.backQueue=[];
        }
        this.updateMapAction()
    }

    backAction(){
        console.log(this.actionQueue);
        if(this.actionQueue.length>0){
            // console.log(this.actionQueue);
            // console.log(this.backQueue);
            this.actionQueue[this.actionQueue.length-1].backward();
            this.backQueue.push(this.actionQueue[this.actionQueue.length-1]);
            this.actionQueue.pop();
            // console.log(this.actionQueue);
            // console.log(this.backQueue);
        }
        this.updateMapAction();

    }

    forwardAction(){
        console.log(this.backQueue);
        if(this.backQueue.length>0){
            // console.log(this.actionQueue);
            // console.log(this.backQueue);
            this.backQueue[this.backQueue.length-1].forward();
            this.actionQueue.push(this.backQueue[this.backQueue.length-1]);
            this.backQueue.pop();
            // console.log(this.actionQueue);
            // console.log(this.backQueue);
        }
        this.updateMapAction();
    }

    updateMapAction(){
        let msg={}
        msg['back']=this.actionQueue.length !== 0;
        msg['up']=this.backQueue.length !== 0;
        color_change_bar(msg);
    }
}

export function pushMsg(msg){
    actionQueue.msgQueue.push(msg);
}

let actionQueue=new ActionQueue();

export function pushAction(action) {
    actionQueue.pushAction(action);
}

export function backAction(){
    actionQueue.backAction();
}

export function forwardAction() {
    actionQueue.forwardAction();
}


let actionCounter=0;

export function getActionCounter(){
    let answer=actionCounter;
    actionCounter++;
    return answer;
}

//处理事件
let Flag=100;
let MsgQueue=[];
let MsgQueueMore=[];

export function V(){
    // console.log("V",Flag);
    Flag+=1;
    if(Flag<=0){
        let val=MsgQueue[0];
        MsgQueue.splice(0,1);
        sendAction(val["sort"],val["msg"],val["flag"])
    }
}

export function P(sort,msg,flag=true){
    Flag-=1;
    if(Flag>=0){
        sendAction(sort,msg,flag);
    }else{
        MsgQueue.push({sort:sort,msg:msg,flag:flag});
    }
}

export function P_More(sort,msg,flag=true){
    Flag-=1;
    if(Flag>=0){
        sendAction(sort,msg,flag);
    }else{
        MsgQueueMore.push({sort:sort,msg:msg,flag:flag});
    }
}

let actionList={

    //注册器
    "create":createAddAction,
    "cursor":createCursorAction,
    "cursors":createCursorsAction,
    "readd":createReAddAction,
    "remove":createRemoveAction,
    "copy":createCopyAction,
    "discard":createDiscardAction,
    "save":createSaveAction,
    "load":createLoadAction,
    "uncursor":createUnCursorsAction,
    //组件基本模块
    "get_modules":createGetModuleAction,
    "get_p":createGetPAction,
    "get_children":createGetChildrenAction,
    "get_parent":createGetParentAction,
    "get_ancestors":createGetAncestorsAction,
    "link":createLinkAction,
    "unlink":createUnlinkAction,
    "move":createMoveAction,
    "move_point":createMovePAction,
    "backward":createBackwardAction,
    "forward":createFrontwardAction,
    "back":createBackAction,
    "front":createFrontAction,
    "get_center":createGetCenterAction,

    //旋转模块
    "set_theta":createSetThetaAction,
    "get_theta":createGetThetaAction,

    //群组模块
    "get_rect":createGetRectAction,
    "set_rect":createSetRectAction,
    "cover_children":createCoverChildAction,

    //翻转模块
    "flip":createFilpAction,

    //样式模块
    "set_style":createSetStyleAction,
    "get_style":createGetStyleAction,


    //箭头模块
    "set_start":createSetStartAction,
    "set_end":createSetEndAction,
    "get_start":createGetStartAction,
    "get_end":createGetEndAction,
    "set_start_arrow":createSetStartArrowAction,
    "get_start_arrow":createGetStartArrowAction,
    "set_end_arrow":createSetEndArrowAction,
    "get_end_arrow":createGetEndArrowAction,
    "set_line_type":createSetLineTypeAction,
    "on_offset":createOnOffsetAction,
    "set_dotted_line":createSetDottedLineAction,

    //可写模块
    "set_html":createSetHtmlAction,
    "get_html":createGetHtmlAction,
    "set_alignment":createSetAlignmentAction,
    "get_alignment":createGetAlignmentAction,
    "set_spacing":createSetSpacingAction,
    "get_spacing":createGetSpacingAction,


    //绑定模块
    "enable_scale_bind":createEnableScaleBindAction,
    "enable_flip_bind":createEnableFlipBindAction,
    "enable_rotate_bind":createEnableRotateBindAction,
    "enable_move_bind":createEnableMoveBindAction,

    "disable_scale_bind":createDisableScaleBindAction,
    "disable_flip_bind":createDisableFlipBindAction,
    "disable_rotate_bind":createDisableRotateBindAction,
    "disable_move_bind":createDisableMoveBindAction,

    "get_scale_bind":createGetScaleBindAction,
    "get_flip_bind":createGetFlipBindAction,
    "get_rotate_bind":createGetRotateBindAction,
    "get_move_bind":createGetMoveBindAction,
}


export function sendAction(sort,msg,flag){
    actionList[sort](msg,flag);

    // if(sort==="move"){
    //     create_Move_Action(msg)
    // }else if(sort==="create"){
    //     createAddAction(msg);
    // create_Action_Before(msg);
    // }else if(sort==="core"){
    //     create_core_Before(msg);
    // }else if(sort==="scale"){
    //     create_Scale_Action(msg);
    // }
}

//记录命令
let actionCMD="";

export function updateCMD(cmd){
    actionCMD=cmd;
}

export function getCMD(){
    return actionCMD
}

//记录状态
let actionState={};

export function updateState(state){
    actionState=state;
}

export function getState(){
    return actionState;
}