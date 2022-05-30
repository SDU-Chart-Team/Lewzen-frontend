export class PathParser{
    getHoverPosition(node){
        let path_tmp=document.createElementNS(
            "http://www.w3.org/2000/svg",
            'path'
        )
        let d_tmp=""

        let position=[]
        let d=node.getAttribute("d")
        d=Trim(d)
        // console.log(node.getTotalLength())
        d=d.split(' ')
        let cnt=0;
        // console.log(d)
        for(var i=0;i<d.length;i++){
            let point={}
            if(d[i]==='M'){
                // console.log(111)
                d_tmp+=d[i]+" ";
                let x=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};
            }else if(d[i]==='L'){
                d_tmp+=d[i]+" ";
                let x=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let last_x=position[position.length-1]['cx']
                let last_y=position[position.length-1]['cy']
                point={cx:x,cy:y};
            }else if(d[i]==='C'){
                d_tmp+=d[i]+" ";
                let x1=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y1=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let x2=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y2=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let x=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};

            }else if(d[i]==='S'){
                d_tmp+=d[i]+" ";
                let x2=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y2=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let x=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};

            }else if(d[i]==='Q'){
                d_tmp+=d[i]+" ";
                let x1=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y1=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let x=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseInt(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};

            }else if(d[i]==='T') {
                d_tmp += d[i] + " ";
                let x = parseInt(d[++i]);
                d_tmp += d[i] + " ";
                let y = parseInt(d[++i]);
                d_tmp += d[i] + " ";
                point = {cx: x, cy: y};

            }
            let last_length=path_tmp.getTotalLength();
            path_tmp.setAttribute("d",d_tmp);
            let now_length=path_tmp.getTotalLength();
            if(cnt!==0){
                let point_mid=node.getPointAtLength((now_length-last_length)/3+last_length)
                let mid={cx:point_mid.x,cy:point_mid.y}
                position.push(mid)
                let point_mid1=node.getPointAtLength((now_length-last_length)/3*2+last_length)
                let mid1={cx:point_mid1.x,cy:point_mid1.y}
                position.push(mid1)
            }
            cnt++;
            // console.log(cnt)
            position.push(point);
        }
        // createPoints(position);
        return position;
    }
    getXGrade(svg_id){
        let position=[];
        let position_tmp=this.getHoverPosition(svg_id);
        for(var i=0;i<position_tmp;i++){
            position.push(position_tmp[i]['cx'])
        }
        return position;
    }
    getYGrade(svg_id){
        let position=[];
        let position_tmp=this.getHoverPosition(svg_id);
        for(var i=0;i<position_tmp;i++){
            position.push(position_tmp[i]['cx'])
        }
        return position;
    }

}
function Trim(str)
{
    if(str===undefined)return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
