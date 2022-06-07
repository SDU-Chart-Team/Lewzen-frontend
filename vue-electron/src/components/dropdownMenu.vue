<template>
    <div>
        <el-dropdown @command="handleFile" >
        <span class="el-dropdown-link">
            File
        </span>
            <el-dropdown-menu  slot="dropdown">
                <el-dropdown-item command=0>new</el-dropdown-item>
                <el-dropdown-item command=1>
                    <input
                            type="file"
                            name="open"
                            id="filePath"
                            style="display:none;"
                            @change="getFile($event)"
                    />
                    open
                </el-dropdown-item>
                <el-dropdown-item command=2>save</el-dropdown-item>
                <el-dropdown-item command=3>save as html</el-dropdown-item>
                <el-dropdown-item command=4>save as image</el-dropdown-item>
                <el-dropdown-item>rename</el-dropdown-item>
                <el-dropdown-item disabled>close</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleEdit">
        <span class="el-dropdown-link">
            Edit
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">copy</el-dropdown-item>
                <el-dropdown-item command="1">paste</el-dropdown-item>
                <el-dropdown-item command="2">undo</el-dropdown-item>
                <el-dropdown-item command="3">redo</el-dropdown-item>
                <el-dropdown-item command="4">select all</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
<!--        <el-dropdown>-->
<!--        <span class="el-dropdown-link">-->
<!--            View-->
<!--        </span>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--                <el-dropdown-item>grid</el-dropdown-item>-->
<!--                <el-dropdown-item>guides</el-dropdown-item>-->
<!--                <el-dropdown-item>connect_points</el-dropdown-item>-->
<!--                <el-dropdown-item>shadow</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--        </el-dropdown>-->
        <el-dropdown @command="handleArrange">
        <span class="el-dropdown-link">
            Arrange
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>toFront</el-dropdown-item>
                <el-dropdown-item>toBack</el-dropdown-item>
                <el-dropdown-item>Front</el-dropdown-item>
                <el-dropdown-item>Back</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleTheme">
        <span class="el-dropdown-link">
            Theme
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">default</el-dropdown-item>
                <el-dropdown-item command="1">night</el-dropdown-item>
                <el-dropdown-item command="2">eyeshield</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Help
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>fork me</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {backAction, forwardAction, P, updateState} from "@/js/action/actionQueue";
    import {getMyDefs, getShapeMapId} from "@/js/util/getCanvasIdOperation";
    import {addLinearGradient} from "@/js/util/LinearGradientCreator";
    import {ctrlC, ctrlV} from "@/js/keymap/keyModel";
    import {selectAll} from "@/js/element/module/module_queue";
    import {getCanvasState} from "@/js/canvas/base_canvas";
    import {OffGrid} from "@/js/canvas/operation/canvas_diagram_operation";
    import {initCanvasState} from "@/js/util/init";
    import {saveAsHTML, saveAsImage} from "@/js/util/fileOperation";
    import {changeTheme} from "@/js/theme/changeTheme";

    export default {
        name: "dropdownMenu",
        mounted() {
            // window.saveFile=this.saveFile;
        },
        methods:{
            handleTheme(command){
              if(command==="0"){
                  changeTheme("default")
              }else if(command==='1'){
                  changeTheme("night")
              }else if(command==="2"){
                  changeTheme("eyeshield")
              }
            },
            handleFile(command){
                // console.log(command)
                if(command==='2'){
                    let svg=document.getElementById(getShapeMapId());
                    let children=svg.childNodes;
                    for(let i=0;i<children.length;i++){
                        let style=children[i].getAttribute("style");
                        // console.log(style);
                        let id=children[i].getAttribute("id");
                        // console.log(id);
                        P("cursors",{ids:[id]})
                        P("set_style",{style:style})
                    }
                    P("save",{})
                }else if(command==="1"){
                    const input=document.getElementById("filePath")
                    input.click();
                }else if(command==='3'){
                    saveAsHTML();
                }else if(command==="4"){
                    saveAsImage();
                }
            },
            handleEdit(command){
                if(command==='0'){//copy
                    ctrlC();
                }else if(command==='1'){//paste
                    ctrlV();
                }else if(command==='2'){//undo
                    backAction();
                }else if(command==='3'){//redo
                    forwardAction();
                }else if(command==='4'){//select all
                    selectAll();
                }
            },
            handleArrange(command){
                if(command==='0'){//to front
                    P("forward",{})
                }else if(command==='1'){//to back
                    P("backward",{})
                }else if(command==='2'){//front
                    P("front",{})
                }else if(command==='3'){//back
                    P("back",{})
                }
            },
            // handleView(command){
            //     if(command==='0'){//grid
            //         let state=getCanvasState('grid');
            //         if(state){
            //             OffGrid();
            //         }
            //     }else if(command==='1'){//guides
            //
            //     }else if(command==='2'){//connect points
            //
            //     }else if(command==='3'){//shadow
            //
            //     }
            // },
            handleChange(file,fileList){
              // console.log(file);
                this.fileList=[];
            },
            saveFile(json){
                // 创建a标签
                var elementA = document.createElement('a');

                //文件的名称为时间戳加文件名后缀
                elementA.download = +new Date() + ".txt";
                elementA.style.display = 'none';

                //生成一个blob二进制数据，内容为json数据
                var blob = new Blob([JSON.stringify(json)]);

                //生成一个指向blob的URL地址，并赋值给a标签的href属性
                elementA.href = URL.createObjectURL(blob);
                document.body.appendChild(elementA);
                elementA.click();
                document.body.removeChild(elementA);
            },
            getFile(obj){
              var fileobj=document.getElementById("filePath").files[0];
              var reader=new FileReader();
              reader.readAsText(fileobj)
              reader.onload=function () {
                  let json=JSON.parse(this.result)
                  // console.log(json);
                  let list=json['color']
                  if(list!==undefined){
                      for(let i=0;i<list.length;i++){
                          addLinearGradient(list[i]);
                      }
                  }
                  initCanvasState();
                  // console.log(json)
                  updateState({json:json})
                  P("load",{json:json['json']})
              }
            },
        }
    }
</script>

<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        padding-right: 20px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    #filePath{
        outline: 0;

    }

</style>