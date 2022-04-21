import {deleteElementById,createElementById,elementMove,elementScale} from "@/js/svg";

let actionInQueue=[]//保存action
let actionOutQueue=[]//保存撤销的action

export function pushQueue(action){
    // console.log(action);
    actionInQueue.push(action)
}

export function popQueue(){
    if(actionInQueue.length===0)return;
    let action=actionInQueue[actionInQueue.length-1];
    actionOutQueue.push(action);
    removeAction(action);
    actionInQueue.pop();
}
export function popOutQueue() {
    if (actionOutQueue.length===0)return;
    let action=actionOutQueue[actionOutQueue.length-1];
    actionInQueue.push(action);
    appendAction(action);
    actionOutQueue.pop();
}
function removeAction(action){
    // console.log(action);
    if(action['type']==='create'){
        deleteElementById(action['id']);
    }else if(action['type']==='move'){
        elementMove(action['id'],-action['transX'],-action['transY'])
    }else if(action['type']==='scale'){
        elementScale(action['cid'],action['id'],-action['transX'],-action['transY'])
    }else if(action['type']==='delete'){
        for(var i=0;i<action['id'].length;i++){
            createElementById(action['id'][i]);
        }
    }
}
function appendAction(action){
    if(action['type']==='create'){
        createElementById(action['id']);
    }else if(action['type']==='move'){
        elementMove(action['id'],action['transX'],action['transY'])
    }else if(action['type']==='scale'){
        elementScale(action['cid'],action['id'],action['transX'],action['transY'])
    }else if(action['type']==='delete'){
        for(var i=0;i<action['id'].length;i++){
            deleteElementById(action['id'][i]);
        }
    }
}
