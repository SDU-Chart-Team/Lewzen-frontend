<template>
  <div id="app">
<!--header-->
    <div>
      <div style="text-align: left; font-size: 12px;height: 60px ;margin-bottom: 5px" class="el-header">
        <div class="head-top clear">
          <div class="head-top-logo left">
            <el-image :src="logo" class="logo"></el-image>
          </div>
          <div class="head-top-item left">
            <div class="item-top">
              SDUChart
            </div>
            <div class="item-bottom">
              <DropdownMenu>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr style="padding-right: 0;margin-right: 0">
    <div style="text-align: left; font-size: 12px;height: 30px;margin-top: 5px;" class="el-header">
      <div class="head-bottom">
          <div class="OperationBar">
              <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-columns-full icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">

                  </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown>
            <span class="el-dropdown-link">
                <span class="icon-left">{{this.scaleNum}}%</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">

                  </el-dropdown-menu>
              </el-dropdown>
              <i class="el-icon-zoom-in icon leftBorder" @click="biggerCanvas"></i>
              <i class="el-icon-zoom-out icon rightBorder" @click="smallerCanvas"></i>
              <i class="el-icon-delete icon rightBorder" @click="deleteShape"></i>
              <i class="el-icon-back icon" @click="backAction"></i>
              <i class="el-icon-right icon rightBorder" @click="upAction"></i>
              <i class="el-icon-top icon" @click="extendWidth"></i>
              <i class="el-icon-bottom icon rightBorder" @click="extendHeight"></i>
              <i class="iconfont icon-tuse icon"></i>
              <i class="el-icon-edit icon "></i>

              <i class="iconfont icon-- icon rightBorder"></i>
              <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-right icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                  </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-zhexian icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                  </el-dropdown-menu>
              </el-dropdown>
              <!-- 创建图形   -->
              <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <i class="leftBorder iconfont icon-jiahao icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command=0>Rectangle</el-dropdown-item>
                      <el-dropdown-item command=1>Ellipase</el-dropdown-item>
                      <el-dropdown-item command=2>Rhombus</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont icon-fangge icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                  </el-dropdown-menu>
              </el-dropdown>
          </div>
      </div>
    </div>
<!--container-->
    <el-container style="height:550px;border: 1px solid #eee">
<!--leftsider-->
      <el-aside :width="leftAsideWidth" class="aside-div clear" style="background-color: #FBFBFB;padding-right: 20px">
        <el-scrollbar style="height: 100%;width: 100%;float: left;">
          <div class="left-top">
            <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="icon_search">
            </el-input>
          </div>
          <left-side-bar v-on:createShapeInForm2="createShape"></left-side-bar>
        </el-scrollbar>
        <div @mousedown="mousedown_aside" class="right slider" id="slider" style="line-height: 500px;background-color: #E1E1E1" @mouseenter="mouseenter_aside" @mouseleave="mouseleave_aside">
          <i class="el-icon-caret-right" style="font-size: 20px;vertical-align: center"></i>
        </div>
      </el-aside>
<!--midcanvas-->
      <el-main style="padding: 0" class="el-main">
<!--        <el-scrollbar style="height:100%;width: 100%">-->
<!--          <canvas @click="click_canvas" @mouseenter="mouseenter_canvas" @mousemove="mousemove_canvas" @mousedown="mousedown_canvas" @mouseup="mouseup_canvas" id="myCanvas" width="2000" height="1600">-->
<!--          </canvas>-->
          <div id="myCanvas" >
              <svg xmlns="http://www.w3.org/2000/svg" class="svg"  @click="click_canvas" id="mySvg" :width="canvas.width" :height="canvas.height"></svg>
          </div>
<!--        </el-scrollbar>-->
      </el-main>
<!--rightsider-->
      <el-aside width="300px" class="aside-div left" style="background-color:#FBFBFB">
        <right-side-bar></right-side-bar>
      </el-aside>
    </el-container>
