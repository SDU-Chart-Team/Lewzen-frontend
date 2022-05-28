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
                <el-dropdown-item>rename</el-dropdown-item>
                <el-dropdown-item disabled>close</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Edit
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>cut</el-dropdown-item>
                <el-dropdown-item>copy</el-dropdown-item>
                <el-dropdown-item>undo</el-dropdown-item>
                <el-dropdown-item disabled>redo</el-dropdown-item>
                <el-dropdown-item divided>select all</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            View
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>scrollbars</el-dropdown-item>
                <el-dropdown-item>grid</el-dropdown-item>
                <el-dropdown-item>guides</el-dropdown-item>
                <el-dropdown-item disabled>tags</el-dropdown-item>
                <el-dropdown-item divided>view</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Arrange
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>toFront</el-dropdown-item>
                <el-dropdown-item>toBack</el-dropdown-item>
                <el-dropdown-item>insert</el-dropdown-item>
                <el-dropdown-item disabled>layout</el-dropdown-item>
                <el-dropdown-item divided>Group</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Extras
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>theme</el-dropdown-item>
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
    import {P} from "@/js/action/actionQueue";
    import {getMyDefs, getShapeMapId} from "@/js/util/getCanvasIdOperation";
    import {addLinearGradient} from "@/js/util/LinearGradientCreator";

    export default {
        name: "dropdownMenu",
        mounted() {
            // window.saveFile=this.saveFile;
        },
        methods:{
            handleFile(command){
                console.log(command)
                if(command==='2'){
                    let svg=document.getElementById(getShapeMapId());
                    let children=svg.childNodes;
                    for(let i=0;i<children.length;i++){
                        let style=children[i].getAttribute("style");
                        console.log(style);
                        let id=children[i].getAttribute("id");
                        console.log(id);
                        P("cursors",{ids:[id]})
                        P("set_style",{style:style})
                    }
                    P("save",{})
                }else if(command==="1"){
                    const input=document.getElementById("filePath")
                    input.click();
                }
            },
            handleChange(file,fileList){
              console.log(file);
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
                  console.log(json);
                  let list=json['color']
                  if(list!==undefined){
                      for(let i=0;i<list.length;i++){
                          addLinearGradient(list[i]);
                      }
                  }
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