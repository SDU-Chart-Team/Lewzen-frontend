<template>
  <div id="app">
<!--header-->
    <div>
      <div style="text-align: left; font-size: 12px;height: 70px ;margin-bottom: 5px" class="el-header">
        <div class="head-top clear">
          <div class="head-top-logo left">
            <el-image :src="require('@/assets/icon.png')" class="logo"></el-image>
          </div>
          <div class="head-top-item left">
            <div class="item-top">
              <div @dblclick="file_name_change=true" v-if="!file_name_change">
                  {{file_name}}
              </div>
              <el-input
                      @change="file_name_change=false"
                      v-if="file_name_change"
                      v-model="file_name"
                      size="mini"
              ></el-input>
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
    <div style="text-align: left; font-size: 12px;height: 35px;margin-top: 5px;" class="el-header">
      <div class="head-bottom">
          <div class="OperationBar">
<!--              <el-dropdown @command="handleModelChange">-->
<!--            <span class="el-dropdown-link">-->
<!--                <i class="iconfont icon-columns-full icon-left">-->
<!--                </i>-->
<!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </span>-->
<!--                  <el-dropdown-menu slot="dropdown">-->
<!--                          <el-dropdown-item command=0>Diagram</el-dropdown-item>-->
<!--                          <el-dropdown-item command=1>Note</el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<!--              画布百分比显示-->
              <el-dropdown @command="handleScale">
               <span class="el-dropdown-link" >
                <span class="icon-left">{{this.scaleNum}}%</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
               </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command=75>75%</el-dropdown-item>
                      <el-dropdown-item command=100>100%</el-dropdown-item>
                      <el-dropdown-item command=125>125%</el-dropdown-item>
                      <el-dropdown-item command=150>150%</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>



              <!--              画布放大-->
              <i class="el-icon-zoom-in icon leftBorder"
                 :style="zoom_in_color"
                 @click="biggerCanvas"></i>
<!--              画布缩小-->
              <i class="el-icon-zoom-out icon rightBorder"
                 :style="zoom_out_color"
                 @click="smallerCanvas"></i>
<!--              删除-->
              <i class="el-icon-delete icon rightBorder"
                 :style="delete_color"
                 @click="deleteShape"></i>
<!--              撤销-->
              <i class="el-icon-back icon"
                 :style="back_color"
                 @click="backAction"></i>
<!--              重做-->
              <i class="el-icon-right icon rightBorder"
                 :style="up_color"
                 @click="upAction"></i>
<!--              置顶-->
              <i class="el-icon-top icon"
                 :style="top_color"
                 @click="topAction"
                 ></i>
<!--              置底-->
              <i class="el-icon-bottom icon rightBorder"
                 :style="bottom_color"
                 @click="bottomAction"
                 ></i>
<!--              填充颜色-->
              <i class="iconfont icon-tuse icon"
                 :style="fill_color"
                 @click="fillAction"
              ></i>
<!--              线条颜色-->
              <i class="el-icon-edit icon "
                 :style="line_color"
                 @click="lineAction"
              ></i>
<!--              添加阴影-->
              <i class="iconfont icon-- icon rightBorder"
                 :style="shadow_color"
                 @click="shadowAction"
              ></i>
<!--              添加箭头-->
              <el-dropdown @command="handleArrowStyle">
                <span class="el-dropdown-link">
                    <i class="iconfont icon-right icon-left"></i>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="solid">solid</el-dropdown-item>
                    <el-dropdown-item command="dotted">dotted</el-dropdown-item>
                    <el-dropdown-item command="dashed">dashed</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
<!--              添加折线-->
              <el-dropdown @command="handleLineType">
            <span class="el-dropdown-link">
                <i class="iconfont icon-zhexian icon-left"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="straight_line">straight_line</el-dropdown-item>
                      <el-dropdown-item command="vertical_line">vertical_line</el-dropdown-item>
                      <el-dropdown-item command="curve">curve</el-dropdown-item>
                      <el-dropdown-item command="horizontal_line">horizontal_line</el-dropdown-item>
                      <el-dropdown-item command="curve_two">curve_two</el-dropdown-item>
                      <el-dropdown-item command="hallow_line">hallow_line</el-dropdown-item>
                      <el-dropdown-item command="complex_line">complex_line</el-dropdown-item>
                      <el-dropdown-item command="flexible_line">flexible_line</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
