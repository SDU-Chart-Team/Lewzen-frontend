<template>
    <div style="user-select: none"
         class="Tab"

    >

<!--  diagram的设置  -->
        <el-tabs
                tab-position="left"
                v-model="activeName"
                id="diagramBar"
                :stretch="card"
                style="display: block;margin-right: 0px"
                @tab-click="handleClick"
        >

            <!--  style-Diagram栏的设置      -->

            <el-tab-pane  name="Block">
                <span slot="label" v-if="BarBlock"><i class="el-icon-arrow-right"></i></span>
                <span slot="label" v-if="!BarBlock"><i class="el-icon-arrow-left"></i></span>

            </el-tab-pane>


            <el-tab-pane  name="Menu">
                <span slot="label"><i class="el-icon-menu"></i></span>
                <div class="menu">
                    Theme
                </div>
                <diagram-style-bar></diagram-style-bar>
            </el-tab-pane>


            <!--  Diagram栏的设置      -->
            <el-tab-pane  name="Setting">
                <div class="menu">
                    Diagram
                </div>
                <span slot="label"><i class="el-icon-setting"></i></span>
                <view-bar></view-bar>
                <option-bar></option-bar>
            </el-tab-pane>

            <!--  style-element栏的设置      -->
            <el-tab-pane  name="Fill">
                <div class="menu">
                    Fill
                </div>
                <span slot="label"><i class="el-icon-edit"></i></span>
                <fill-bar></fill-bar>
                <line-bar></line-bar>
                <style-bar></style-bar>
            </el-tab-pane>

            <!--  arrange栏的设置      -->
            <el-tab-pane name="Arrange">
                <span slot="label"><i class="el-icon-place"></i> </span>

                <div class="menu">
                    Arrange
                </div>
                <z-index-bar></z-index-bar>

                <size-bar></size-bar>

                <position-bar></position-bar>

                <angle-bar></angle-bar>

                <filp-bar></filp-bar>

                <group-bar></group-bar>
            </el-tab-pane>
            <!--text栏的设置-->
            <el-tab-pane name="Text">
                <span slot="label"><i class="el-icon-edit-outline"></i></span>
                <div class="menu">
                    Text
                </div>
                <alignment-bar></alignment-bar>
                <spacing-bar></spacing-bar>
                <integrated-editor></integrated-editor>
            </el-tab-pane>

            <!--relation栏的设置 -->
            <el-tab-pane name="Relation">
                <div class="menu">
                    Relation
                </div>
                <span slot="label"><i class="el-icon-connection"></i></span>
                <alias-bar></alias-bar>
                <bind-bar></bind-bar>
                <link-bar></link-bar>
            </el-tab-pane>


            <!--  style-line栏的设置      -->
            <el-tab-pane name="Line">
                <div class="menu">
                    Line
                </div>
                <span slot="label"><i class="el-icon-right"></i></span>

                <arrow-style-bar></arrow-style-bar>
                <line-type-bar></line-type-bar>
                <on-offset-bar></on-offset-bar>
                <set-dotted-line-bar></set-dotted-line-bar>
            </el-tab-pane>
        </el-tabs>



<!--&lt;!&ndash;  element svg的设置&ndash;&gt;-->
<!--        <el-tabs v-model="activeName_element" id="elementStyleBar" style="display: none" :stretch="card_element">-->



<!--&lt;!&ndash;            <el-tab-pane label="Line" name="Line">&ndash;&gt;-->
<!--&lt;!&ndash;                <connect-bar></connect-bar>&ndash;&gt;-->
<!--&lt;!&ndash;                <arrow-style-bar></arrow-style-bar>&ndash;&gt;-->
<!--&lt;!&ndash;                <line-type-bar></line-type-bar>&ndash;&gt;-->
<!--&lt;!&ndash;                <on-offset-bar></on-offset-bar>&ndash;&gt;-->
<!--&lt;!&ndash;                <set-dotted-line-bar></set-dotted-line-bar>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-tab-pane>&ndash;&gt;-->
<!--        </el-tabs>-->

<!--&lt;!&ndash;  graph 的设置      &ndash;&gt;-->
<!--        <el-tabs v-model="activeName_graph" id="graphStyleBar" style="display: none" :stretch="card_element">-->
<!--            &lt;!&ndash;  style-graph栏的设置      &ndash;&gt;-->
<!--            <el-tab-pane-->
<!--                    class="Tab"-->
<!--                    label="Arrange" name="Arrange">-->
<!--                <graph-size-bar></graph-size-bar>-->

