<template>
    <el-menu id="rightClick"
             :unique-opened="true"
             :active-text-color="active_color"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
             @select="handleSelect"
            @close="handleClose">
        <el-submenu index="1">
            <span slot="title">Edit</span>
            <el-menu-item index="1-1">
                <span slot="title" >Delete</span>
            </el-menu-item>
            <el-menu-item index="1-2">
                <span slot="title">Copy</span>
            </el-menu-item>
            <el-menu-item index="1-3">
                <span slot="title">Paste</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <span slot="title">Arrange</span>
            <el-menu-item index="2-1">
                <span slot="title" >Front</span>
            </el-menu-item>
            <el-menu-item index="2-2">
                <span slot="title" >Back</span>
            </el-menu-item>
            <el-menu-item index="2-3">
                <span slot="title">Forward</span>
            </el-menu-item>
            <el-menu-item index="2-4">
                <span slot="title" >Backward</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <span slot="title">Style</span>
            <el-menu-item index="3-1">
                <span slot="title" >Shadow</span>
            </el-menu-item>
            <el-menu-item index="3-2">
                <span slot="title" >Fill</span>
            </el-menu-item>
            <el-menu-item index="3-3">
                <span slot="title">Line</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <span slot="title">Group</span>
            <el-menu-item index="4-1">
                <span slot="title">Group</span>
            </el-menu-item>
            <el-menu-item index="4-2">
                <span slot="title">Ungroup</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    import {getActionCounter, P} from "@/js/action/actionQueue";
    import {setShadow} from "@/js/canvas/operation/canvas_style_operation";

    export default {
        name: "rightClickBar",
        methods:{
            handleSelect(index){
                // console.log(index);
                if(index==="1-1"){
                    this.handleDelete();
                }else if(index==="2-1"){
                    this.handleFront();
                }else if(index==="2-2"){
                    this.handleBack();
                }else if(index==="2-3"){
                    this.handleForward();
                }else if(index==="2-4"){
                    this.handleBackward();
                }else if(index==="3-1"){
                    this.handleShadow();
                }else if(index==="3-2"){
                    this.handleFill();
                }else if(index==="3-3"){
                    this.handleLine();
                }
                let menu=document.getElementById("rightClick");
                if(menu!==undefined){
                    menu.style.display="none";
                }

            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleDelete(){
                let time= getActionCounter();
                P("remove",{time:time})
            },
            handleFront(){
                P("front",{})

            },
            handleBack(){
                P("back",{})

            },
            handleForward(){
                P("forward",{})

            },
            handleBackward(){
                P("backward",{})

            },
            handleShadow(){
                setShadow();
            },
            handleFill(){
                showFill()
            },
            handleLine(){
                showLine()
            }
        },
        data(){
            return{
                active_color:"blue"
            }
        }
    }
</script>

<style scoped>
#rightClick{
    position: absolute;
    display: none;
    left: 500px;
    top: 100px;
    height: 200px;
    width:200px;
}
</style>