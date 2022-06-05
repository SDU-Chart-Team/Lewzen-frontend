P("cursors",{ids:[this.id]},false)
<template>
    <div>
        <div class="card">
            <div class="card-header">link/unlink
                <el-button
                        size="mini"
                        style="float: right"
                        @click="quickLinkOn"
                        :disabled="flag"
                        :class="quick_class"
                        round
                >quick on</el-button>
            </div>
            <div class="card-item">
                <el-input
                        :disabled="flag"
                        placeholder="id1;link/unlink;id2"
                        size="mini"
                        v-model="link_text"
                >
                    <el-button
                            slot="append"
                            icon="el-icon-check"
                            @click="link_set"
                    >
                    </el-button>
                </el-input>
            </div>
            <div class="card-item">
                <el-button
                        size="mini"
                        style="width:100%"
                        @click="quickUnlinkOn"
                        :disabled="flag"
                        :class="quick_class"
                >quick unlink</el-button>
            </div>
            <div>

            </div>
        </div>
        <div class="card">
            <div class="card-header">relation chart</div>
            <div class="card-item">
                <div id="relation_chart" style="width: 300px;height:300px">

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {getTree, linkByUser, unlinkWithFather} from "@/js/element/module/module_tree";
    import * as echarts from 'echarts';
    import {getCoreList} from "@/js/element/core/core_queue";
    import {getShapeMapId} from "@/js/util/getCanvasIdOperation";
    import {getModuleByGid} from "@/js/element/module/module_queue";
    import {
        link_quick_get,
        link_quick_id_get,
        link_quick_id_set,
        link_quick_set,
        updateLink
    } from "@/js/canvas/operation/canvas_link_operation";

    export default {
        name: "LinkBar",
        mounted() {
          window.DrawRelation=this.DrawRelation
          window.setRelationFlag=this.setRelationFlag
          this.myChart = echarts.init(document.getElementById('relation_chart'));
        },
        methods:{
            quickLinkOn(){
              // console.log(111);
                link_quick_set(true)
                console.log(link_quick_get())
                link_quick_id_set(getCoreList()[0])
                var body = document.querySelector("body")
                body.style.cursor= "pointer"
            },
            quickUnlinkOn(){
                let id=getCoreList()[0];
                unlinkWithFather(id);
            },
            setRelationFlag(flag){
                this.flag=flag;
                if(flag){
                    this.link_text="";
                }
            },
            link_set(){
                let link_text=this.link_text;
                linkByUser(link_text)
                updateLink()
            },
            DrawRelation(msg){
                // console.log(msg);
                let id=getCoreList()[0];
                let item={}
                item['type']="graph";
                item['symbolSize']=30;
                let data=[];
                let links=[];
                let nodeList=msg['node'];
                let linkList=msg['link'];
                let legend={
                    orient:'horizontal',
                    x:'center',
                    y:'top',
                    data:[{
                        name:'now',
                        color:'green',
                    },{
                        name:'group',
                        color:'yellow',
                    },{
                        name:'other',
                        color:'blue',
                    }]
                }
                let widthCounter={};
                for(var i=0;i<nodeList.length;i++){
                    if(widthCounter[nodeList[i]['width']]===undefined){
                        widthCounter[nodeList[i]['width']]=0;
                    }
                    nodeList[i]['cnt']=widthCounter[nodeList[i]['width']];
                    widthCounter[nodeList[i]['width']]++;
                }
                for(var i=0;i<nodeList.length;i++){
                    let node={}
                    let eid=nodeList[i]['eid'];
                    let color="";
                    if(eid===id){
                        color="green";
                    }else{
                        let element=getModuleByGid(eid);
                        if(element.show){
                            color="blue"
                        }else{
                            color="yellow";
                        }
                    }
                    node['name']=nodeList[i]['id'];
                    if(widthCounter[nodeList[i]['width']]===1){
                        node['x']=125;
                    }else{
                        node['x']=(250/(widthCounter[nodeList[i]['width']]-1))*nodeList[i]['cnt']+25;
                    }
                    node['y']=100*parseInt(nodeList[i]['width'])
                    node['colors']=color;
                    data.push(node);
                }
                item['data']=data;
                for(var i=0;i<linkList.length;i++){
                    let link={}
                    link['source']=linkList[i]['source'];
                    link['target']=linkList[i]['target'];
                    links.push(link)
                }
                item['links']=links
                item['label']={show:true}
                item['itemStyle']={
                    normal:{
                        color:function (params) {
                            return params.data.colors;
                        }
                    }
                }
                // console.log(item);
                // 指定图表的配置项和数据
                var option = {
                    series: [
                        item
                    ],
                    // legend:legend
                };

                // 使用刚指定的配置项和数据显示图表。
                this.myChart.setOption(option);
            }

        },
        data(){
            return{
                link_text:"",
                myChart:{},
                flag:true,
                quick_class:"uncursor",
                quick_flag:false,
            }
        }
    }
</script>

<style scoped>
    .card{
        padding: 10px;
        border-bottom: #E1E1E1 solid 1px;
        text-align: left;
    }
    .card-header{
        font-weight: 600;
        font-size: 14px;
        height: 28px;
        line-height: 28px;
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
        font-size: 14px;
        color: #606266;
        font-weight: 500;
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
    .cursor{
        color: lightskyblue;
    }
    .uncursor{

    }
</style>