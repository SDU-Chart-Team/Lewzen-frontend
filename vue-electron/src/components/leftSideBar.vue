<template>

            <el-collapse v-model="activeNames" >
                <el-collapse-item style="background-color: #FBFBFB" class="item" title="General" name="1">
                    <img
                            :src="require('@/assets/circle.png')"
                            @click="createShapeInForm2(0,0)"

                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,0)"
                            @mouseup="handlemouseup(0,0)"
                    ></img>

                    <img
                            :src="require('@/assets/ellipse.png')"
                            @click="createShapeInForm2(1,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,0)"
                            @mouseup="handlemouseup(1,0)"
                    ></img>

                    <img
                            :src="require('@/assets/rectangle.png')"
                            @click="createShapeInForm2(2,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(2,0)"
                            @mouseup="handlemouseup(2,0)"
                    ></img>


                    <img
                            :src="require('@/assets/callout.png')"
                            @click="createShapeInForm2(3,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(3,0)"
                            @mouseup="handlemouseup(3,0)"
                    ></img>


                    <img
                            :src="require('@/assets/cross.png')"
                            @click="createShapeInForm2(4,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(4,0)"
                            @mouseup="handlemouseup(4,0)"
                    ></img>


                    <img
                            :src="require('@/assets/cylinder.png')"
                            @click="createShapeInForm2(5,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(5,0)"
                            @mouseup="handlemouseup(5,0)"
                    ></img>


                    <img
                            :src="require('@/assets/data_storage.png')"
                            @click="createShapeInForm2(6,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(6,0)"
                            @mouseup="handlemouseup(6,0)"
                    ></img>

                    <img
                            :src="require('@/assets/double_arrow.png')"
                            @click="createShapeInForm2(7,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(7,0)"
                            @mouseup="handlemouseup(7,0)"
                    ></img>

                    <img
                            :src="require('@/assets/step.png')"
                            @click="createShapeInForm2(8,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(8,0)"
                            @mouseup="handlemouseup(8,0)"
                    ></img>

                    <img
                            :src="require('@/assets/tee.png')"
                            @click="createShapeInForm2(9,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(9,0)"
                            @mouseup="handlemouseup(9,0)"
                    ></img>

                    <img
                            :src="require('@/assets/user.png')"
                            @click="createShapeInForm2(10,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(10,0)"
                            @mouseup="handlemouseup(10,0)"
                    ></img>

                    <img
                            :src="require('@/assets/and.png')"
                            @click="createShapeInForm2(11,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(11,0)"
                            @mouseup="handlemouseup(11,0)"
                    ></img>
                    <img
                            :src="require('@/assets/diamond.png')"
                            @click="createShapeInForm2(12,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(12,0)"
                            @mouseup="handlemouseup(12,0)"
                    ></img>

                    <img
                            :src="require('@/assets/envelope.png')"
                            @click="createShapeInForm2(13,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(13,0)"
                            @mouseup="handlemouseup(13,0)"
                    ></img>
                    <img
                            :src="require('@/assets/corner.png')"
                            @click="createShapeInForm2(14,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(14,0)"
                            @mouseup="handlemouseup(14,0)"
                    ></img>
                    <img
                            :src="require('@/assets/rounded_rectangle.png')"
                            @click="createShapeInForm2(15,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(15,0)"
                            @mouseup="handlemouseup(15,0)"
                    ></img>

                    <img
                            :src="require('@/assets/star.png')"
                            @click="createShapeInForm2(16,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(16,0)"
                            @mouseup="handlemouseup(16,0)"
                    ></img>

                    <img
                            :src="require('@/assets/triangle.png')"
                            @click="createShapeInForm2(17,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(17,0)"
                            @mouseup="handlemouseup(17,0)"
                    ></img>

                    <img
                            :src="require('@/assets/big_arrow_left.png')"
                            @click="createShapeInForm2(18,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(18,0)"
                            @mouseup="handlemouseup(18,0)"
                    ></img>

                    <img
                            :src="require('@/assets/isometric_cube.png')"
                            @click="createShapeInForm2(19,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(19,0)"
                            @mouseup="handlemouseup(19,0)"
                    ></img>

                    <img
                            :src="require('@/assets/trapezoid.png')"
                            @click="createShapeInForm2(20,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(20,0)"
                            @mouseup="handlemouseup(20,0)"
                    ></img>

                    <img
                            :src="require('@/assets/parallelogram.png')"
                            @click="createShapeInForm2(21,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(21,0)"
                            @mouseup="handlemouseup(21,0)"
                    ></img>

                    <img
                            :src="require('@/assets/hexagon.png')"
                            @click="createShapeInForm2(22,0)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(22,0)"
                            @mouseup="handlemouseup(22,0)"
                    ></img>
                </el-collapse-item>
                <el-collapse-item class="item" title="Misc" name="2">

                </el-collapse-item>
                <el-collapse-item class="item" title="Advanced" name="3"></el-collapse-item>
                <el-collapse-item class="item" title="Basic" name="4">

                    <img
                            :src="require('@/assets/rectangle_text.png')"
                            @click="createShapeInForm2(0,15)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,15)"
                            @mouseup="handlemouseup(0,15)"
                    ></img>

                    <img
                            :src="require('@/assets/sub topic.png')"
                            @click="createShapeInForm2(1,15)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,15)"
                            @mouseup="handlemouseup(1,15)"
                    ></img>
                </el-collapse-item>
                <el-collapse-item class="item" title="Arrows" name="5">
                    <img
                            :src="require('@/assets/arrow right.png')"
                            @click="createShapeInForm2(0,4)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,4)"
                            @mouseup="handlemouseup(0,4)"
                    ></img>
                    <img
                            :src="require('@/assets/arrow left.png')"
                            @click="createShapeInForm2(1,4)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,4)"
                            @mouseup="handlemouseup(1,4)"
                    ></img>

                    <img
                            :src="require('@/assets/arrow up.png')"
                            @click="createShapeInForm2(2,4)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(2,4)"
                            @mouseup="handlemouseup(2,4)"
                    ></img>

                    <img
                            :src="require('@/assets/arrow down.png')"
                            @click="createShapeInForm2(3,4)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(3,4)"
                            @mouseup="handlemouseup(3,4)"
                    ></img>

                    <img
                            :src="require('@/assets/chevron.png')"
                            @click="createShapeInForm2(4,4)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(4,4)"
                            @mouseup="handlemouseup(4,4)"
                    ></img>

                    <img
                            :src="require('@/assets/notched.png')"
                            @click="createShapeInForm2(5,4)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(5,4)"
                            @mouseup="handlemouseup(5,4)"
                    ></img>

                </el-collapse-item>
                <el-collapse-item class="item" title="Flowchart" name="6">

                    <img
                            :src="require('@/assets/annotation.png')"
                            @click="createShapeInForm2(0,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,6)"
                            @mouseup="handlemouseup(0,6)"
                    ></img>

                    <img
                            :src="require('@/assets/collate.png')"
                            @click="createShapeInForm2(1,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,6)"
                            @mouseup="handlemouseup(1,6)"
                    ></img>
                    <img
                            :src="require('@/assets/data.png')"
                            @click="createShapeInForm2(2,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(2,6)"
                            @mouseup="handlemouseup(2,6)"
                    ></img>

                    <img
                            :src="require('@/assets/delay.png')"
                            @click="createShapeInForm2(3,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(3,6)"
                            @mouseup="handlemouseup(3,6)"
                    ></img>

                    <img
                            :src="require('@/assets/display.png')"
                            @click="createShapeInForm2(4,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(4,6)"
                            @mouseup="handlemouseup(4,6)"
                    ></img>
                    <img
                            :src="require('@/assets/document.png')"
                            @click="createShapeInForm2(5,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(5,6)"
                            @mouseup="handlemouseup(5,6)"
                    ></img>
                    <img
                            :src="require('@/assets/internal_storage.png')"
                            @click="createShapeInForm2(6,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(6,6)"
                            @mouseup="handlemouseup(6,6)"
                    ></img>
                    <img
                            :src="require('@/assets/manual_input.png')"
                            @click="createShapeInForm2(7,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(7,6)"
                            @mouseup="handlemouseup(7,6)"
                    ></img>
                    <img
                            :src="require('@/assets/plus.png')"
                            @click="createShapeInForm2(8,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(8,6)"
                            @mouseup="handlemouseup(8,6)"
                    ></img>
                    <img
                            :src="require('@/assets/tape.png')"
                            @click="createShapeInForm2(9,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(9,6)"
                            @mouseup="handlemouseup(9,6)"
                    ></img>

                    <img
                            :src="require('@/assets/card.png')"
                            @click="createShapeInForm2(10,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(10,6)"
                            @mouseup="handlemouseup(10,6)"
                    ></img>

                    <img
                            :src="require('@/assets/off_page_connector.png')"
                            @click="createShapeInForm2(11,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(11,6)"
                            @mouseup="handlemouseup(11,6)"
                    ></img>

                    <img
                            :src="require('@/assets/process.png')"
                            @click="createShapeInForm2(12,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(12,6)"
                            @mouseup="handlemouseup(12,6)"
                    ></img>
                    <img
                            :src="require('@/assets/preparation.png')"
                            @click="createShapeInForm2(13,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(13,6)"
                            @mouseup="handlemouseup(13,6)"
                    ></img>
                    <img
                            :src="require('@/assets/sort.png')"
                            @click="createShapeInForm2(14,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(14,6)"
                            @mouseup="handlemouseup(14,6)"
                    ></img>
                    <img
                            :src="require('@/assets/start.png')"
                            @click="createShapeInForm2(15,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(15,6)"
                            @mouseup="handlemouseup(15,6)"
                    ></img>
                    <img
                            :src="require('@/assets/terminator.png')"
                            @click="createShapeInForm2(16,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(16,6)"
                            @mouseup="handlemouseup(16,6)"
                    ></img>

                    <img
                            :src="require('@/assets/tape_data.png')"
                            @click="createShapeInForm2(17,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(17,6)"
                            @mouseup="handlemouseup(17,6)"
                    ></img>

                    <img
                            :src="require('@/assets/decision.png')"
                            @click="createShapeInForm2(18,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(18,6)"
                            @mouseup="handlemouseup(18,6)"
                    ></img>

                    <img
                            :src="require('@/assets/stored_data.png')"
                            @click="createShapeInForm2(19,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(19,6)"
                            @mouseup="handlemouseup(19,6)"
                    ></img>

                    <img
                            :src="require('@/assets/manual_operation.png')"
                            @click="createShapeInForm2(20,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(20,6)"
                            @mouseup="handlemouseup(20,6)"
                    ></img>

                    <img
                            :src="require('@/assets/normal_process.png')"
                            @click="createShapeInForm2(21,6)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(21,6)"
                            @mouseup="handlemouseup(21,6)"
                    ></img>
                </el-collapse-item>
                <el-collapse-item class="item" title="Entity Relation" name="7">

                    <img
                            :src="require('@/assets/entity.png')"
                            @click="createShapeInForm2(0,12)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,12)"
                            @mouseup="handlemouseup(0,12)"
                    ></img>

                    <img
                            :src="require('@/assets/relation.png')"
                            @click="createShapeInForm2(1,12)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,12)"
                            @mouseup="handlemouseup(1,12)"
                    ></img>

                    <img
                            :src="require('@/assets/weak_relation.png')"
                            @click="createShapeInForm2(2,12)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(2,12)"
                            @mouseup="handlemouseup(2,12)"
                    ></img>

                </el-collapse-item>
                <el-collapse-item class="item" title="UML" name="8">
                    <img
                            :src="require('@/assets/actor.png')"
                            @click="createShapeInForm2(0,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(0,9)"
                            @mouseup="handlemouseup(0,9)"
                    ></img>

                    <img
                            :src="require('@/assets/use_case.png')"
                            @click="createShapeInForm2(1,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(1,9)"
                            @mouseup="handlemouseup(1,9)"
                    ></img>

                    <img
                            :src="require('@/assets/package.png')"
                            @click="createShapeInForm2(2,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(2,9)"
                            @mouseup="handlemouseup(2,9)"
                    ></img>

                    <img
                            :src="require('@/assets/swimming_lane.png')"
                            @click="createShapeInForm2(3,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(3,9)"
                            @mouseup="handlemouseup(3,9)"
                    ></img>

                    <img
                            :src="require('@/assets/frame.png')"
                            @click="createShapeInForm2(4,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(4,9)"
                            @mouseup="handlemouseup(4,9)"
                    ></img>

                    <img
                            :src="require('@/assets/notes.png')"
                            @click="createShapeInForm2(5,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(5,9)"
                            @mouseup="handlemouseup(5,9)"
                    ></img>

                    <img
                            :src="require('@/assets/interfaces_classes.png')"
                            @click="createShapeInForm2(6,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(6,9)"
                            @mouseup="handlemouseup(6,9)"
                    ></img>


                    <img
                            :src="require('@/assets/classes.png')"
                            @click="createShapeInForm2(7,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(7,9)"
                            @mouseup="handlemouseup(7,9)"
                    ></img>


                    <img
                            :src="require('@/assets/activities.png')"
                            @click="createShapeInForm2(8,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(8,9)"
                            @mouseup="handlemouseup(8,9)"
                    ></img>

                    <img
                            :src="require('@/assets/multi_instance_class.png')"
                            @click="createShapeInForm2(9,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(9,9)"
                            @mouseup="handlemouseup(9,9)"
                    ></img>


                    <img
                            :src="require('@/assets/send_signal.png')"
                            @click="createShapeInForm2(10,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(10,9)"
                            @mouseup="handlemouseup(10,9)"
                    ></img>


                    <img
                            :src="require('@/assets/receive_signal.png')"
                            @click="createShapeInForm2(11,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(11,9)"
                            @mouseup="handlemouseup(11,9)"
                    ></img>

                    <img
                            :src="require('@/assets/time_signal.png')"
                            @click="createShapeInForm2(12,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(12,9)"
                            @mouseup="handlemouseup(12,9)"
                    ></img>


                    <img
                            :src="require('@/assets/delete.png')"
                            @click="createShapeInForm2(13,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(13,9)"
                            @mouseup="handlemouseup(13,9)"
                    ></img>

                    <img
                            :src="require('@/assets/element.png')"
                            @click="createShapeInForm2(14,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(14,9)"
                            @mouseup="handlemouseup(14,9)"
                    ></img>

                    <img
                            :src="require('@/assets/lifeline.png')"
                            @click="createShapeInForm2(15,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(15,9)"
                            @mouseup="handlemouseup(15,9)"
                    ></img>

                    <img
                            :src="require('@/assets/generalize.png')"
                            @click="createShapeInForm2(16,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(16,9)"
                            @mouseup="handlemouseup(16,9)"
                    ></img>

                    <img
                            :src="require('@/assets/generalize_all.png')"
                            @click="createShapeInForm2(17,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(17,9)"
                            @mouseup="handlemouseup(17,9)"
                    ></img>

                    <img
                            :src="require('@/assets/bind.png')"
                            @click="createShapeInForm2(18,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(18,9)"
                            @mouseup="handlemouseup(18,9)"
                    ></img>

                    <img
                            :src="require('@/assets/entity_circle.png')"
                            @click="createShapeInForm2(19,9)"
                            fit="contain"
                            style="width: 40px; height: 30px"
                            @mousedown="handlemousedown(19,9)"
                            @mouseup="handlemouseup(19,9)"
                    ></img>


                </el-collapse-item>

                <el-collapse-item class="item" id="user_component_list" title="User" name="9">
                </el-collapse-item>
            </el-collapse>
