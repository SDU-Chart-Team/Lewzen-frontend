export function getBBox(id){
    let node=document.getElementById(id)
    let children=node.getElementsByTagName("foreignObject")

    let children_tmp=[];
    // console.log(children);
    for(let i=0;i<children.length;i++){
        children_tmp.push(children[i])
        node.removeChild(children[i])
    }
    let bbox=node.getBBox()
    // console.log(bbox);
    // console.log(children_tmp);
    for(let i=0;i<children_tmp.length;i++){
        node.appendChild(children_tmp[i])
    }
    // console.log(node.childNodes);
    // console.log(bbox);
    return bbox;
}