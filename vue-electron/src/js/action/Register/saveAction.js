import {Base_action} from "@/js/action/base_action";
import {sendSocket} from "@/js/socket/socket";
import {getActionCounter, P} from "@/js/action/actionQueue";
import {saveFile} from "@/js/util/fileOperation";
import {getMyDefs, getMySvg, getShapeMapId} from "@/js/util/getCanvasIdOperation";
import {getGradientList} from "@/js/util/LinearGradientCreator";
import {getArrowList} from "../../element/anchor/arrow_Queue";

export class SaveAction extends Base_action{
    constructor(type,cmd,msg) {
        super(type);
        this.msg=msg;
        this.cmd=cmd;
        // console.log(cmd);
        // console.log(msg);
    }

    before(){

    }

    after(){
        let gradientList=getGradientList();
        let list=document.getElementById(getShapeMapId()).childNodes;
        let arrow=[];
        let map={}
        for(let i=0;i<list.length;i++){
            map[list[i].getAttribute("id")]=i;
        }
        let arrowList=getArrowList();
        for(let key in arrowList){
            let item={}
            item['id']=map[key];
            if(arrowList[key]['from_id']!==undefined){
                item['from_id']=map[arrowList[key]['from_id']]
                item['from_a_id']=arrowList[key]['from_a_id']
            }
            if(arrowList[key]['to_id']!==undefined){
                item['to_id']=map[arrowList[key]['to_id']]
                item['to_a_id']=arrowList[key]['to_a_id']
            }
            arrow.push(item);
        }
        console.log(arrow);
        let msg={json:this.msg['json'],color:gradientList,arrow:arrow}
        saveFile(msg)
    }

    forward(){

    }

    backward(){

    }

    merge(action){
        return false;
    }
}

export function createSaveAction(msg,flag){//time
    let val={}
    val["command"]="save";
    val['flag']=flag;
    let cmd=JSON.stringify(val);
    sendSocket({cmd:cmd})
}