<!--                <graph-position-bar></graph-position-bar>-->

<!--                <graph-create-bar></graph-create-bar>-->

<!--                <graph-change-bar></graph-change-bar>-->
<!--            </el-tab-pane>-->

<!--        </el-tabs>-->

<!--        <el-tabs v-model="activeName_line" id="lineStyleBar" style="display: none" :stretch="card_element">-->
<!--            &lt;!&ndash;  style-line栏的设置      &ndash;&gt;-->
<!--            <el-tab-pane-->
<!--                    class="Tab"-->
<!--                    label="Line" name="Line">-->
<!--&lt;!&ndash;                <connect-bar></connect-bar>&ndash;&gt;-->
<!--                <arrow-style-bar></arrow-style-bar>-->
<!--                <line-type-bar></line-type-bar>-->
<!--                <on-offset-bar></on-offset-bar>-->
<!--                <set-dotted-line-bar></set-dotted-line-bar>-->
<!--            </el-tab-pane>-->

<!--&lt;!&ndash;            <el-tab-pane&ndash;&gt;-->
<!--&lt;!&ndash;                    class="Tab"&ndash;&gt;-->
<!--&lt;!&ndash;                    label="Text" name="Text">&ndash;&gt;-->
<!--&lt;!&ndash;                <alignment-bar></alignment-bar>&ndash;&gt;-->
<!--&lt;!&ndash;                <spacing-bar></spacing-bar>&ndash;&gt;-->
<!--&lt;!&ndash;                <integrated-editor></integrated-editor>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-tab-pane>&ndash;&gt;-->

<!--        </el-tabs>-->



    </div>


