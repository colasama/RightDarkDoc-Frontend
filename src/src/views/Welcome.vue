<template>
  <div class="welcome">
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
