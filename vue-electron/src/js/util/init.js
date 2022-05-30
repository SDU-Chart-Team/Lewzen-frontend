import {initActionQueue} from "../action/actionQueue";
import {clearState} from "../canvas/base_canvas";
import {clearArrow} from "../element/anchor/arrow_Queue";
import {clearCore} from "../element/core/core_queue";
import {clearTree} from "../element/module/module_tree";
import {deleteAllModules} from "../element/module/module_queue";

export function initCanvasState(){
    deleteAllModules();
    clearState();
    initActionQueue();
    clearArrow();
    clearCore();
    clearTree();
}