</template>
<script>
    import {OffGrid, OffGuides, OnGrid, OnGuides} from "@/js/canvas/operation/canvas_diagram_operation";
    import {
        FillColorChange, getStyleInCore, GradientChange,
        OffFill,
        OffGradient, OffStrokeModel,
        OnFill,
        OnGradient, OnStrokeModel, SetCoreStrokeColor, SetCoreStrokeStyle, SetCoreStrokeWidth, setStyleInCore
    } from "@/js/canvas/operation/canvas_style_operation";
    import {ChangeAngle, z_index_to_back, z_index_to_front} from '@/js/canvas/operation/canvas_arrange_operation';
    import "@wangeditor/editor/dist/css/style.css"; // 引入 css
    import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
    import integratedEditor from "@/components/integratedEditor";
    import FillBar from "@/components/baritem/FillBar";
    import ColorBar from "@/components/baritem/ColorBar";
    import LineBar from "@/components/baritem/LineBar";
    import StyleBar from "@/components/baritem/StyleBar";
    import ZIndexBar from "@/components/baritem/zIndexBar";
    import SizeBar from "@/components/baritem/SizeBar";
    import PositionBar from "@/components/baritem/PositionBar";
    import AngleBar from "@/components/baritem/AngleBar";
    import FilpBar from "@/components/baritem/FilpBar";
    import GraphPositionBar from "@/components/bargraph/graphPositionBar";
    import GraphCreateBar from "@/components/bargraph/graphCreateBar";
    import GraphChangeBar from "@/components/bargraph/graphChangeBar";
    import GraphSizeBar from "@/components/bargraph/graphSizeBar";
    import OptionBar from "@/components/bardiagram/optionBar";
    import PaperBar from "@/components/bardiagram/paperBar";
    import ViewBar from "@/components/bardiagram/viewBar";
    import DiagramStyleBar from "@/components/bardiagram/diagramStyleBar";
    import GroupBar from "@/components/baritem/groupBar";
    import LinkBar from "@/components/baritem/LinkBar";
    import AlignmentBar from "@/components/baritem/AlignmentBar";
    import SpacingBar from "@/components/baritem/SpacingBar";
    import ArrowStyleBar from "@/components/barline/ArrowStyleBar";
    import ConnectBar from "@/components/barline/ConnectBar";
    import LineTypeBar from "@/components/barline/LineTypeBar";
    import OnOffsetBar from "@/components/barline/OnOffsetBar";
    import SetDottedLineBar from "@/components/barline/SetDottedLineBar";
    import AliasBar from "@/components/baritem/AliasBar";
    import BindBar from "@/components/baritem/BindBar";
    export default {
        name: "rightSideBar",
        mounted() {
            window.setStyle=this.setStyle;
            window.setArrange=this.setArrange;
            window.changeText=this.changeText;
            window.offText=this.offText;
            window.onText=this.onText;
            window.offRelation=this.offRelation;
            window.onRelation=this.onRelation;
            let list=document.getElementsByClassName("el-tabs__header is-left");
            // // console.log(list);
            list[0].style.marginRight="0px"
            // list[0].style.paddingTop="35px"
            // el-tabs__header is-left

        },
        components:{
            BindBar,
            AliasBar,
            SetDottedLineBar,
            OnOffsetBar,
            LineTypeBar,
            ConnectBar,
            ArrowStyleBar,
            SpacingBar,
            AlignmentBar,
            LinkBar,
            GroupBar,
            DiagramStyleBar,
            ViewBar,
            PaperBar,
            OptionBar,
            GraphSizeBar,
            GraphChangeBar,
            GraphCreateBar,
            GraphPositionBar,
            FilpBar,
            AngleBar, PositionBar, SizeBar, ZIndexBar, StyleBar, LineBar, ColorBar, FillBar, integratedEditor},
        data() {
            return {
                activeName: 'Fill',
                activeName_element:'Style',
                activeName_graph:'Arrange',
                activeName_line:"Line",
                viewList: [],
                style_change:false,
                optionList: [],
                styleList:[],
                options: [{
                    value: '选项1',
                    label: 'A4(210mm*297mm)'
                }, {
                    value: '选项2',
                    label: 'A3(297mm*420mm)'
                }],
                value: '',
                fileList:[],
                card:true,
                card_element:true,
                num_grid:20,
                fill_color:'',
                grid:false,
                shadow:false,
                connect_point:false,
                guides:false,
                curved:false,
                rounded:false,
                copy_style_element:"",
                options_gradient: [{
                    value: 'south',
                    label: 'south'
                }, {
                    value: 'north',
                    label: 'north'
                }, {
                    value: 'east',
                    label: 'east'
                }, {
                    value: 'west',
                    label: 'west'
                }, ],
                value_gradient: 'south',
                element_style:"",
                options_line: [{
                    value: 'dotted',
                    label: 'dotted'
                }, {
                    value: 'solid',
                    label: 'solid'
                }],
                value_line: 'solid',
                fillOn:false,
                gradientOn:false,
                strokeOn:false,
                color_fill: 'rgba(255, 255, 255, 1)',
                color_gradient:'rgba(255, 255, 255, 1)',
                color_line:'rgba(255, 69, 0, 0.68)',
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'
                ],
                line_style_On:false,
                line_style_px:1,
                element_width:100,
                element_height:100,
                element_left:100,
                element_top:100,
                element_angle:0,
                isArrange:false,
                textShow:true,
                relationShow:true,
                BarWidth:0,
                BarBlock:true,

            //    关于graph
                graph_change:false,
                graph_style:"",
            };

        },
        methods: {

            collpaseTab(){

            },

            offText(){
                // this.textShow=false;
                // this.activeName_element='Style';
                set_spacing_flag(true)
                set_alignment_flag(true)
            },
            onText(){
                set_alignment_flag(false)
                set_spacing_flag(false)

                // this.textShow=true;
            },
            offRelation(){
                alias_flag(true);
                setBindFlag(true);
                setRelationFlag(true);
                // let item=document.getElementById("RelationBar");
                // item.style.display="none";
                // this.relationShow=false;
                // this.activeName_element='Style';
            },
            onRelation(){
                alias_flag(false);
                setBindFlag(false);
                setRelationFlag(false);
                // let item=document.getElementById("RelationBar");
                // item.style.display="block";
                // this.relationShow=true;
            },
            handleClick(tab, event) {
                // console.log(tab, event);
                // console.log(this.activeName)
                if(this.activeName==="Block"){
                    if(this.BarBlock){
                        let node=document.getElementsByClassName("el-tabs__content")[0];
                        console.log(node);
                        let width= window.getComputedStyle(node).width;
                        let bar=document.getElementById("rightBar");
                        let widthBar=window.getComputedStyle(bar).width;
                        width=parseInt(width.substr(0,width.length-2))
                        widthBar=parseInt(widthBar.substr(0,widthBar.length-2))
                        console.log(width)
                        console.log(widthBar)
                        bar.setAttribute("style","width:"+(widthBar-width)+"px;background-color: rgb(251, 251, 251);")
                        this.BarWidth=width;
                        node.style.display="none";
                        this.BarBlock=false;
                    }else{
                        let node=document.getElementsByClassName("el-tabs__content")[0];
                        console.log(node);
                        // let width= window.getComputedStyle(node).width;
                        let bar=document.getElementById("rightBar");
                        let widthBar=window.getComputedStyle(bar).width;
                        // width=parseInt(width.substr(0,width.length-2))
                        widthBar=parseInt(widthBar.substr(0,widthBar.length-2))
                        widthBar+=this.BarWidth
                        console.log(widthBar)
                        bar.setAttribute("style","width:"+(widthBar)+"px;background-color: rgb(251, 251, 251);")
                        node.style.display="block";
                        this.activeName="Menu"
                        this.BarBlock=true;
                    }
                    // console.log(111);

                }
            },
            graph_change_set(value){
                if(!value){

                }else{
                    this.graph_style="";
                }
                this.graph_change=value;
            },
            style_change_set(value){
              if(!value){

              }else{
                  this.element_style=getStyleInCore();
              }
              this.style_change=value;
            },
            copy_style(){
                this.copy_style_element=getStyleInCore();
            },
            paste(){
                setStyleInCore(this.copy_style_element);
            },
            setDefault(){
                this.copy_style_element="stroke : rgba(0,0,0,1);stroke-width : 3;fill : rgba(255,255,255,1);fill-opacity : 0;stroke-opacity : 1.0;";
            },
            handleOptionChange(e){
              let guide_flag=false;
              let connection_point_flag=false;
              for(var item in e){
                  if(e[item]==="Connection Points"&&this.connect_point===false){
                      OnConnectionPoint();
                      connection_point_flag=true;
                      this.connect_point=true;
                  }else if(e[item]==="Guides"&&this.guides===false){
                      OnGuides();
                      guide_flag=true;
                      this.guides=true;
                  }
              }
              if(!connection_point_flag&&this.connect_point===true){
                  this.connect_point=false;
                  OffConnectionPoint();
              }
              if(!guide_flag&&this.guides===true){
                  this.guides=false;
                  OffGuides();
              }
            },
            handleStyleChange(e){
                let round_flag=false;
                let curve_flag=false;
                for (var item in e){
                    if(e[item]==="Rounded"&&this.rounded===false){
                        OnRounded();
                        this.rounded=true;
                        round_flag=true;
                    }else if(e[item]==="Curved"&&this.curved===false){
                        OnCurved();
                        this.curved=true;
                        curve_flag=true;
                    }
                }
                if(!round_flag&&this.rounded===true){
                    OffRounded();
                    this.rounded=false;
                }
                if(!curve_flag&&this.curved===true){
                    OffCurved();
                    this.curved=false;
                }
            },
            handleChange(e){
                let gridFlag=false;
                let shadowFlag=false;
                for(var item in e){
                    if(e[item]==="Grid"&&this.grid===false){
                        // createGrid(16);
                        OnGrid();
                        gridFlag=true;
                        this.grid=true;
                    }else if (e[item]==='Shadow'&&this.shadow===false){
                        OnShadow();
                        shadowFlag=true;
                        this.shadow=true;
                    }
                }
                if(!gridFlag&&this.grid===true){
                    OffGrid();
                    this.grid=false;
                }
                if(!shadowFlag&&this.shadow===true){
                    OffShadow();
                    this.shadow=false;
                }
            },

            handleOption(e){

            },
        //    下面是关于style的选项

            setStyle(msg){
                // console.log(msg);
                this.value_gradient=msg['value_gradient'];
                this.color_fill=msg['color_fill'];
                this.color_gradient=msg['color_gradient'];
                this.fillOn=msg['fillOn'];
                this.value_gradient=msg['value_gradient'];
                this.gradientOn=msg['gradientOn'];
                this.line_style_px=msg['stroke-width'];
                this.color_line=msg['stroke']
                this.value_line=msg['stroke-dasharray'];

            },

            handleFill(e){
                this.fillOn=e;
                if(this.fillOn){
                    OnFill();
                    // console.log(this.color_fill);
                }else{
                    OffFill();
                    this.color_fill="rgba(255, 255, 255, 1)";
                    this.color_gradient="rgba(255, 255, 255, 1)";
                }
            },


            fillColorChange(e){
                // console.log(e)
                if(!this.gradientOn){
                    FillColorChange(e);
                }else{
                    let msg={}
                    msg['direction']=this.value_gradient;
                    msg['start_color']=this.color_fill;
                    msg['end_color']=this.color_gradient;
                    GradientChange(msg)
                }
            },
            OnGradientModel(e){
                this.gradientOn=e;
                if(this.gradientOn){
                    OnGradient();
                    this.color_gradient=this.color_fill;
                }else{
                    OffGradient();
                    FillColorChange(this.color_fill);
                }
            },
            GradientColorChange(e){
                // console.log(111)
                let msg={}
                msg['direction']=this.value_gradient;
                msg['start_color']=this.color_fill;
                msg['end_color']=this.color_gradient;
                GradientChange(msg)
            },
            handleGradientDirection(e){
                let msg={}
                msg['direction']=this.value_gradient;
                msg['start_color']=this.color_fill;
                msg['end_color']=this.color_gradient;
                GradientChange(msg)
            },

            OnStroke(e){
                this.strokeOn=e;
                if(this.strokeOn){
                    OnStrokeModel();
                }else{
                    OffStrokeModel();
                    this.line_style_px=3;
                    this.color_line="rgba(0,0,0,1)"
                    this.value_line="";
                }
            },
            handleStrokeColor(e){
                // console.log(e);
                SetCoreStrokeColor(e)
            },
            handleStrokeWidth(e){
                SetCoreStrokeWidth(this.line_style_px);
            },
            handleStrokeStyle: function (e) {
                // console.log(e);
                if (e === "dotted") {
                    SetCoreStrokeStyle("5,5")
                } else if (e === "solid") {
                    SetCoreStrokeStyle("")
                }
            },

            SubmitStyle(){
                let style=this.element_style;
                setStyleInCore(style);
            },




            //arrange------------------------------
            zIndexToBack(){
              z_index_to_back();
            },

            zIndexToFront(){
                z_index_to_front();
            },

            setArrange(msg){
                if(!msg['flag']){
                    this.isArrange=true;
                    this.element_width="";
                    this.element_height="";
                    this.element_left="";
                    this.element_top="";
                }else{
                    this.isArrange=false;
                    this.element_width=msg['width'];
                    this.element_height=msg['height'];
                    this.element_left=msg['left'];
                    this.element_top=msg['top'];
                }
            },
            changeText(){
                this.activeName_element="Text";
            },

            angle_change(){
                let angle=this.element_angle;
                ChangeAngle(angle);
            },


        //    关于graph
            SubmitGraph(){
                let option=this.graph_style;
                let id=getNoteId();
                // console.log(eval('('+option+')'));
                createChart(eval('('+option+')'),id);
            }
        }
    };
