import th from "element-ui/src/locale/lang/th";

function defaultTheme(){
    let nodelist=document.getElementsByClassName("el-collapse-item__header")
    for(let i=0;i<nodelist.length;i++){
        // console.log(nodelist[i]);
        nodelist[i].style.backgroundColor="white"
        nodelist[i].style.color="black"
    }
    nodelist=document.getElementsByClassName("el-collapse-item__wrap")
    for(let i=0;i<nodelist.length;i++){
        // console.log(nodelist[i]);
        nodelist[i].style.backgroundColor="white"
        nodelist[i].style.color="black"
    }
    let node=document.getElementById("elementManageButton")
    node.style.backgroundColor="white"
    node.style.color="black"

    node=document.getElementById("app");
    node.style.backgroundColor="white"
    node.style.color="black"

    nodelist=document.getElementsByClassName("el-collapse-item")
    for(let i=0;i<nodelist.length;i++){
        nodelist[i].style.backgroundColor="white";
        nodelist[i].style.color="black"
    }

    node=document.getElementById("mySvg")
    node.style.backgroundColor="white";
    node.style.color="black"

    node=document.getElementById("rightBar")
    node.style.backgroundColor="white";
    node.style.color="black"

    node=document.getElementById("footerBar")
    node.style.backgroundColor="white";
    node.style.color="black";

    node=document.getElementById("chart_title")
    node.style.backgroundColor="white";
    node.style.color="black";

    nodelist=document.getElementsByClassName("el-tabs__item")
    for(let i=0;i<nodelist.length;i++){
        nodelist[i].style.backgroundColor="white";
        nodelist[i].style.color="black"
    }

}

function nightTheme(){
    let nodelist=document.getElementsByClassName("el-collapse-item__header")
    for(let i=0;i<nodelist.length;i++){
        // console.log(nodelist[i]);
        nodelist[i].style.backgroundColor="black"
        nodelist[i].style.color="white"
    }
    nodelist=document.getElementsByClassName("el-collapse-item__wrap")
    for(let i=0;i<nodelist.length;i++){
        // console.log(nodelist[i]);
        nodelist[i].style.backgroundColor="black"
        nodelist[i].style.color="white"
    }
    let node=document.getElementById("elementManageButton")
    node.style.backgroundColor="black"
    node.style.color="white"

    node=document.getElementById("app");
    node.style.backgroundColor="black"
    node.style.color="white"

    nodelist=document.getElementsByClassName("el-collapse-item")
    for(let i=0;i<nodelist.length;i++){
        nodelist[i].style.backgroundColor="black";
        nodelist[i].style.color="white"
    }

    node=document.getElementById("mySvg")
    node.style.backgroundColor="black";
    node.style.color="white"

    node=document.getElementById("rightBar")
    node.style.backgroundColor="black";
    node.style.color="white"

    node=document.getElementById("footerBar")
    node.style.backgroundColor="black";
    node.style.color="white";

    nodelist=document.getElementsByClassName("el-tabs__item")
    for(let i=0;i<nodelist.length;i++){
        nodelist[i].style.backgroundColor="black";
        nodelist[i].style.color="white"
    }

    node=document.getElementById("chart_title")
    node.style.backgroundColor="black";
    node.style.color="white";

    // console.log(111);
    // node.setAttribute("style","background-color:black !important;")
}
function eyeTheme(){
    let nodelist=document.getElementsByClassName("el-collapse-item__header")
    for(let i=0;i<nodelist.length;i++){
        // console.log(nodelist[i]);
        nodelist[i].style.backgroundColor="rgb(199,237,204)"
        nodelist[i].style.color="black"
    }
    nodelist=document.getElementsByClassName("el-collapse-item__wrap")
    for(let i=0;i<nodelist.length;i++){
        // console.log(nodelist[i]);
        nodelist[i].style.backgroundColor="rgb(199,237,204)"
        nodelist[i].style.color="black"
    }
    let node=document.getElementById("elementManageButton")
    node.style.backgroundColor="rgb(199,237,204)"
    node.style.color="black"

    node=document.getElementById("app");
    node.style.backgroundColor="rgb(199,237,204)"
    node.style.color="black"

    nodelist=document.getElementsByClassName("el-collapse-item")
    for(let i=0;i<nodelist.length;i++){
        nodelist[i].style.backgroundColor="rgb(199,237,204)";
        nodelist[i].style.color="black"
    }

    node=document.getElementById("mySvg")
    node.style.backgroundColor="rgb(199,237,204)";
    node.style.color="black"

    node=document.getElementById("rightBar")
    node.style.backgroundColor="rgb(199,237,204)";
    node.style.color="black"

    node=document.getElementById("footerBar")
    node.style.backgroundColor="rgb(199,237,204)";
    node.style.color="black";

    node=document.getElementById("chart_title")
    node.style.backgroundColor="rgb(199,237,204)";
    node.style.color="black";

    nodelist=document.getElementsByClassName("el-tabs__item")
    for(let i=0;i<nodelist.length;i++){
        nodelist[i].style.backgroundColor="rgb(199,237,204)";
        nodelist[i].style.color="black"
    }

}


export function changeTheme(theme){
    if(theme==="night"){
        nightTheme();
    }else if(theme==="default"){
        defaultTheme();
    }else if(theme==="eyeshield"){
        eyeTheme();
    }
}
