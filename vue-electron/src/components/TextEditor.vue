<template>
  <div
    v-bind:style="{
      border: '1px solid #ccc',
      width: this.width,
      height: this.height,
      'z-index': 99,
      position: 'absolute',
    }"
  >
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      @editorBlur="stopEditting"
      @onBlur="onblur123"
      v-bind:style="{
        'overflow-y': 'hidden',
      }"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onDestroyed="handleDestroyed"
    />
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

//eslint-disable-next-line
import { createVNode, onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "TextEditor",
  // eslint-disable-next-line
  components: { Editor, Toolbar },
  props: {
    text_content: { type: String, default: "<p>text</p>" },
    height: { type: String, default: "100px" },
    width: { type: String, default: "100px" },
    top: Number,
    left: Number,
  },

  methods: {
    changeText(textHTML) {
      this.valueHtml = textHTML;
    },
    onblur123() {
      console.log("editor div blur");
      this.$emit("editorBlur");
    },
  },

  setup() {
    console.log("editor created ");
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    let valueHtml = ref("");

    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
    //   }, 1500);
    // });

    const toolbarConfig = {
      toolbarKeys: [
        // 菜单 key
        "headerSelect",

        // 分割线
        "|",

        // 菜单 key
        "bold",
        "italic",

        // 菜单组，包含多个菜单
        {
          key: "group-more-style", // 必填，要以 group 开头
          title: "更多样式", // 必填
          iconSvg: "<svg>....</svg>", // 可选
          menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
        },
        // 继续配置其他菜单...
      ],
    };
    const editorConfig = { placeholder: "请输入内容..." };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleBlur = (editor) => {
      editor.emit("editorBlur");
      console.log("blur");
      parent.$emit("editorBlur");
    };
    const handleDestroyed = (editor) => {
      console.log("destroyed", editor);
    };
    const stopEditting = () => {
      console.log("listen blur1");
    };

    return {
      editorRef,
      valueHtml,
      mode: "simple", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleBlur,
      handleDestroyed,
      stopEditting,
    };
  },
};
</script>
<style>
</style>    