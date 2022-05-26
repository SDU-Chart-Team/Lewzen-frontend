export class CircleParser{
    getHoverPosition(node){
        let position=[]
        let cx=parseInt(node.getAttribute('cx'))
        let cy=parseInt(node.getAttribute('cy'))
        let r=parseInt(node.getAttribute('r'))
        let r2=r*Math.sin(Math.PI/4)
        position.push({cx:cx+r2,cy:cy+r2})
        position.push({cx:cx-r2,cy:cy-r2})
        position.push({cx:cx+r2,cy:cy-r2})
        position.push({cx:cx-r2,cy:cy+r2})

        position.push({cx:cx,cy:cy-r})
        position.push({cx:cx+r,cy:cy})
        position.push({cx:cx,cy:cy+r})
        position.push({cx:cx-r,cy:cy})

        return position;
    }

    getXGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let cx=parseInt(node.getAttribute('cx'))
        let cy=parseInt(node.getAttribute('cy'))
        let r=parseInt(node.getAttribute('r'))
        position.push(cx);
        position.push(cx-r);
        position.push(cx+r);
        return position;

    }
    getYGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let cx=parseInt(node.getAttribute('cx'))
        let cy=parseInt(node.getAttribute('cy'))
        let r=parseInt(node.getAttribute('r'))
        position.push(cy);
        position.push(cy-r);
        position.push(cy+r);
        return position;

    }
}
