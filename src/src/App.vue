<template>
  <div id="app" style="display:flex;flex-direction:column;">
    <AppHeader v-if="$store.state.showNav"></AppHeader>
    <!--transition name="fade" mode="out-in"-->
      <keep-alive><router-view style="text-align: center;margin-top:4px;flex:1;" :key="$route.path"/></keep-alive>
    <!--/transition-->
  </div>
</template>

<style>
html,body,#app{
  height: 100%;
  min-height: 100%;
  width: 100%;
  margin: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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