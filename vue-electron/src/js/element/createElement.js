export function createElementByTag(tag,id=""){
    let node=document.createElementNS(
        "http://www.w3.org/2000/svg",
        tag
    )
    if(id!==""){
        node.setAttribute("id",id);
    }
    return node;
}

export function DomParseNode(html){

}