<template>
  <div>
    <Toolbar
            v-bind:style="{ border: '1px solid #ccc' }"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
    />
    <Editor
            v-bind:style="{
      height: this.height +'px',
      'overflow-y': 'hidden',
      border: '1px solid #ccc',
    }"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="handleBlur"
    />
  </div>
</template>

<script>
  import "@wangeditor/editor/dist/css/style.css"; // 引入 css
  //eslint-disable-next-line
  import {onBeforeUnmount, ref, shallowRef} from "vue";
  import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
  // eslint-disable-next-line no-unused-vars
  import Vue from "vue";
  import {P, updateState} from "@/js/action/actionQueue";
  // import { Boot } from "@wangeditor/editor";
  // import formulaModule from "@wangeditor/plugin-formula";
  //eslint-disable-next-line
  export default {
    name: "integratedEditor",
    //eslint-disable-next-line
    components: {Editor, Toolbar},
    mounted() {
      window.set_html_bar=this.setValueHtml;
      // setTimeout(()=>{
      //   this.valueHtml = '<p>hello</p>';
      //   console.log('on mounted')
      // },1500)
    },

    props: {},
    data() {
      return {
        editor: null,
        valueHtml: "",
        valueHtml_last:"",
        mode: "simple", // or 'simple'
        // the height of editor div
        height: 300,
        // the width of editor div
        width: 100,
        // the left distance of editor div from origin
        left: 0,
        // the top distance of editor div from origin
        top: 0,
        editorConfig: {
          placeholder: "请输入内容...",
          hoverbarKeys:
                  {
                    formula:
                            {
                              menuKeys:
                                      ['editorFormula']
                            }
                  }
        },
        toolbarConfig: {
          toolbarKeys: [
            "fontSize",
            "fontFamily",
            "color",
            "bgColor",
            "|",
            "bold",
            "italic",
            "underline",
            // '|',
            // 'insertFormula',
            // '|',
            // "justifyLeft",
            // "justifyRight",
            // "justifyCenter",
            // "justifyJustify",
            '|',
            'sub',
            'sup',
            // menu key
            "headerSelect",

            "insertFormula", // “插入公式”菜单
            "editFormula", // “编辑公式”菜单
            // group of menu items
            {
              key: "group-more-style",
              title: "更多样式",
              iconSvg: "<svg>....</svg>",
              menuKeys: ["through", "code", "clearStyle"],
            },
          ],
        },
      };
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
        // console.log(this.editor.getAllMenuKeys());
        // console.log(editor.getMenuConfig('fontSize'))
      },
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
        // this.editor.setHtml(contentHTML);
        // this.editor?.updateView();
      },

      getContent() {
        return this.valueHtml
      },
      // get the editor instance
      getEditor() {
        return this.editor;
      },
      focus() {
        this.editor.focus();
        this.editor.selectAll();
      },
      // the function when the editor lose focal(blur)
      handleBlur() {
        // emit the event:editorBlur for the parent component
        updateState({html:this.valueHtml_last})
        P("set_html",{html:this.valueHtml})
        this.valueHtml_last=this.valueHtml;
        this.$emit("editorBlur");
      },
      setValueHtml(value){
        setTimeout(()=>{        console.log("value"+value);
          console.log("valueHTML1"+this.valueHtml);
          this.setContent(value)
          console.log("valueHTML2"+this.valueHtml);
          this.valueHtml_last=value;},1500)
      }
    },
    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    },
  }
</script>

<style scoped>

</style>
