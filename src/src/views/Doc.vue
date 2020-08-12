<template>
  <div>
<<<<<<< HEAD
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
=======
    <div style="margin:24px 48px 0 0;text-align:right">
        <a-button style="margin-right:24px"><a-icon type="safety"/>权限</a-button>
        <a-button><a-icon type="share-alt"/>分享</a-button>
    </div>
  </div>
</template>

<style>

</style>

<script>
// @ is an alias to /src

export default {
    name: 'Doc',
    components: {
    },
    created(){
        
    },
    destroyed(){
        
    },
    methods: {
    
  },
}
</script>
>>>>>>> 733ee62b7ed8d57a8df68f0fbe8094d2b61a183c
