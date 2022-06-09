let imageMap={}

let imageCounter=0;
export function getImageCounter(){
    return imageCounter++;
}
export function setImageCounter(count){
    imageCounter=count;
}
export function addImage(id,image_id){
    if(imageMap[id]===undefined){
        imageMap[id]=[];
    }
    imageMap[id].push(image_id);
}
export function initImage(image_list){
    for(let i=0;i<image_list.length;i++){
        let item=image_list[i];
        if(imageMap[item['id']]===undefined){
            imageMap[item['id']]=[];
        }
        imageMap[item['id']].push(imageMap[item['image_id']])
    }
}
export function getImage(){
    let list=[];
    for(let key in imageMap){
        let list_tmp=imageMap[key];
        for(let i=0;i<list_tmp.length;i++){
            let node=document.getElementById(list_tmp[i]);
            if(node!==undefined&&node!==null){
                list.push({id:key,image_id:list_tmp[i]});
            }
        }
    }
    return list;
}