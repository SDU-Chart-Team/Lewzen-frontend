import {DomOperator} from "@/js/util/domOperation";
import {Move_action} from "@/js/action/move_action";
import {Core_action} from "@/js/action/core_action";
import {Create_action} from "@/js/action/create_action";
import {Scale_action} from "@/js/action/scale_action";
import {getActionCounter, getCMD, P, pushAction, V} from "@/js/action/actionQueue";
import {parserCmd} from "@/js/util/DomInterpreter";
import {AddAction} from "@/js/action/Register/addAction";
import {CursorAction} from "@/js/action/Register/cursorAction";
import {RemoveAction} from "@/js/action/Register/removeAction";
import {GetPAction} from "@/js/action/ComponentBasics/getPAction";
import {MoveAction} from "@/js/action/ComponentBasics/moveAction";
import {ReAddAction} from "@/js/action/Register/reAddAction";
import {CursorsAction} from "@/js/action/Register/cursorsAction";
import {MovePAction} from "@/js/action/ComponentBasics/movePAction";
import {GetModuleAction} from "@/js/action/ComponentBasics/getModuleAction";
import {createGetChildrenAction, GetChildrenAction} from "@/js/action/ComponentBasics/getChildrenAction";
import {GetParentAction} from "@/js/action/ComponentBasics/getParentAction";
import {GetAncestorsAction} from "@/js/action/ComponentBasics/getAncestorsAction";
import {LinkAction} from "@/js/action/ComponentBasics/linkAction";
import {UnlinkAction} from "@/js/action/ComponentBasics/unlinkAction";
import {BackAction} from "@/js/action/ComponentBasics/backAction";
import {FrontwardAction} from "@/js/action/ComponentBasics/frontwardAction";
import {FrontAction} from "@/js/action/ComponentBasics/frontAction";
import {SetThetaAction} from "@/js/action/ComponentRotatable/setThetaAction";
import {GetThetaAction} from "@/js/action/ComponentRotatable/getThetaAction";
import {CopyAction} from "@/js/action/Register/copyAction";
import {DiscardAction} from "@/js/action/Register/discardAction";
import {SaveAction} from "@/js/action/Register/saveAction";
import {createUnCursorsAction, UnCursorAction} from "@/js/action/Register/unCursorAction";
import {SetStyleAction} from "@/js/action/ComponentStylizable/setStyleAction";
import {GetStyleAction} from "@/js/action/ComponentStylizable/getStyleAction";
import {GetRectAction} from "@/js/action/ComponentGroupable/getRectAction";
import {SetRectAction} from "@/js/action/ComponentGroupable/setRectAction";
import {CoverChildrenAction, createCoverChildAction} from "@/js/action/ComponentGroupable/coverChildrenAction";
import {createSetStartAction, SetStartAction} from "@/js/action/ComponentLinear/setStartAction";
import {createSetEndAction, SetEndAction} from "@/js/action/ComponentLinear/setEndAction";
import {createSetHtmlAction, SetHtmlAction} from "@/js/action/ComponentWritable/setHtmlAction";
import {createGetHtmlAction, GetHtmlAction} from "@/js/action/ComponentWritable/getHtmlAction";
import {createSetAlignmentAction, SetAlignmentAction} from "@/js/action/ComponentWritable/setAlignmentAction";
import {createGetAlignmentAction, GetAlignmentAction} from "@/js/action/ComponentWritable/getAlignmentAction";
import {createSetSpacingAction, SetSpacingAction} from "@/js/action/ComponentWritable/setSpacingAction";
import {createGetSpacingAction, GetSpacingAction} from "@/js/action/ComponentWritable/getSpacingAction";
import {createGetCenterAction, GetCenterAction} from "@/js/action/ComponentBasics/getCenterAction";
import {createEnableScaleBindAction, EnableScaleBindAction} from "@/js/action/ComponentBindable/enableScaleBindAction";
import {FlipAction} from "@/js/action/ComponentFlippable/filpAction";
import {SetDottedLineAction} from "@/js/action/ComponentLinear/setDottedLineAction";
import {OnOffsetAction} from "@/js/action/ComponentLinear/onOffsetAction";
import {SetLineType} from "@/js/action/ComponentLinear/setLineType";
import {SetStartArrowAction} from "@/js/action/ComponentLinear/setStartArrowAction";
import {GetStartArrowAction} from "@/js/action/ComponentLinear/getStartArrowAction";
import {SetEndArrowAction} from "@/js/action/ComponentLinear/setEndArrowAction";
import {GetEndArrowAction} from "@/js/action/ComponentLinear/getEndArrowAction";
import {GetStartAction} from "@/js/action/ComponentLinear/getStartAction";
import {LoadAction} from "@/js/action/Register/loadAction";
import {createEnableFlipBindAction, EnableFlipBindAction} from "@/js/action/ComponentBindable/enableFlipBindAction";
import {
    createEnableRotateBindAction,
    EnableRotateBindAction
} from "@/js/action/ComponentBindable/enableRotateBindAction";
import {createEnableMoveBindAction, EnableMoveBindAction} from "@/js/action/ComponentBindable/enableMoveBindAction";
import {
    createDisableScaleBindAction,
    DisableScaleBindAction
} from "@/js/action/ComponentBindable/disableScaleBindAction";
import {createDisableFlipBindAction, DisableFlipBindAction} from "@/js/action/ComponentBindable/disableFlipBindAction";
import {createDisableRotateBindAction} from "@/js/action/ComponentBindable/disableRotateBindAction";
import {createDisableMoveBindAction} from "@/js/action/ComponentBindable/disableMoveBindAction";
import {createGetScaleBindAction, GetScaleBindAction} from "@/js/action/ComponentBindable/getScaleBindAction";
import {createGetFlipBindAction, GetFlipBindAction} from "@/js/action/ComponentBindable/getFlipBindAction";
import {createGetRotateBindAction, GetRotateBindAction} from "@/js/action/ComponentBindable/getRotateBindAction";
import {createGetMoveBindAction, GetMoveBindAction} from "@/js/action/ComponentBindable/getMoveBindAction";

