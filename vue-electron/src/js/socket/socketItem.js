//方便使用socket信息
//只需要在send前clear，并设置MsgTo，之后查看msgBack便可以。
import {sendSocket} from "@/js/socket/socket";
import {DomOperator} from "@/js/dom/domOperation";
import de from "element-ui/src/locale/lang/de";

export class SocketItem {
    constructor() {
        this.msgTo={}
        this.msgBack={}
    }
    setMsgTo(msg){
        this.msgTo=msg;
    }
    setMsgBack(msg){
        this.msgBack=msg;
    }
    getMsgBack(){
        return this.msgBack;
    }
    getMsgTo(){
        return this.msgTo;
    }
    clearMsg(){
        this.msgTo={}
        this.msgBack={}
    }
    sendTo(){
        console.log(this.msgTo);
        this.msgBack=sendSocket(this.msgTo);
        // console.log(this.msgBack);
        //处理对属性值的修改
        this.HandleChange();
        this.HandleAppend();
        this.HandleDelete();
    }

    HandleChange(){
        let domOperator=new DomOperator();
        let changeList=this.msgBack['change'];
        if(changeList===undefined)return;
        for(var i=0;i<changeList.length;i++){
            let id= changeList[i]['id'];
            let attrs=changeList[i]['attrs'];
            domOperator.setAttrById(id,attrs);
        }
    }

    HandleAppend(){
        let parser=new DOMParser();
        let domOperator=new DomOperator();
        let appendList=this.msgBack['append'];
        if(appendList===undefined)return;
        for(var i=0;i<appendList.length;i++){
            let fid=appendList[i]['fid'];
            let sNodeDom=appendList[i]['snodedom'];
            let item=parser.parseFromString(sNodeDom,"image/svg+xml");
            domOperator.appendChildById(fid,item);
        }
    }

    HandleDelete(){
        let domOperator=new DomOperator();
        let deleteList=this.msgBack['delete'];
        if(deleteList===undefined)return;
        for(var i=0;i<deleteList.length;i++){
            let fid=deleteList[i]['fid'];
            let sid=deleteList[i]['sid'];
            domOperator.removeChildById(fid,sid);
        }
    }
}