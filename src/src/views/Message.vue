<template>
    <div style="text-align:center">
        <a-result style="margin-top:180px" status="warning" title="啊哦，您查看的文档并未公开分享。">
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
    name: 'DocNoAuth',
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
