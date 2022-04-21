<template>
  <!-- <Toolbar
    v-bind:style="{ width: this.width + 'px', border: '1px solid #ccc' }"
    :editor="editorRef"
    :defaultConfig="toolbarConfig"
    :mode="mode"
  /> -->
  <Editor
    v-bind:style="{
      'z-index': 5,
      // bind css.height with data.height
      height: this.height + 'px',
      // bind css.width with data.width
      width: this.width + 'px',
      position: 'absolute',
      // bind css.left with data.left
      left: this.left + 'px',
      // bind css.top with data.top
      top: this.top + 'px',
      'overflow-y': 'hidden',
      border: '1px solid #ccc',
    }"
    v-model="valueHtml"
    :defaultConfig="editorConfig"
    :mode="mode"
    @onCreated="handleCreated"
    @onBlur="handleBlur"
  />
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
//eslint-disable-next-line
import { createVNode, onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "GlobalTextEditor",
  //eslint-disable-next-line
  components: { Editor, Toolbar },
  props: {},
  data() {
    return {
      // the height of editor div
      height: 200,
      // the width of editor div
      width: 100,
      // the left distance of editor div from origin
      left: 0,
      // the top distance of editor div from origin
      top: 0,
    };
  },
  methods: {
    // set the height of editor div
    setHeight(newHeight) {
      this.height = newHeight;
    },
    // set the width of editor div
    setWidth(newWidth) {
      this.width = newWidth;
    },
    //set the left distance of editor
    setLeft(newLeft) {
      this.left = newLeft;
    },
    // set the top distance of editor
    setTop(newTop) {
      this.top = newTop;
    },
    // set the HTML content of editor
    setContent(contentHTML) {
      this.valueHtml = contentHTML;
    },
    // the function when the editor lose focal(blur)
    handleBlur() {
      // emit the event:editorBlur for the parent component
      this.$emit("editorBlur");
    },
  },
  setup() {
    // the instance of editor
    const editorRef = shallowRef();

    // content HTML
    const valueHtml = ref("<p>text</p>");

    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
    //   }, 1500);
    // });

    // set the config of toobar
    const toolbarConfig = {
      toolbarKeys: [
        // menu key
        "headerSelect",
        // dividend
        "|",
        "bold",
        "italic",
        // group of menu items
        {
          key: "group-more-style",
          title: "更多样式",
          iconSvg: "<svg>....</svg>",
          menuKeys: ["through", "code", "clearStyle"],
        },
      ],
    };
    const editorConfig = { placeholder: "please input..." };

    // the function when component destroy
    onBeforeUnmount(() => {
      // destroy editor when distroy component
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    // the function when component create
    const handleCreated = (editor) => {
      // 记录 editor 实例
      editorRef.value = editor;
    };

    return {
      editorRef,
      valueHtml,
      mode: "simple",
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  },
};
</script>