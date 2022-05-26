export class LineParser{
    getHoverPosition(node){
        let position=[]
        let x1=parseInt(node.getAttribute('x1'))
        let y1=parseInt(node.getAttribute('y1'))
        let x2=parseInt(node.getAttribute('x2'))
        let y2=parseInt(node.getAttribute('y2'))
        position.push({cx:x1,cy:y1})
        position.push({cx:(x1+x2)/2,cy:(y1+y2)/2})
        position.push({cx:x2,cy:y2})
        return position;
    }
    getXGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let x1=parseInt(node.getAttribute('x1'))
        let y1=parseInt(node.getAttribute('y1'))
        let x2=parseInt(node.getAttribute('x2'))
        let y2=parseInt(node.getAttribute('y2'))
        position.push(x1);
        position.push(x2);
        position.push((x1+x2)/2);
        return position;
    }
    getYGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let x1=parseInt(node.getAttribute('x1'))
        let y1=parseInt(node.getAttribute('y1'))
        let x2=parseInt(node.getAttribute('x2'))
        let y2=parseInt(node.getAttribute('y2'))
        position.push(y1);
        position.push(y2);
        position.push((y1+y2)/2);
        return position;

    }
}