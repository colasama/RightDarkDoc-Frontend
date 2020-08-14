<template>
    <div style="text-align:center">
        <a-result style="margin-top:180px" status="warning" title="该文档已经被作者删除。">
            <template #extra>
            <a-button @click="toHome" key="console" type="primary" size="large">
                返回工作台
            </a-button>
            </template>
        </a-result>
    </div>
</template>

<script>

  export default {
    name: 'DocDel',
    components: {
    },
    data() {
      return {
      }
    },
    methods:{
        toHome() {
            this.current = "home";
            this.$router.push({ path: "/" });
        },
    }
  }
</script>
