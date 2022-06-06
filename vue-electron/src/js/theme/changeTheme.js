import th from "element-ui/src/locale/lang/th";

function defaultTheme(){
    let node=document.querySelector("body")
    console.log(1)
}

function nightTheme(){
    // let node=document.getElementById("app");
    // let list=[];
    // list.push(node);
    // while(list.length>0){
    //     let nod=list[0];
    //     console.log(nod);
    //     if(nod===undefined)continue;
    //     if(nod.style===undefined)continue;
    //     if(nod.style.backgroundColor===undefined)continue;
    //     nod.style.backgroundColor="black !important"
    //     let children=nod.childNodes;
    //     list.splice(0,1);
    //     for(let i=0;i<children.length;i++){
    //         list.push(children[i]);
    //     }
    // }

    // console.log(111);
    // node.setAttribute("style","background-color:black !important;")
}

export function changeTheme(theme){
    if(theme==="night"){
        nightTheme();
    }else if(theme==="default"){
        defaultTheme();
    }
}
