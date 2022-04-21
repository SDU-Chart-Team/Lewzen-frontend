export class CoreQueue {
    constructor(){
        this.coreQueue={};
        this.isCtrl=0;
    }
    setCtrl(state){
        this.isCtrl=state;
    }
    clear(){
        if(!this.isCtrl){
            for(var key in this.coreQueue){
                this.coreQueue[key]=0;
            }
        }
    }
    append(svg_id){
        this.clear();
        this.coreQueue[svg_id]=1;
    }
    remove(svg_id){
        this.coreQueue[svg_id]=0;
    }
    getCoreElement(){
        return this.coreQueue;
    }
}