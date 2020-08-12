<template>
  <ckeditor :editor="editor" :value="editorData"></ckeditor>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
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
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          placeholder: this.placeholder,
        }
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