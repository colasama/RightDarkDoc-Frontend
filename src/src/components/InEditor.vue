<template>
  <ckeditor :editor="editor" :value="editorData" :config="editorConfig" @ready="onReady"></ckeditor>
</template>

<script>
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
  import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
  import CKEditor from '@ckeditor/ckeditor5-vue'

  export default {
    name: 'inEditor',
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      }
    },
    data() {
      return {
        // editor: ClassicEditor,
        editor: DecoupledEditor,
        editorData: '',
        editorConfig: {
          placeholder: this.placeholder,
          language: 'zh-cn',
          removePlugins: ['MediaEmbed'],
        }
      }
    },
    methods: {
      onReady(editor) {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
      }
    },
    watch: {
      'value'(val) {
        if (!this.editor) {
          return
        }

        if (val && val !== this.editorData) {
          this.editorData = this.value
        }
      },
      'editorData'(val) {
        if (val && val !== this.value) {
          this.$emit('input', val)
        }
      }
    },
    created() {
      this.editorData = this.value
    },
    components: {
      ckeditor: CKEditor.component
    }
  }
</script>

<style scoped lang="stylus"></style>