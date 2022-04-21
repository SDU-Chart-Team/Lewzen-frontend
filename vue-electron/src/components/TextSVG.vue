<template>
  <div style="position: relative">
    <div style="position: absolute">
      <svg
        ref="svg"
        id="svg"
        @dblclick="onDoubleClick"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <foreignObject width="100%" height="100%">
          <div ref="textBox" xmlns="http://www.w3.org/1999/xhtml">
            {{ msg }}
          </div>
        </foreignObject>
      </svg>
    </div>
    <text-editor
      @editorBlur="stopEditting"
      ref="textEditor"
      :width="width"
      :height="height"
      v-if="editting"
    />
  </div>
</template>
<script>
//eslint-disable-next-line
import { createVNode } from "@vue/runtime-core";
import TextEditor from "./TextEditor.vue";
export default {
  components: { TextEditor },
  name: "my-text-svg",
  props: {
    msg: { type: String, default: "123" },
  },
  data() {
    return {
      width: 100,
      height: 100,
      editting: false,
    };
  },
  methods: {
    onDoubleClick() {
      var textHTML = this.$refs.textBox.innerHTML;
      this.height = this.$refs.svg.clientHeight + "px";
      this.width = this.$refs.svg.clientWidth + "px";
      setTimeout(() => {
        this.$refs.textEditor.changeText(textHTML);
      }, 0);
      this.editting = true;
    },
    stopEditting() {
      this.editting = false;
    },
  },
};
</script>