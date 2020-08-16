<template>
  <v-modal v-model="visible" centered :footer="null">
    <span>{{ url }}</span>
    <a-button type="dashed" v-clipboard="url">复制链接</a-button>
    <a-divider />
  </v-modal>
</template>

<script>
  const base = 'http://39.106.230.20:8090/'

  export default {
    name: 'shareDocModal',
    props: {
      docid: {
        type: String
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      url() {
        return base + this.docid
      }
    }
  }
</script>