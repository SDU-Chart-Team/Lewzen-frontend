<template>
    <div class="graph-block">
        <div :id="'graph_'+id" style="width: 300px;height: 300px"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: "GraphBlock",
        props:['id'],
        mounted() {
            window.createChart=this.createChart;
        },
        methods:{
            createChart(option,id){
                var myChart = echarts.init(document.getElementById('graph_'+id));
                // myChart.setOption({
                //     title: {
                //         text: 'ECharts 入门示例'
                //     },
                //     tooltip: {},
                //     xAxis: {
                //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                //     },
                //     yAxis: {},
                //     series: [
                //         {
                //             name: '销量',
                //             type: 'bar',
                //             data: [5, 20, 36, 10, 10, 20]
                //         }
                //     ]
                // });
                myChart.setOption(option);
            }
        },
    }
</script>

<style scoped>
.graph-block{
    /*background-color: #0077aa;*/
    height: 300px;
}
</style>