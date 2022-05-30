import {getModuleByGid, getModuleBySid} from "@/js/element/module/module_queue";

class Guide_queue {
    constructor() {
        this.xGuideQueue={};
        this.yGuideQueue={};
        this.xGuideList={};
        this.yGuideList={};
    }
    getXGuide(g_id){
        let element=document.getElementById(g_id);
        let bbox=element.getBBox();
        let position_x=[];
        position_x.push(bbox.x);
        position_x.push(bbox.x+bbox.width/2);
        position_x.push(bbox.x+bbox.width);
        return position_x;
    }
    getYGuide(g_id){
        let position_y=[];
        let element=document.getElementById(g_id);
        let bbox=element.getBBox();
        position_y.push(bbox.y);
        position_y.push(bbox.y+bbox.height/2);
        position_y.push(bbox.y+bbox.height);
        return position_y;
    }

    updateXGuide(g_id){
        let element=getModuleByGid(g_id);
        let xGuide_Before=this.xGuideList[g_id];
        if(xGuide_Before!==undefined){
            for(var i=0;i<xGuide_Before.length;i++){
                this.xGuideQueue[xGuide_Before[i]]--;
            }
        }
        let position=this.getXGuide(element.g_id);
        // console.log(position);
        for(var i=0;i<position.length;i++){
            if(this.xGuideQueue[position[i]]===undefined){
                this.xGuideQueue[position[i]]=0;
            }
            this.xGuideQueue[position[i]]++;
        }
        this.xGuideList[g_id]=position;
    }
    updateYGuide(g_id){
        let element=getModuleByGid(g_id)
        let yGuide_Before=this.yGuideList[g_id];
        if(yGuide_Before!==undefined){
            for(var i=0;i<yGuide_Before.length;i++){
                this.yGuideQueue[yGuide_Before[i]]--;
            }
        }
        let position=this.getYGuide(element.g_id);

        for(var i=0;i<position.length;i++){
            if(this.yGuideQueue[position[i]]===undefined){
                this.yGuideQueue[position[i]]=0;
            }
            this.yGuideQueue[position[i]]++;
        }
        this.yGuideList[g_id]=position;
    }

    getGuide(g_id) {
        let positionX = [];
        let positionY = [];
        let xGuide=this.xGuideList[g_id];
        let yGuide=this.yGuideList[g_id];
        if(xGuide!==undefined&&xGuide.length>0){
            let length=xGuide.length;
            for(var i=0;i<length;i++){
                if(this.xGuideQueue[xGuide[i]]>1){
                    positionX.push(xGuide[i]);
                }
            }
        }
        // console.log(yGuide);
        if(yGuide!==undefined&&yGuide.length>0){
            let length=yGuide.length;
            for(var i=0;i<length;i++){
                if(this.yGuideQueue[yGuide[i]]>1){
                    positionY.push(yGuide[i]);
                }
            }
        }
        return {X:positionX,Y:positionY}
    }
    getPositionAfterGuide(msg){
      let g_id=msg['g_id'];
      let trans={x:0,y:0};
      let element=getModuleByGid(g_id);
      if(element.isLine)return trans;
      let xGuide=this.getXGuide(g_id);
      let yGuide=this.getYGuide(g_id);

      let xFlag=false;
      let yFlag=false;
      let xLength=xGuide.length;

      let move_x=msg['move_x'];
      let move_y=msg['move_y'];
      for(var i=0;i<xGuide.length;i++){
          if(xFlag)break;
          if(this.xGuideQueue[xGuide[i]]>1){
              if(move_x>0&&move_x<2)trans['x']=-move_x;
              if(move_x<0&&move_x>-2)trans['x']=-move_x;
              xFlag=true;
          }
      }

      if(move_x>0&&xFlag){
          for(var i=0;i<xLength;i++){
              if(this.xGuideQueue[xGuide[i]+1]>0){
                  trans['x']=1-move_x;
                  xFlag=true;
              }
          }
      }
      if(move_x<0&&xFlag){
          for(var i=0;i<xGuide.length;i++){
              if(this.xGuideQueue[xGuide[i]-1]>0){
                  trans['x']=-1-move_x;
                  xFlag=true;
              }
          }
      }

      for(var i=0;i<yGuide.length;i++){
          if(yFlag)break;
          if(this.yGuideQueue[yGuide[i]]>1){
              if(move_y>0&&move_y<2)trans['y']=-move_y;
              if(move_y<0&&move_y>-2)trans['y']=-move_y;
              yFlag=true;
          }
      }
      if(move_y>0&&!yFlag){
          for(var i=0;i<yGuide.length;i++){
              if(this.yGuideQueue[yGuide[i]+1]>0){
                  trans['y']=1-move_y;
                  yFlag=true;
              }
          }
      }
      if(move_y<0&&!yFlag){
          for(var i=0;i<yGuide.length;i++){
              if(this.yGuideQueue[yGuide[i]-1]>0){
                  trans['y']=-1-move_y;
                  yFlag=true;
              }
          }
      }
      return trans;
    }

    getPositionAfterXGuideInGrid(x1,x2){
        if(x1>x2){
            let tmp=x1;
            x1=x2;
            x2=tmp;
        }
        let x=[]
        // console.log(x1,x2);
        for(var i=x1+1;i<x2;i++){
            if(this.xGuideQueue[i]>0){
                x.push(i);
            }
        }
        return x;
    }

    getPositionAfterYGuideInGrid(y1,y2){
        if(y1>y2){
            let tmp=y1;
            y1=y2;
            y2=tmp;
        }
        let y=[];
        // console.log(y1,y2);
        for(var i=y1+1;i<y2;i++){
            if(this.yGuideQueue[i]>0){
                y.push(i);
            }
        }
        return y;
    }
}
let guide_queue=new Guide_queue();

export function updateGuide(g_id){
    let element=getModuleByGid(g_id);
    if(element.isLine){
        return;
    }
    guide_queue.updateXGuide(g_id);
    guide_queue.updateYGuide(g_id);
}

export function getGuideBySvgId(g_id){
    return guide_queue.getGuide(g_id);
}

export function getPositionAfterGuide(msg){
    return guide_queue.getPositionAfterGuide(msg);
}

export function getXGuide(g_id) {
    return guide_queue.getXGuide(g_id);
}

export function getYGuide(g_id){
    return guide_queue.getYGuide(g_id);
}
export function getNumberX(x){
    let ans=guide_queue.xGuideQueue[x];
    if(ans===undefined){
        ans=0;
    }
    return ans;
}
export function getNumberY(y){
    let ans=guide_queue.yGuideQueue[y];
    if(ans===undefined){
        ans=0;
    }
    return ans;
}

export function getPositionAfterXGuideInGrid(x1,x2){
    return guide_queue.getPositionAfterXGuideInGrid(x1,x2);
}

export function getPositionAfterYGuideInGrid(y1,y2){
    return guide_queue.getPositionAfterYGuideInGrid(y1,y2);
}