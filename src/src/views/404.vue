<template>
    <div style="text-align:center">
        <vue-particles
            color="#000"
            :particleOpacity="0.1"
            :particlesNumber="40"
            shapeType="circle"
            :particleSize="6"
            linesColor="#000"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.1"
            :linesDistance="180"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="lizi"
            style="z-index:-10"
        >
        </vue-particles>
        <div style="font-size:128px;text-align:center;margin-top:200px"><b>404</b></div>
        <div style="text-align:center;font-size:18px;margin:0 0 24px 0">这里是没有姿势的荒原~</div>
        <a-button @click="toHome" key="console" type="primary" size="large" style="width:100px">
                返回
            </a-button>
    </div>
</template>

<style>
#particles-js{
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;    
}
</style>

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
