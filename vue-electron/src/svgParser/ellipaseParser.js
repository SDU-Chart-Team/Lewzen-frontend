export class EllipaseParser{
    getHoverPosition(node){
        let position=[]
        let cx=parseInt(node.getAttribute('cx'))
        let cy=parseInt(node.getAttribute('cy'))
        let rx=parseInt(node.getAttribute('rx'))
        let ry=parseInt(node.getAttribute('ry'))
        position.push({cx:cx,cy:cy-ry})
        position.push({cx:cx+rx,cy:cy})
        position.push({cx:cx,cy:cy+ry})
        position.push({cx:cx-rx,cy:cy})

        return position;
    }

    getXGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let cx=parseInt(node.getAttribute('cx'))
        let cy=parseInt(node.getAttribute('cy'))
        let rx=parseInt(node.getAttribute('rx'))
        let ry=parseInt(node.getAttribute('ry'))
        position.push(cx);
        position.push(cx-rx);
        position.push(cx+ry);
        return position;

    }
    getYGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let cx=parseInt(node.getAttribute('cx'))
        let cy=parseInt(node.getAttribute('cy'))
        let rx=parseInt(node.getAttribute('rx'))
        let ry=parseInt(node.getAttribute('ry'))
        position.push(cy);
        position.push(cy-ry);
        position.push(cy+ry);
        return position;

    }
}