<!--footer-->
    <el-container>
      <el-footer style="text-align: right; font-size: 12px">
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import iconBase from "@/components/icon/iconBase";
  import DropdownMenu from "@/components/dropdownMenu";
  import OperationBar from "@/components/OperationBar";
  import LeftSideBar from "@/components/leftSideBar";
  import rightSideBar from "@/components/rightSideBar";
  import RightSideBar from "@/components/rightSideBar";
  import IconBase from "@/components/icon/iconBase";
  import SimpleWebsocket from "./js/simplewebsocket.min.js"
  // import {moveSvg,scaleSvg,init,adjustCanvas,createGrid} from "@/js/svgdom.js";
  import {createSvg,deleteElement} from "@/js/svg";
  import {initSocket,sendSocket} from "@/js/socket/socket";
  import {popQueue,popOutQueue} from "@/js/actionQueue";
  import {canvas_init,canvas_change} from "@/js/canvasAction/canvasOperator";
  import {appendElement, deleteInCore} from "@/js/element/elementQueue";
  import {canvas_scale,canvas_adjust} from "@/js/canvasAction/canvasOperator";
  import {backward, forward} from "@/js/action/actionQueue";
  import {create_Action_Before} from "@/js/action/el_create_action";

  let socket;
  export default {
    name: "test",
    components: {IconBase, RightSideBar, LeftSideBar, OperationBar, DropdownMenu},
    mounted() {
        // init();
        // this.canvasQueue=new ElementQueue();
        initSocket();
        canvas_init();
    },
    methods:{
      //*****:operationBar的方法聚集
      handleCommand(command){
        this.createShapeInForm1(command);
      },
      createShapeInForm1(id){
        // console.log(id);
        this.createShape(id);
      },
      deleteShape(){
        // alert("delete")
        //   deleteElement();
        deleteInCore();
      },
      biggerCanvas(){
        // alert("bigger");
        // moveSvg();
          if(this.scaleNum>=300)return;
          let item=document.getElementById("myCanvas");
          this.scaleNum+=15;
          // scaleSvg(this.scaleNum);
          canvas_scale(this.scaleNum,this.canvas.height,this.canvas.width)
      },
      smallerCanvas(){
          if(this.scaleNum<=25)return;
          this.scaleNum-=15;
          // scaleSvg(this.scaleNum);
          canvas_scale(this.scaleNum,this.canvas.height,this.canvas.width)

      },
      //退回
      backAction(){
          // popQueue();
          backward();
      },
      //重做
      upAction(){
          // popOutQueue();
          forward();
      },
      //extend width
      extendWidth(){
          this.canvas.widthNum+=1;
          this.canvas.width+=this.canvas.baseWidth;
          // adjustCanvas(this.canvas.width,this.canvas.height);
          canvas_adjust(this.scaleNum,this.canvas.height,this.canvas.width)
      },

      //extend height
      extendHeight(){
          this.canvas.widthNum+=1;
          this.canvas.height+=this.canvas.baseHeight;
          // adjustCanvas(this.canvas.width,this.canvas.height);
          canvas_adjust(this.scaleNum,this.canvas.height,this.canvas.width)
      },

      //*****:侧边栏的方法
      mousedown_aside(e){
        // console.log("the method is mousedown_aside")
        let that=this;
        // let slider=document.getElementById("slider");
        // slider.style.backgroundColor="#FBFBFB"
        document.onmousemove=function(e){
          let endX=e.screenX;

          that.leftAsideWidth=endX+"px";
          that.leftAsideWidth_1=endX-13+"px";
        }
        document.onmouseup=function(evt){
          // let slider=document.getElementById("slider");
          // slider.style.backgroundColor="#E1E1E1"
          document.onmousemove=null;
          document.onmouseup=null;
        }
      },
      mouseleave_aside(e){
        // let slider=document.getElementById("slider");
        // slider.style.backgroundColor="#FBFBFB"
      },
      mouseenter_aside(e){
        // let slider=document.getElementById("slider");
        // slider.style.backgroundColor="#E1E1E1"
      },
      click_canvas(e){
      },
      createShape(shape_id){
        create_Action_Before(shape_id)
        // appendElement(0);
          // createSvg(shape_id);
        // let x=0;
        // let y=0;
        let val={
            avg:0,
            sort:1
        }
        sendSocket(val);
        // socket.send("message",val);
        // socket.on('data', function(data) {
        //     log('got message: ' + data)
        // });
        // console.log("createShape");
        // let canvas=document.getElementById("myCanvas");
        // let img=document.createElement('img');
        // img.style.width='462px';
        // img.style.height='467px';
        // var html = '<svg xmlns="http://www.w3.org/2000/svg" width="467" height="462" id="source">'
        //         +  '<rect x="0" y="0" width="250" height="250" rx="20" style="fill:#ff0000; stroke:#000000;stroke-width:2px;"/>'
        //         +  '<rect x="140" y="120" width="250" height="250" rx="40" style="fill:#0000ff; stroke:#000000; stroke-width:2px; fill-opacity:0.7;"/>'
        //         +'</svg>';
        // img.src = 'data:image/svg+xml;base64,' + window.btoa(html);
        // img.onload = function() {
        //   canvas.getContext('2d').drawImage(img, x, y);
        // }

      },
      mouseenter_canvas(e){
        // console.log("the method is mouseenter_canvas")
        // console.log(e.screenX);
        // console.log(e.screenY);
      },

      mousedown_canvas(e){
        console.log("the method is mousedown_canvas")
        this.state=1;
        // console.log("state is "+this.state);
      },
      mouseup_canvas(e){
        console.log("the method is mouseup_canvas")
        this.state=0;
        // console.log("state is "+this.state);
      },
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        logo:require("D:\\WebstormProjects\\vue2Electron\\vue-electron\\src\\assets\\logo.png"),
        state:0,
        leftAsideWidth:"200px",
        leftAsideWidth_1:"190px",
        aside_position:0,
        aside_change:0,
        icon_search:"",
        scaleNum:100,
        canvas:{
            width:210*4,
            height:297*4,
            widthNum:1,
            heightNum:1,
            baseWidth:210*4,
            baseHeight:297*4
        },
        canvasQueue:{}
      }
    }
  };
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }


  .slider{
    width: 20px;
    height:100%;
    margin-right: -20px;
    cursor:ew-resize;
    vertical-align: center;
  }
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
  .el-header{
    /*background-color: #B3C0D1;*/
    color: #333;
  }
  .el-footer{
    background-color: #B3C0D1;
    color: #333;
  }
  .el-aside {
    color: #333;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .clear{
    overflow: hidden;
  }
  .logo{
    height: 50px;
    width: 50px;
    padding: 10px;
  }
  .item-top{
    font-size: 20px;
    font-weight: 400;
    padding: 10px;
  }
  .item-bottom{
    padding-left:10px;
  }
  .aside-div{
    width: 100px;
    /*overflow-x: hidden;*/
  }
  body .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .OperationBar{
      padding-left:10px;
      line-height: 30px;
  }
  .icon{
      padding-left: 8px;
      padding-right: 8px;
  }
  .icon-right{
      margin-right: 8px;
  }
  .icon-left{
      padding-left: 8px;
  }
  i{
      font-size: 20px;
  }
  .leftBorder{
      border-left:#E1E1E1 solid 2px;
  }
  .rightBorder{
      border-right: #E1E1E1 solid 2px;
  }
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      padding-right: 8px;
  }
  .el-icon-arrow-down {
      font-size: 12px;
  }
  #myCanvas{
      height: 1600px;
      width: 2000px;
      text-align: left;
      padding: 100px;
      background-color: #F8F9FA;
      /*overflow:hidden;*/
      overflow-x: auto;
      overflow-y: auto;
  }
  #mySvg{
      background-color: white;
      border: #e9e9e9 solid 1px;
  }
  .hover:hover{
      border: yellow solid 3px;
  }
</style>