<!--              创建图形-->
              <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="leftBorder iconfont icon-jiahao icon-left"></i>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command=2>Rectangle</el-dropdown-item>
                        <el-dropdown-item command=1>Ellipse</el-dropdown-item>
                        <el-dropdown-item command=17>triangle</el-dropdown-item>
                        <el-dropdown-item command=30>Line</el-dropdown-item>
                    </el-dropdown-menu>
              </el-dropdown>
<!--              <el-dropdown>-->
<!--            <span class="el-dropdown-link">-->
<!--                <i class="iconfont icon-fangge icon-left"></i>-->
<!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </span>-->
<!--                  <el-dropdown-menu slot="dropdown">-->
<!--                  </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<!--创建block-->
<!--              <el-dropdown @command="handleAddBlock">-->
<!--            <span class="el-dropdown-link">-->
<!--                <i class="leftBorder iconfont icon-jiahao icon-left"></i>-->
<!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </span>-->
<!--                  <el-dropdown-menu slot="dropdown">-->
<!--                      <el-dropdown-item command=1>Note</el-dropdown-item>-->
<!--                      <el-dropdown-item command=2>Svg</el-dropdown-item>-->
<!--                      <el-dropdown-item command=3>Graph</el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--              </el-dropdown>-->


          </div>
      </div>
    </div>
<!--container-->
    <el-container style="height:590px;border: 1px solid #eee">
<!--leftsider-->
      <el-aside :width="leftAsideWidth" class="aside-div clear" style="background-color: #FBFBFB;padding-right: 20px">
        <el-scrollbar style="height: 100%;width: 100%;float: left;">
          <div class="left-top">
<!--            <el-input-->
<!--                    placeholder="请输入内容"-->
<!--                    prefix-icon="el-icon-search"-->
<!--                    style="user-select: none"-->
<!--                    v-model="icon_search">-->
<!--            </el-input>-->
              <el-button
                      style="width: 100%"
              >
                  add your element
              </el-button>
          </div>
          <left-side-bar v-on:createShapeInForm2="createShape"></left-side-bar>
        </el-scrollbar>
        <div @mousedown="mousedown_aside" class="right slider" id="slider" style="line-height: 500px;background-color: #E1E1E1" @mouseenter="mouseenter_aside" @mouseleave="mouseleave_aside">
          <i class="el-icon-caret-right" style="font-size: 20px;vertical-align: center"></i>
        </div>
      </el-aside>
<!--midcanvas-->
      <el-main style="padding: 0" id="main_canvas"  class="el-main">
<!--        <el-scrollbar style="height:100%">-->
<!--          <canvas @click="click_canvas" @mouseenter="mouseenter_canvas" @mousemove="mousemove_canvas" @mousedown="mousedown_canvas" @mouseup="mouseup_canvas" id="myCanvas" width="2000" height="1600">-->
<!--          </canvas>-->
              <div id="myCanvas" >
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg"  @click="click_canvas" id="mySvg" :width="canvas_width" :height="canvas_height">
                      <defs id="myDefs"></defs>
                      <g id="last_map">
                          <rect id="last" :height="canvas_height" :width="canvas_width" style="fill-opacity: 0"></rect>
                      </g>
                      <g id="text_map"></g>
                      <g id="shape_map"></g>
                      <g id="hover_map"></g>
                      <g id="key_map"></g>
                      <g id="node_map"></g>

                      <!--                  <g>-->
                      <!--                      <foreignObject width="100%" height="100%" style="display: inline-block">-->
                      <!--                          <div-->
                      <!--                                  xmlns="http://www.w3.org/1999/xhtml"-->
                      <!--                                  style="display: inline-block"-->
                      <!--                                  @dblclick="ondblclick"-->
                      <!--                          >-->
                      <!--                              <p><em>hel11111</em><em><strong>111</strong></em><u><em><strong>111</strong></em></u><u><em>1lo</em></u></p>-->
                      <!--                          </div>-->
                      <!--                      </foreignObject>-->
                      <!--                  </g>-->
                  </svg>
                  <right-click-bar></right-click-bar>
              </div>
          <el-dialog
                  title="fill style"
                  :visible.sync="fillVisible"
                  width="30%"

          >
              <fill-bar_dia></fill-bar_dia>
          </el-dialog>


          <el-dialog
                  title="line style"
                  :visible.sync="lineVisible"
                  width="30%"

          >
              <line-bar_dia></line-bar_dia>
          </el-dialog>

