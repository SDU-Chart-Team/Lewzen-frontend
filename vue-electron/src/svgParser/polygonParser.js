export class PolygonParser {
    getHoverPosition(node){
        let position=[]
        let points=node.getAttribute("points")
        // console.log(points.split(' '))
        points=points.split(' ');
        console.log(points)
        for (var i=0;i<points.length;i++){
            let xy=points[i].split(',')
            if(i!==0){
                let xy_front=position[position.length-1];
                console.log(xy_front);
                console.log(xy)
                position.push({cx:(parseInt(xy[0])+parseInt(xy_front['cx']))/2,cy:(parseInt(xy[1])+parseInt(xy_front['cy']))/2})
            }
            position.push({cx:xy[0],cy:xy[1]})
        }
        position.push({cx:(parseInt(position[position.length-1]['cx'])+parseInt(position[0]['cx']))/2,cy:(parseInt(position[position.length-1]['cy'])+parseInt(position[0]['cy']))/2})
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
