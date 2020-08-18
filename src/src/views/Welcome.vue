<template>
  <div class="welcome">
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

    <a-row>
        <a-col :span="12">
            <a-row style="margin-top:35%;margin-bottom:20px"><b style="font-size:50px">右墨文档</b></a-row>
            <a-row>
                <a-button size="large" @click="toRegister" style="width:100px;margin-right:20px">注册</a-button>
                <a-button size="large" @click="toLogin" style="width:100px">登录</a-button>
            </a-row>
            
        </a-col>
        <a-col :span="12">
            
        </a-col>
    </a-row>
  </div>
</template>

<style>
  .welcome {
  background: url("../assets/cover.png");
}

#particles-js{
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;    
}
</style>

<script>
// @ is an alias to /src

export default {
    name: 'Welcome',
    components: {
    },
    created(){
        this.$store.state.showNav = false
    },
    destroyed(){
        this.$store.state.showNav = true
    },
    methods: {
    toRegister() {
      this.current = "register";
      this.$router.push({ path: "/register" });
    },
    toLogin(){
      this.current='login';
      this.$router.push({path:"/login"});
    },
  },
}
</script>