let socketQueue={}

export function socketPush(msg){
    // console.log(socket_return);
    // msg=msg['ok'];
    // if(msg===undefined){
    //     V();
    //     // let time=getActionCounter();
    //     return;
    // }
    // msg=JSON.parse(msg);
    // let type=socket_return["type"];
    // let domOperator=new DomOperator();
    // if(socket_return["dom_change"]!==undefined){
    //     domOperator.changeAttrs(socket_return["dom_change"])
        // console.log(socket_return["dom_change"])
    // }

    let cmd=getCMD();
    cmd=JSON.parse(cmd);
    // console.log(cmd);
    // console.log(msg);
    let val = parserCmd(msg);
    // console.log(val);



    // V();
    // if(type==="create"){
    //     createAction(socket_return);
    // }else if(type==="core"){
    //     coreAction(socket_return);
    // }else if(type==="move"){
    //     moveAction(socket_return);
    // }else if(type==='scale'){
    //     scaleAction(socket_return);
    // }
    parseType(cmd,val);
}

let cmdTypeList={
    'add':addAction,
    'cursor':cursorAction,
    'cursors':cursorsAction,
    'remove':removeAction,
    'readd':readdAction,
    "copy":copyAction,
    "discard":discardAction,
    "save":saveAction,
    "load":loadAction,
    "uncursor":uncursorAction,


    //组件基本模块
    "get_modules":getModulesAction,
    'get_points':getPAction,
    "get_parent":getParentAction,
    "get_ancestors":getAncestorsAction,
    "link":linkAction,
    "unlink":unlinkAction,
    'move':moveAction,
    'move_point':movePAction,
    "backward":backwardAction,
    "forward":frontwardAction,
    "back":backAction,
    "front":frontAction,
    "get_center":getCenterAction,
    "get_children":getChildrenAction,
    //旋转模块
    "set_theta":setThetaAction,
    "get_theta":getThetaAction,

    //样式模块
    "set_style":setStyleAction,
    "get_style":getStyleAction,

    //分组模块
    // "set_group"
    "get_rect":getRectAction,
    "set_rect":setRectAction,
    "cover_children":coverChildAction,


    //箭头模块
    "set_start":setStartAction,
    "set_end":setEndAction,
    "get_start":get_start,
    "get_end":get_end,
    "set_start_arrow":set_start_arrow,
    "get_start_arrow":get_start_arrow,
    "set_end_arrow":set_end_arrow,
    "get_end_arrow":get_end_arrow,
    "set_line_type":set_line_type,
    "on_offset":on_offset,
    "set_dotted_line":set_dotted_line,

    //可写模块
    "set_html":setHtmlAction,
    "get_html":getHtmlAction,
    "set_alignment":setAlignmentAction,
    "get_alignment":getAlignmentAction,
    "set_spacing":getSpacingAction,
    "get_spacing":getSpacingAction,

    //绑定模块
    "enable_scale_bind":enableScaleBindAction,
    "enable_flip_bind":enableFlipBindAction,
    "enable_rotate_bind":enableRotateBindAction,
    "enable_move_bind":enableMoveBindAction,

    "disable_scale_bind":disableScaleBindAction,
    "disable_flip_bind":disableFlipBindAction,
    "disable_rotate_bind":disableRotateBindAction,
    "disable_move_bind":disableMoveBindAction,

    "get_scale_bind":getScaleBindAction,
    "get_flip_bind":getFlipBindAction,
    "get_rotate_bind":getRotateBindAction,
    "get_move_bind":getMoveBindAction,


    //翻转绑定
    "flip":flipAction,
}


