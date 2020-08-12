<template>
  <div>
    <InEditor :editor="s1" :value="s2"></InEditor>
  </div>
</template>

<script>
  import InEditor from '@/components/InEditor'

  export default {
    name: 'Doc',
    components: {
      InEditor
    },
    data() {
      return {
        s1: '1234',
        s2: '5678'
      }
    }
  }
</script>