</script>

<style scoped>
.card{
    padding: 10px;
    border-bottom: #E1E1E1 solid 1px;
    text-align: left;
}
.card-header{
    font-weight: 600;
    font-size: 12px;
}
.card-item{
    padding-top: 7px;
    font-size: 10px;
}
.bottom-item{
    padding-bottom: 2px;
    font-size: 10px;
}
.el-checkbox__label{
    font-size:10px;
}
.clear{
    clear: both;
}
.card-left{
    float: left;
    /*background-color: #42b983;*/
    line-height: 30px;
    width: 70%;
    height: 30px;
}
.card-left-item{
    float: left;
    /*background-color: #42b983;*/
    line-height: 30px;
    width: 60%;
    height: 30px;
    font-size: 14px;
    color: gray;
    padding-left: 24px;
}

.card-left-left{
    float: left;
    /*background-color: #42b983;*/
    line-height: 30px;
    width: 30%;
    height: 30px;
}
.card-midden{
    float: left;
    /*background-color: #9a6e3a;*/
    line-height: 30px;
    width: 40%;
    height: 30px;
}
.card-right{
    float: right;
    align-items: center;
    /*background-color: #795da3;*/
    /*padding-left: 20px;*/
    width:30%;
    height: 30px;
}

.menu{
    padding: 8px;
    background-color:#E0E0E0;
    font-weight: bolder;
}

.el-tabs--left .el-tabs__header.is-left{
    margin-right: 0px;
}
</style>