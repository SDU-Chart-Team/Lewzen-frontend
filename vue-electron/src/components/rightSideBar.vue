<template>
    <div>

<!--  diagram的设置  -->
        <el-tabs v-model="activeName" :stretch="card" style="display: block" @tab-click="handleClick">

            <!--  Diagram栏的设置      -->
            <el-tab-pane label="Diagram" name="Diagram">
                <div class="card">
                    <div class="card-header"> View</div>
                    <div class="card-item">
                        <el-checkbox-group @change="handleChange" v-model="viewList">
                            <div class="bottom-item">
                                <el-checkbox label="Grid">
                                </el-checkbox>
                                <!--                            <el-input-number size="mini" v-model="num_grid"></el-input-number>-->
                            </div>
                            <!--                        <div class="bottom-item"><el-checkbox label="Page View"></el-checkbox></div>-->
<!--                            <div class="bottom-item">-->
<!--                                <el-checkbox label="Background"></el-checkbox>-->
<!--                                <el-upload-->
<!--                                        :file-list="fileList"-->
<!--                                        list-type="picture">-->
<!--                                    <el-button size="mini" type="primary">点击上传</el-button>-->
<!--                                </el-upload>-->
<!--                            </div>-->
                            <div class="bottom-item"><el-checkbox label="Shadow"></el-checkbox></div>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header"> Options</div>
                    <div class="card-item">
                        <el-checkbox-group  v-model="optionList">
                            <div class="bottom-item"><el-checkbox label="Connection Arrows"></el-checkbox></div>
                            <div class="bottom-item"><el-checkbox label="Connection Points"></el-checkbox></div>
                            <div class="bottom-item"><el-checkbox label="Guides"></el-checkbox></div>
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Paper Size</div>
                    <div class="card-item">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-tab-pane>

            <!--  style-Diagram栏的设置      -->

            <el-tab-pane label="Style" name="Style">
                <div class="card">
                    <el-checkbox-group  v-model="styleList">
<!--                        <div class="bottom-item"><el-checkbox label="Sketch"></el-checkbox></div>-->
                        <div class="bottom-item"><el-checkbox label="Rounded"></el-checkbox></div>
                        <div class="bottom-item"><el-checkbox label="Curved"></el-checkbox></div>
                    </el-checkbox-group>

                </div>
            </el-tab-pane>
        </el-tabs>
<!--  element svg的设置-->
        <el-tabs v-model="activeName_element" style="display: none" :stretch="card_element">
            <!--  style-element栏的设置      -->
            <el-tab-pane label="Style" name="Style">

<!--   颜色的设置与gradient的设置-->
                <div class="card">
                    <div class="card-header">Fill</div>
                    <div class="card-item">
                        <div class="clear">
                            <div class="card-left">
                                <el-checkbox label="Fill" @change="fillOn=!fillOn"></el-checkbox>
                            </div>
                            <div class="card-right">
                                <el-color-picker
                                        size="mini"
                                        v-model="color_fill"
                                        show-alpha
                                        :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                        </div>
                        <div class="clear" v-if="fillOn">
                            <div class="card-left-left">
                                <el-checkbox label="Gradient">
                                </el-checkbox>
                            </div>
                            <div class="card-midden">
                                <el-select v-model="value_gradient" style="width: 100px;height: 20px" size="mini" placeholder="请选择">
                                    <el-option
                                            v-for="item in options_gradient"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>

                            </div>
                            <div class="card-right">
                                <el-color-picker
                                        size="mini"
                                        v-model="color_gradient"
                                        show-alpha
                                        :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                        </div>
                    </div>
                </div>

<!--    line style   -->
                <div class="card">
                    <div class="card-header">Line</div>
                    <div class="card-item">
                        <div class="clear">
                            <div class="card-left">
                                <el-checkbox label="style" @change="line_style_On=!line_style_On"></el-checkbox>
                            </div>
                        </div>
                        <div class="clear" v-if="line_style_On">
                            <div class="card-left-item">
                                color
                            </div>
                            <div class="card-right">
                                <el-color-picker
                                        size="mini"
                                        v-model="color_fill"
                                        show-alpha
                                        :predefine="predefineColors">
                                </el-color-picker>
                            </div>
                        </div>
                        <div class="clear" v-if="line_style_On">
                            <div class="card-left-item">
                                <el-select v-model="value_line" style="height: 20px;width: 150px" size="mini" placeholder="请选择">
                                    <el-option
                                            v-for="item in options_line"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="card-right">
                                <el-input
                                        size="mini"
                                        placeholder=""
                                        v-model="line_style_px">
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">style setting</div>
                    <div class="card-item">
                        <button style="width: 100%">Edit Style</button>
                    </div>
                    <div class="card-item">
                        <button style="width: 50%">Copy Style</button>
                        <button style="width: 50%">Paste Style</button>
                    </div>
                    <div class="card-item">
                        <button style="width: 100%">Set as Default</button>
                    </div>
                </div>

            </el-tab-pane>
            <!--  arrange栏的设置      -->
            <el-tab-pane label="Arrange" name="Arrange">
                <div class="card">
                    <div class="card-header">z-index</div>
                    <div class="card-item">
                        <div>
                            <button style="width: 50%">To Front</button>
                            <button style="width: 50%">To Back</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">size</div>
                    <div class="card-item">
                        <div class="clear">
                            <div class="card-left-item">
                                width
                            </div>
                            <div class="card-right">
                                <el-input v-model="element_width" size="mini"></el-input>
                            </div>
                        </div>

                        <div class="clear">
                            <div class="card-left-item">
                                height
                            </div>
                            <div class="card-right">
                                <el-input v-model="element_height" size="mini"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">Position</div>
                    <div class="card-item">
                        <div class="clear">
                            <div class="card-left-item">
                                left
                            </div>
                            <div class="card-right">
                                <el-input v-model="element_left" size="mini"></el-input>
                            </div>
                        </div>

                        <div class="clear">
                            <div class="card-left-item">
                                top
                            </div>
                            <div class="card-right">
                                <el-input v-model="element_top" size="mini"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <div class="clear">
                            <div class="card-left">Angle</div>
                            <div class="card-right">
                                <el-input size="mini" v-model="element_angle"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="card-item">
                        <div>
                            <button style="width:100%">Rotate shape 90.</button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        Flip
                    </div>
                    <div class="card-item">
                        <div>
                            <button style="width: 50%">Horizontal</button>
                            <button style="width: 50%">Vertical</button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>


</template>
<script>
    import {createGrid, deleteGrid} from "@/js/svgdom";
    import {canvas_change,canvas_delete} from "@/js/canvasAction/canvasOperator";
    export default {
        name: "rightSideBar",
        mounted() {
        },
        data() {
            return {
                activeName: 'Diagram',
                activeName_element:'Style',
                viewList: [],
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
                options_line: [{
                    value: 'dotted',
                    label: 'dotted'
                }, {
                    value: 'solid',
                    label: 'solid'
                }],
                value_line: 'solid',
                fillOn:false,
                color_fill: 'rgba(255, 69, 0, 0.68)',
                color_gradient:'rgba(255, 69, 0, 0.68)',
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
            };

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleChange(e){
                for(var item in e){
                    if(e[item]==="Grid"){
                        // createGrid(16);
                        canvas_change();
                        return;
                    }
                }
                // deleteGrid();
                canvas_delete();

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
</style>