export class RectParser {
    getHoverPosition(node){
        let position=[]
        let x=parseInt(node.getAttribute("x"))
        let y=parseInt(node.getAttribute('y'))
        let width=parseInt(node.getAttribute('width'))
        let height=parseInt(node.getAttribute('height'))
        position.push({cx:x,cy:y})
        position.push({cx:x+width/4,cy:y})
        position.push({cx:x+width/4*2,cy:y})
        position.push({cx:x+width/4*3,cy:y})
        position.push({cx:x+width,cy:y})

        position.push({cx:x+width,cy:y+height/4})
        position.push({cx:x+width,cy:y+height/4*2})
        position.push({cx:x+width,cy:y+height/4*3})
        position.push({cx:x+width,cy:y+height})

        position.push({cx:x+width/4,cy:y+height})
        position.push({cx:x+width/4*2,cy:y+height})
        position.push({cx:x+width/4*3,cy:y+height})
        position.push({cx:x+width,cy:y+height})

        position.push({cx:x,cy:y+height})
        position.push({cx:x,cy:y+height/4})
        position.push({cx:x,cy:y+height/4*2})
        position.push({cx:x,cy:y+height/4*3})
        // console.log(position)
        return position;
    }

    getXGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let x=parseInt(node.getAttribute("x"))
        let y=parseInt(node.getAttribute('y'))
        let width=parseInt(node.getAttribute('width'))
        let height=parseInt(node.getAttribute('height'))
        position.push(x);
        position.push(x+width);
        position.push(x+width/2);
        return position;

    }
    getYGrade(svg_id){
        let position=[];
        let node=document.getElementById(svg_id);
        let x=parseInt(node.getAttribute("x"))
        let y=parseInt(node.getAttribute('y'))
        let width=parseInt(node.getAttribute('width'))
        let height=parseInt(node.getAttribute('height'))
        position.push(y);
        position.push(y+height);
        position.push(y+height/2);
        return position;
    }
}