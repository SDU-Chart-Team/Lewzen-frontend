<template>
    <div>
        <div class="card">
            <div class="card-header">link/unlink</div>
            <div class="card-item">
                <el-input
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
    import {linkByUser} from "@/js/element/module/module_tree";
    import * as echarts from 'echarts';

    export default {
        name: "LinkBar",
        mounted() {
          window.DrawRelation=this.DrawRelation
        },
        methods:{
            link_set(){
                let link_text=this.link_text;
                linkByUser(link_text)
            },
            DrawRelation(msg){
                // console.log(msg);
                var myChart = echarts.init(document.getElementById('relation_chart'));
                let item={}
                item['type']="graph";
                item['symbolSize']=30;
                let data=[];
                let links=[];
                let nodeList=msg['node'];
                let linkList=msg['link'];
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
                    node['name']=nodeList[i]['id'];
                    if(widthCounter[nodeList[i]['width']]===1){
                        node['x']=125;
                    }else{
                        node['x']=(250/(widthCounter[nodeList[i]['width']]-1))*nodeList[i]['cnt']+25;
                    }
                    node['y']=100*parseInt(nodeList[i]['width'])
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
                // console.log(item);
                // 指定图表的配置项和数据
                var option = {
                    series: [
                        item
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }

        },
        data(){
            return{
                link_text:""
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
</style>