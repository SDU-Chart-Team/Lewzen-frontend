let mySvg="";
let last_map="";
let shape_map="";
let hover_map="";
let key_map="";
let text_map="";
let myDefs="";

export function updateCanvas(msg){
    setLastMapId(msg['last_map']);
    setShapeMapId(msg['shape_map']);
    setHoverMapId(msg['hover_map']);
    setTextMapId(msg['text_map']);
    setKeyMapId(msg['key_map']);
    setMyDefs(msg['myDefs']);
    setMySvg(msg['mySvg'])
    // console.log(msg);
}
export function setMySvg(value) {
    mySvg=value;
}

export function getMySvg(){
    return mySvg;
}

export function setLastMapId(value){
    last_map=value;
}

export function getLastMapId(){
    return last_map;
}

export function setShapeMapId(value){
    shape_map=value;
}

export function getShapeMapId() {
    return shape_map;
}

export function setHoverMapId(value){
    hover_map=value;
}

export function getHoverMapId(){
    return hover_map;
}

export function setKeyMapId(value){
    key_map=value;
}

export function getKeyMapId(){
    return key_map;
}

export function setTextMapId(value) {
    text_map=value;
}

export function getTextMapId(){
    return text_map;
}

export function setMyDefs(value){
    myDefs=value;
}

export function getMyDefs(){
    return myDefs;
}