function parseType(cmd,msg){
    let tmp=cmd["command"];
    cmdTypeList[tmp](cmd,msg);
}


function addAction(cmd,msg) {
    let add_action=new AddAction("add",cmd,msg);
    pushAction(add_action);
}

function cursorAction(cmd,msg){
    let cursor_action=new CursorAction("cursor",cmd,msg);
    pushAction(cursor_action);
}

function cursorsAction(cmd,msg){
    let cursors_action=new CursorsAction("cursors",cmd,msg);
    pushAction(cursors_action);
}

function uncursorAction(cmd,msg) {
    let uncursors_action=new UnCursorAction("uncursor",cmd,msg);
    pushAction(uncursors_action);
}

function readdAction(cmd,msg){
    let readd_action=new ReAddAction("readd",cmd,msg);
    pushAction(readd_action);
}

function removeAction(cmd,msg){
    let remove_action=new RemoveAction("remove",cmd,msg);
    pushAction(remove_action);
}

function getPAction(cmd,msg){
    let get_p_action=new GetPAction("get_points",cmd,msg);
    pushAction(get_p_action);
}

function moveAction(cmd,msg){
    let move_action=new MoveAction("move",cmd,msg)
    pushAction(move_action);
}

function movePAction(cmd,msg){
    let moveP_action=new MovePAction("move_point",cmd,msg);
    pushAction(moveP_action);
}

function copyAction(cmd,msg){
    let copy_action=new CopyAction("copy",cmd,msg);
    pushAction(copy_action);
}

function discardAction(cmd,msg){
    let discard_action=new DiscardAction("discard",cmd,msg);
    pushAction(discard_action);
}

function saveAction(cmd,msg){
    let save_action=new SaveAction("type",cmd,msg);
    pushAction(save_action);
}


function getModulesAction(cmd,msg) {
    let get_modules_action=new GetModuleAction("get_modules",cmd,msg);
    pushAction(get_modules_action);
}

function getChildrenAction(cmd,msg) {
    let get_children_action=new GetChildrenAction("get_children",cmd,msg);
    pushAction(get_children_action);
}

function getParentAction(cmd,msg){
    let get_parent_action=new GetParentAction("get_parent",cmd,msg);
    pushAction(get_parent_action);
}

function getAncestorsAction(cmd,msg){
    let get_ancestors_action=new GetAncestorsAction("get_ancestors",cmd,msg);
    pushAction(get_ancestors_action);
}

function linkAction(cmd,msg) {
    let link_action=new LinkAction("link",cmd,msg);
    pushAction(link_action);
}

function unlinkAction(cmd,msg){
    let unlink_action=new UnlinkAction("unlink",cmd,msg);
    pushAction(unlink_action);
}

function backwardAction(cmd,msg) {
    let backward_action=new BackAction("backward",cmd,msg);
    pushAction(backward_action);
}

function frontwardAction(cmd,msg) {
    let frontwardAction=new FrontwardAction("forward",cmd,msg);
    pushAction(frontwardAction);
}

function backAction(cmd,msg){
    let back_action=new BackAction("back",cmd,msg);
    pushAction(back_action);
}

function frontAction(cmd,msg){
    let front_action=new FrontAction("front",cmd,msg);
    pushAction(front_action);
}

function setThetaAction(cmd,msg){
    let set_theta_action=new SetThetaAction("set_theta",cmd,msg);
    pushAction(set_theta_action);
}

function getThetaAction(cmd,msg){
    let get_theta_action=new GetThetaAction("get_theta",cmd,msg);
    pushAction(get_theta_action);
}

function setStyleAction(cmd,msg){
    let style_action=new SetStyleAction("set_style",cmd,msg);
    pushAction(style_action);
}

function getStyleAction(cmd,msg){
    let style_action=new GetStyleAction("get_style",cmd,msg);
    pushAction(style_action);
}


function getRectAction(cmd,msg){
    let style_action=new GetRectAction("get_rect",cmd,msg);
    pushAction(style_action);
}
function setRectAction(cmd,msg){
    let style_action=new SetRectAction("set_rect",cmd,msg);
    pushAction(style_action);
}
function coverChildAction(cmd,msg){
    let action=new CoverChildrenAction("cover_children",cmd,msg);
    pushAction(action);
}