<!--          <el-dialog-->
<!--                  title="Graph"-->
<!--                  :visible.sync="graphVisible"-->
<!--                  width="50%"-->

<!--          >-->
<!--              <graph-create-bar></graph-create-bar>-->
<!--          </el-dialog>-->


<!--        </el-scrollbar>-->
      </el-main>
<!--rightsider-->
      <el-aside id="rightBar" class="aside-div left RightTab" :width="rightWidth" >
        <right-side-bar></right-side-bar>

      </el-aside>

    </el-container>
<!--footer-->
    <el-container>
      <el-footer style="background-color:#FBFBFB;height:29px;text-align: right; font-size: 12px">
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
  import "@/assets/style/style.css"
  import GlobalTextEditor from "./components/integratedEditor.vue";
  import editorToolbar from "./components/toolbar.vue";
  import {create_Action_Before} from "@/js/action/create_action";
  import {initSocket} from "@/js/socket/socket";
  import {backAction, forwardAction, getActionCounter, P} from "@/js/action/actionQueue";
  import {DomOperator} from "@/js/util/domOperation";
  import {offCoreAll} from "@/js/element/core/core_queue";
  import {inDiagramModel} from "@/js/canvas/operation/canvas_model_operation";
  import {initKey} from "@/js/keymap/keyModel";
  import {init_canvas} from "@/js/element/last/last_map_operation";
  import IntegratedEditor from "@/components/integratedEditor";
  import NodeView from "@/views/NoteView";
  import {addBlockById} from "@/js/note/addBlock";
  import {updateCanvas} from "@/js/util/getCanvasIdOperation";
  import {get_canvas_scale, setSvgScaleNum} from "@/js/util/canvas_operation";
  import {cssParser} from "@/js/util/cssParser";
  import {canvasAdjust} from "@/js/canvas/base_canvas";
  import FillBar from "@/components/baritem/FillBar";
  import LineBar from "@/components/baritem/LineBar";
  import {setShadow} from "@/js/canvas/operation/canvas_style_operation";
  import RightClickBar from "@/components/rightClickBar";
  import Module from "./js/socket/wasm"
  import GraphCreateBar from "@/components/bargraph/graphCreateBar";
  import LineBar_dia from "./components/baritem/LineBar_dia";
  import FillBar_dia from "./components/baritem/FillBar_dia";
  import {updateState} from "./js/action/actionQueue";
  import {updateStyle, updateStyleDia} from "./js/canvas/operation/canvas_style_operation";
  import {getCoreList} from "./js/element/core/core_queue";
  import {set_dotted_line_type_Before, set_line_type_Before} from "./js/util/setLineType";
  export default {
    name: "test",
    components: {
        FillBar_dia,
        LineBar_dia,
        GraphCreateBar,
        RightClickBar,
        LineBar,
        FillBar,
        NodeView,
        IntegratedEditor,
        IconBase,
        RightSideBar,
        LeftSideBar,
        OperationBar,
        DropdownMenu,
        GlobalTextEditor,
        editorToolbar
    },
    mounted() {
        // initSocket();
        // Module.server_init();
        initKey();//初始化键盘事件
        init_canvas();
        window.get_canvas_height_and_width=this.get_canvas_height_and_width;
        window.showLine=this.lineAction;
        window.showFill=this.fillAction;
        window.mapUpdate=this.mapUpdate;
        window.color_change_bar=this.color_change_bar;
        window.get_file_name=this.get_file_name;
        window.showGraphBar=this.createGraph;
    },
    data() {
          const item = {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
          };
          return {
              file_name:"Chart",
              file_name_change:false,
              tableData: Array(20).fill(item),
              state:0,
              leftAsideWidth:"200px",
              leftAsideWidth_1:"190px",
              aside_position:0,
              aside_change:0,
              icon_search:"",
              scaleNum:100,
              div_width:2000,
              div_height:2500,
              canvas_width:1629,
              canvas_height:2209,
              canvasQueue:{},
              message: "<h1> 123 </h1>",
              editting: false,
              ViewModel:false,
              can_set_color:"color:#409EFF",
              cant_set_color:"color:#C9C9C9",
              zoom_in_color:"color:#409EFF",
              zoom_in_can:true,
              zoom_out_color:"color:#409EFF",
              zoom_out_can:true,
              delete_color:"color:#C9C9C9",
              delete_can:false,
              back_color:"color:#C9C9C9",
              back_can:false,
              up_color:"color:#C9C9C9",
              up_can:false,
              top_color:"color:#C9C9C9",
              top_can:false,
              bottom_color:"color:#C9C9C9",
              bottom_can:false,
              fill_color:"color:#C9C9C9",
              fill_can:false,
              line_color:"color:#C9C9C9",
              line_can:false,
              shadow_color:"color:#C9C9C9",
              shadow_can:false,
              fillVisible:false,
              lineVisible:false,
              graphVisible:false,
              rightWidth:"350px"
          }
      },
    methods:{
        handleArrowStyle(e){
            // console.log(e);
            set_dotted_line_type_Before(e);
        },
        handleLineType(e){
            set_line_type_Before(e);
        },
        get_file_name(){
          return this.file_name;
        },
        get_canvas_height_and_width(){
            return {width:this.canvas_width,height:this.canvas_height}
        },
        createGraph(){
            // alert(1);
            this.graphVisible=true;
        },
        color_change_bar(msg){
            if(msg['zoom_in']!==undefined){
                this.zoom_in_color=msg['zoom_in']===true?this.can_set_color:this.cant_set_color;
                this.zoom_in_can=msg['zoom_in']
            }
            if(msg['zoom_out']!==undefined){
                this.zoom_out_color=msg['zoom_out']===true?this.can_set_color:this.cant_set_color;
                this.zoom_out_can=msg['zoom_out']
            }
            if(msg['delete']!==undefined){
                this.delete_color=msg['delete']===true?this.can_set_color:this.cant_set_color;
                this.delete_can=msg['delete']
            }
            if(msg['back']!==undefined){
                this.back_color=msg['back']===true?this.can_set_color:this.cant_set_color;
                this.back_can=msg['back']
            }
            if(msg['up']!==undefined){
                this.up_color=msg['up']===true?this.can_set_color:this.cant_set_color;
                this.up_can=msg['up']
            }
            if(msg['top']!==undefined){
                this.top_color=msg['top']===true?this.can_set_color:this.cant_set_color;
                this.top_can=msg['top']
            }
            if(msg['bottom']!==undefined){
                this.bottom_color=msg['bottom']===true?this.can_set_color:this.cant_set_color;
                this.bottom_can=msg['bottom']
            }
            if(msg['fill']!==undefined){
                this.fill_color=msg['fill']===true?this.can_set_color:this.cant_set_color;
                this.fill_can=msg['fill']
            }
            if(msg['line']!==undefined){
                this.line_color=msg['line']===true?this.can_set_color:this.cant_set_color;
                this.line_can=msg['line']
            }
            if(msg['shadow']!==undefined){
                this.shadow_color=msg['shadow']===true?this.can_set_color:this.cant_set_color;
                this.shadow_can=msg['shadow']
            }

        },

        scaleMap(msg){
          this.scaleNum=msg['scale'];
          let width=this.canvas_width;
          let height=this.canvas_height;
          let scale=this.scaleNum/100;
          let new_width=width*scale;
          let new_height=height*scale;
          let canvas=document.getElementById("mySvg");
          let text="scale("+scale+","+scale+")"
          canvas.setAttribute("transform",text)
          // let width_div=Math.floor(200+new_width)+"px";
          // let height_div=Math.floor(200+new_height)+"px"
            let width_div="5000px";
          let height_div="5000px";
          console.log(width_div);console.log(height_div);
          let node=document.getElementById("myCanvas");
          node.setAttribute("height",height_div);
          node.setAttribute("width",width_div);

        },

        handleScale(command){
            let scale=parseInt(command)/100
            setSvgScaleNum(scale)
        },
        mapUpdate(msg){
            if(msg['height']!==undefined){
                this.canvas_height=msg['height']
            }
            if(msg['width']!==undefined){
                this.canvas_width=msg['width'];
            }
            let scale=get_canvas_scale();
            this.scaleNum=Math.floor(scale*100)
            let width=parseFloat(this.canvas_width*scale);
            let height=parseFloat(this.canvas_height*scale);
            // console.log(width,height);
            let node=document.getElementById("myCanvas");
            let parser=new cssParser();
            if(scale>=1){
                let padding_left=this.canvas_width*(scale-1)/2+"px";
                let padding_top=this.canvas_height*(scale-1)/2+"px";
                // parser.updateStyle({"padding-top":padding_top})
                // parser.updateStyle({"padding-left":padding_left})
                // parser.updateStyle({"padding-right":padding_left})
                // parser.updateStyle({"padding-bottom":padding_top})
                parser.updateStyle({"padding-top":padding_top})
                parser.updateStyle({"padding-left":padding_left})
                parser.updateStyle({"padding-right":padding_left})
                parser.updateStyle({"padding-bottom":padding_top})
                parser.updateStyle({"height":height+'px'})
                parser.updateStyle({"width":width+'px'})
            }else{
                let padding_left='0px';
                let padding_top="0px";
                parser.updateStyle({"padding-top":padding_top})
                parser.updateStyle({"padding-left":padding_left})
                parser.updateStyle({"padding-right":padding_left})
                parser.updateStyle({"padding-bottom":padding_top})
                parser.updateStyle({"height":this.canvas_height+'px'})
                parser.updateStyle({"width":this.canvas_width+'px'})
            }

            // node.setAttribute("height",height);
            // node.setAttribute("width",width);
            node.setAttribute("style",parser.get());
            // console.log(node.getAttribute("height"),node.getAttribute("width"));
            let node1=document.getElementById("main_canvas");
            // console.log(node1.scrollHeight,node1.scrollWidth)
            // console.log(node.getAttribute("height"));
            // console.log(node.getAttribute("width"));
            // let width=parseInt(this.canvas_width)+200+"px";
            // let height=parseInt(this.canvas_height)+200+"px";
            // node.setAttribute("height",height);
            // node.setAttribute("width",width);
        },
      //*****:operationBar的方法聚集
      handleCommand(command){
        this.createShapeInForm1(command);
      },
      handleAddBlock(command){
          addBlockById(command);
      },
      handleModelChange(command){
          if(parseInt(command)===0){
              let msg=[];
              msg['last_map']='last_map';
              msg['shape_map']='shape_map';
              msg['hover_map']='hover_map';
              msg['text_map']='text_map';
              msg['key_map']='key_map';
              msg['myDefs']='myDefs';
              msg['mySvg']='mySvg';
              updateCanvas(msg);
              let diagram=document.getElementById("myCanvas");
              let note=document.getElementById("myNote");
              note.setAttribute("style","display:none");
              diagram.setAttribute("style","display:block");
          }else{
              let diagram=document.getElementById("myCanvas");
              let note=document.getElementById("myNote");
              note.setAttribute("style","display:block");
              diagram.setAttribute("style","display:none");
          }
      },
      handleFunction(){
          alert(1);
      },
      createShapeInForm1(id){
        // console.log(id);
        this.createShape(id);
      },
      deleteShape(){
          if(!this.delete_can)return;
          let time= getActionCounter();
          P("remove",{time:time})
      },
      biggerCanvas(){
        // alert("bigger");
        // moveSvg();
          if(this.scaleNum>=200)return;
          let item=document.getElementById("myCanvas");
          this.scaleNum+=15;
          setSvgScaleNum(this.scaleNum/100)
          // scaleMap({scale:this.scaleNum})
          // scaleSvg(this.scaleNum);
          // canvas_scale(this.scaleNum,this.canvas.height,this.canvas.width)
      },
      smallerCanvas(){
          if(this.scaleNum<=50)return;
          this.scaleNum-=15;
          // scaleSvg(this.scaleNum);

          setSvgScaleNum(this.scaleNum/100)
          // scaleMap({scale:this.scaleNum})
          // canvas_scale(this.scaleNum,this.canvas.height,this.canvas.width)

      },
      //退回
      backAction(){
          if(!this.back_can)return;
          // popQueue();
          backAction();
      },
      //重做
      upAction(){
          if(!this.up_can)return;
          // popOutQueue();
          forwardAction();
      },

      topAction(){
        if(!this.top_can)return;
        P("forward",{})
      },

      bottomAction(){
          if(!this.bottom_can)return;
          P("backward",{})

      },
        fillAction(){
          if(!this.fill_can)return;
          this.fillVisible=true;
          updateStyleDia(getCoreList()[0])
        } ,
        lineAction(){
          if(!this.line_can)return;
          this.lineVisible=true;
          updateStyleDia(getCoreList()[0])
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


        shadowAction(){
          setShadow();
        },
      //*****:侧边栏的方法
      mousedown_aside(e){
        // console.log("the method is mousedown_aside")
        let that=this;
        // let slider=document.getElementById("slider");
        // slider.style.backgroundColor="#FBFBFB"
        document.onmousemove=function(e){
          let endX=e.screenX;
          document.querySelector("body").style.cursor="e-resize"
          that.leftAsideWidth=endX+"px";
          that.leftAsideWidth_1=endX-13+"px";
        }
        document.onmouseup=function(evt){
          // let slider=document.getElementById("slider");
          // slider.style.backgroundColor="#E1E1E1"
            document.querySelector("body").style.cursor="default"
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
        P("create",{id:shape_id})
        // create_Action_Before(shape_id)
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
        ondblclick(event) {
          // console.log(event.currentTarget.clientHeight);
          //   console.log(event.currentTarget.clientWidth);
          //   console.log(event.currentTarget.innerHTML);
          //   console.log(event.currentTarget.offsetLeft);
          //   console.log(event.currentTarget.offsetTop);
            this.editting = editorWake(this.$refs.editor,
                this.$refs.toolbar,
                event.currentTarget.clientHeight,
                event.currentTarget.clientWidth,
                event.currentTarget.innerHTML,
                event.currentTarget.offsetLeft,
                event.currentTarget.offsetTop);
        },
        onEditorBlur() {
            this.editting = false;

            console.log(this.$refs.editor.getContent())
            editorHide();
        },
    },
  };
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
      user-select: none;
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
    user-select: none;
  }
  .el-footer{
    background-color: #B3C0D1;
    color: #333;
  }
  .el-aside {
    color: #333;
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
    /*width: 100px;*/
    /*overflow-x: hidden;*/
  }
  body .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .OperationBar{
      padding-left:10px;
      line-height: 30px;
      height: 30px;
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
  .el-main{
      overflow-x: scroll;
      overflow-y: scroll;
  }
  .el-main::-webkit-scrollbar{
      width: 8px;
      height: 8px;
  }
  .el-main::-webkit-scrollbar-thumb{
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.11);
      background: #DFE0E1;
  }
  .el-main::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 0;
      background: #F8F9FA;
  }

  #myCanvas{
      /*display: block;*/
      /*text-align: left;*/
      /*padding: 100px;*/
      position: relative;
      width:1629px;
      height:2209px;
      background-color: #F8F9FA;
      overflow:hidden;
      /*overflow-x: scroll;*/
      /*overflow-y: scroll;*/
  }
  #mySvg{
      background-color: white;
      border: #e9e9e9 solid 1px;
  }
  .hover:hover{
      border: yellow solid 3px;
  }

    #myNote{
        display: none;
    }
  .sidebar-wrapper .el-scrollbar__wrap {
      overflow-x: hidden;
  }
  .is-horizontal {
      display: block;
  }
  .Tab::-webkit-scrollbar{
      width: 8px;
      height: 8px;
  }
  .Tab::-webkit-scrollbar-thumb{
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.11);
      background: #DFE0E1;
  }
  .Tab::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 0;
      background: #F8F9FA;
  }
    #rightBar{
        /*width:350px;*/
        background-color:#FBFBFB
    }
</style>