</template>

<script>
    import {cancel_shape_create, set_shape_create} from "@/js/util/canvas_operation";
    import {getCoreList} from "@/js/element/core/core_queue";
    import Module from "@/js/socket/wasm";
    import {getMySvg} from "@/js/util/getCanvasIdOperation";
    import {interpreterDom} from "@/js/util/DomInterpreter";

    export default {
        name: "leftSideBar",
        created() {
            this.addElementUser();
        },
        data() {
            return {
                activeNames: ['1'],
                list:[
                    'require(\'@/assets/circle.png\')',
                    'require(\'@/assets/isometric.png\')',
                    'require(\'@/assets/trapezoid.png\')',
                    'require(\'@/assets/parallelogarm.png\')',
                    'require(\'@/assets/hexagon.png\')',
                    'require(\'@/assets/arrow_right.png\')',
                    'require(\'@/assets/arrow_left.png\')',
                    'require(\'@/assets/arrow_up.png\')',
                    'require(\'@/assets/arrow_down.png\')',
                    'require(\'@/assets/chevron.png\')',
                    'require(\'@/assets/notched.png\')'
                ]
            };
        },
        methods: {
            addElementUser(){
                let that=this;
                let url="../config/config.json";
                let request=new XMLHttpRequest();
                request.open("get",url);
                request.send(null);
                // console.log(request);
                request.onload=function(){
                    if(request.status===200){
                        let json=JSON.parse(request.responseText);
                        console.log(json);
                        // let component=json[]
                        let component=json['component']
                        for(let i=0;i<component.length;i++){
                            let item=component[i];
                            let url_url=item['url'];
                            let url_svg=item['svg'];
                            let request_url=new XMLHttpRequest();
                            request_url.open("get",url_url);
                            request_url.send(null);
                            request_url.onload=function () {
                                if(request_url.status===200){
                                    let url_item=JSON.parse(request_url.responseText);
                                    console.log(url_item);
                                    let request_svg=new XMLHttpRequest();
                                    request_svg.open("get",url_svg)
                                    request_svg.send(null);
                                    request_svg.onload=function () {
                                        if(request_svg.status===200){
                                            let url_svg=request_svg.responseText;
                                            console.log(url_svg);
                                            url_svg="url('data:image/svg+xml;"+url_svg+"');"
                                            that.user_component_list=url_svg;
                                            let node=document.createElement("img");
                                            let bar=document.getElementById("user_component_list");
                                            let content=bar.getElementsByClassName("el-collapse-item__content")
                                            node.src=url_svg;
                                            content[0].appendChild(node);
                                            node.onclick=function (e) {
                                                that.createShapeInForm2(1000,0);
                                                let comp_id=getCoreList()[0];
                                                console.log(comp_id);
                                                Module.server_run("{\"command\": \"cursor\", \"id\": \"" + comp_id + "\"}");
                                                var ret = JSON.parse(Module.server_run("{\"command\": \"rect_js_config\", \"config\": " + JSON.stringify(url_item) + "}"));
                                                var cmd = ret["domcmd"];
                                                console.log(cmd);
                                                let id=getMySvg();
                                                let root=document.getElementById(id);
                                                interpreterDom(root, cmd);

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        // console.log(1111);
                    }
                }
            },


            createShapeInForm2(i,index){
                // console.log("createShapeInForm2");
                i=index*10+i;
                this.$emit('createShapeInForm2',i);
            },
            handlemousedown(i,index){
                i=index*10+i;
                set_shape_create(i);
            },
            handlemouseup(i,index){
                i=index*10+i;
                cancel_shape_create(i);
            },
        },

    }
</script>
<style scoped>
.item{
    user-select: none;
    padding-left: 10px;
    text-align: left;
    /*background-color: black !important;*/
}
.el-container{
    padding:0;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}


</style>