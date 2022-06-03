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
        // console.log(d);
        d=d.split(' ')
        let tmp=[];
        var reg=new RegExp("^[a-zA-Z]");
        for(let i=0;i<d.length;i++){
            if(reg.test(d[i])){
               d[i]=d[i].split(',');
               // console.log(d[i])
               // console.log(d[i][0])
               tmp.push(d[i][0][0]);
               d[i][0]=d[i][0].substr(1,d[i][0].length-1);
               // console.log(d[i][0])
               for(let j=0;j<d[i].length;j++){
                   tmp.push(d[i][j]);
               }
            }else{
                d[i]=d[i].split(',');
                for(let j=0;j<d[i].length;j++){
                    tmp.push(d[i][j]);
                }
            }
        }
        d=tmp;// console.log(node.getTotalLength())
        for(let i=0;i<d.length;i++){
            if(d[i]===''){
                d.splice(i,1);
            }
        }
        // console.log(d);

        let cnt=0;
        // console.log(d)
        for(var i=0;i<d.length;i++){
            let point={}
            if(d[i]==='M'){
                // console.log(111)
                d_tmp+=d[i]+" ";
                let x=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};
            }else if(d[i]==='L'){
                d_tmp+=d[i]+" ";
                let x=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let last_x=position[position.length-1]['cx']
                let last_y=position[position.length-1]['cy']
                point={cx:x,cy:y};
            }else if(d[i]==='C'){
                d_tmp+=d[i]+" ";
                let x1=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y1=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let x2=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y2=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let x=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};

            }else if(d[i]==='S'){
                d_tmp+=d[i]+" ";
                let x2=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y2=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let x=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};

            }else if(d[i]==='Q'){
                d_tmp+=d[i]+" ";
                let x1=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y1=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let x=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                let y=parseFloat(d[++i]);
                d_tmp+=d[i]+" ";
                point={cx:x,cy:y};

            }else if(d[i]==='T') {
                d_tmp += d[i] + " ";
                let x = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                let y = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                point = {cx: x, cy: y};
            }else if(d[i]==='z'||d[i]==='Z'){
                d_tmp+=d[i];
                point = {cx: position[0]['cx'],cy:position[0]['cy']}
            }else if(d[i]==='A'){
                d_tmp += d[i] + " ";
                let x = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                let y = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                y = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                y = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                y = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                x = parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                y=parseFloat(d[++i]);
                d_tmp += d[i] + " ";
                point={cx:x,cy:y};
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
