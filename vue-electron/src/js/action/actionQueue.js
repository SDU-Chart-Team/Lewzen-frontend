class ActionQueue {
    constructor() {
        this.actionInQueue=[];
        this.actionOutQueue=[]
    }
    push(action){
        this.actionInQueue.push(action);
    }
    forward(){
        if(this.actionOutQueue.length===0)return;
        let action=this.actionOutQueue[this.actionOutQueue.length-1];
        action.forward();
        this.actionOutQueue.pop();
        this.actionInQueue.push(action);
    }
    backward(){
        if(this.actionInQueue.length===0)return;
        let action=this.actionInQueue[this.actionInQueue.length-1];
        action.backward();
        this.actionInQueue.pop();
        this.actionOutQueue.push(action);
    }
}

let actionQueue=new ActionQueue();

export function addAction(action){
    actionQueue.push(action);
}
export function forward(){
    actionQueue.forward();
}
export function backward(){
    actionQueue.backward();
}