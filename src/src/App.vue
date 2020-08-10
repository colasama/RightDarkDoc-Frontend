<template>
  <div id="app" style="display:flex;flex-direction:column;">
    <AppHeader></AppHeader>
    <router-view style="text-align: center;margin-top:4px;flex:1;"/>

  </div>
</template>

<style>
html,body,#app{
  height: 100%;
  min-height: 100%;
  width: 100%;
  margin: 0;
}
</style>

<script>
import AppHeader from './components/Header.vue';
export default {
  components:{
    AppHeader,
  },
  data() {
    return {
    }
  },
  created: function(){
    document.title = this.$route.meta.title || this.$route.meta.pathName
  },
  watch:{
    $route(){
      document.title = this.$route.meta.title || this.$route.meta.pathName
    }
  },
  methods: {
  }
};
</script>