function setStartAction(cmd,msg){
    let style_action=new SetStartAction("set_start",cmd,msg);
    pushAction(style_action);
}

function setEndAction(cmd,msg){
    let action=new SetEndAction("set_end",cmd,msg);
    pushAction(action);
}

function setHtmlAction(cmd,msg){
    let action=new SetHtmlAction("set_html",cmd,msg);
    pushAction(action);
}

function getHtmlAction(cmd,msg){
    let action=new GetHtmlAction("get_html",cmd,msg);
    pushAction(action);
}


function setAlignmentAction(cmd,msg){
    let action=new SetAlignmentAction("set_alignment",cmd,msg);
    pushAction(action);
}

function getAlignmentAction(cmd,msg){
    let action=new GetAlignmentAction("get_alignment",cmd,msg);
    pushAction(action);
}

function setSpacingAction(cmd,msg){
    let action=new SetSpacingAction("set_spacing",cmd,msg);
    pushAction(action);
}

function getSpacingAction(cmd,msg){
    let action=new GetSpacingAction("get_spacing",cmd,msg);
    pushAction(action);
}


function getCenterAction(cmd,msg){
    let action=new GetCenterAction("get_center",cmd,msg);
    pushAction(action);
}


function flipAction(cmd,msg){
    let action=new FlipAction("flip",cmd,msg);
    pushAction(action);
}

function set_dotted_line(cmd,msg){
    let action=new SetDottedLineAction("set_dotted_line",cmd,msg);
    pushAction(action);
}

function on_offset(cmd,msg){
    let action=new OnOffsetAction("on_offset",cmd,msg);
    pushAction(action);
}

function set_line_type(cmd,msg){
    let action=new SetLineType("set_line_type",cmd,msg);
    pushAction(action);
}

function set_start_arrow(cmd,msg){
    let action=new SetStartArrowAction("set_start_arrow",cmd,msg);
    pushAction(action);
}

function get_start_arrow(cmd,msg){
    let action=new GetStartArrowAction("get_start_arrow",cmd,msg);
    pushAction(action);
}

function set_end_arrow(cmd,msg){
    let action=new SetEndArrowAction("set_end_arrow",cmd,msg);
    pushAction(action);
}

function get_end_arrow(cmd,msg){
    let action=new GetEndArrowAction("get_end_arrow",cmd,msg);
    pushAction(action);
}


function get_start(cmd,msg){
    let action=new GetStartAction("get_start",cmd,msg);
    pushAction(action);
}

function get_end(cmd,msg){
    let action=new GetStartAction("get_end",cmd,msg);
    pushAction(action);
}

function loadAction(cmd,msg) {
    let action=new LoadAction("load",cmd,msg);
    pushAction(action);
}

function enableScaleBindAction(cmd,msg){
    let action=new EnableScaleBindAction("enable_scale_bind",cmd,msg);
    pushAction(action);
}

function enableFlipBindAction(cmd,msg){
    let action=new EnableFlipBindAction("enable_flip_bind",cmd,msg);
    pushAction(action);
}

function enableMoveBindAction(cmd,msg){
    let action=new EnableMoveBindAction("enable_move_bind",cmd,msg);
    pushAction(action);
}

function enableRotateBindAction(cmd,msg){
    let action=new EnableRotateBindAction("enable_rotate_bind",cmd,msg);
    pushAction(action);
}

function disableScaleBindAction(cmd,msg) {
    let action=new DisableScaleBindAction("disable_scale_bind",cmd,msg);
    pushAction(action);
}

function disableFlipBindAction(cmd,msg) {
    let action=new DisableFlipBindAction("disable_flip_bind",cmd,msg);
    pushAction(action);
}

function disableMoveBindAction(cmd,msg) {
    let action=new DisableScaleBindAction("disable_move_bind",cmd,msg);
    pushAction(action);
}

function disableRotateBindAction(cmd,msg) {
    let action=new DisableScaleBindAction("disable_rotate_bind",cmd,msg);
    pushAction(action);
}

function getScaleBindAction(cmd,msg){
    let action=new GetScaleBindAction("get_scale_bind",cmd,msg);
    pushAction(action);
}

function getFlipBindAction(cmd,msg){
    let action=new GetFlipBindAction("get_flip_bind",cmd,msg);
    pushAction(action);
}

function getMoveBindAction(cmd,msg){
    let action=new GetMoveBindAction("get_move_bind",cmd,msg);
    pushAction(action);
}

function getRotateBindAction(cmd,msg){
    let action=new GetRotateBindAction("get_rotate_bind",cmd,msg);
    pushAction(action);
}


