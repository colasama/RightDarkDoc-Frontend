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
        <a-card style="width:400px;margin:220px auto;text-align:center">
          <h1 style="margin-top:20px;margin-left:5px;font-size:38px;float:left">
            <b>登录账户</b>
          </h1>
          <a-input
            size="large"
            placeholder="用户名"
            ref="usernameInput"
            v-model="username"
            style="margin-top:20px"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input-password
            size="large"
            placeholder="密码"
            ref="passwordInput"
            v-model="password"
            style="margin-top:30px"
          >
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>
          <a-row type="flex" justify="center" style="margin-top:50px;margin-bottom:30px">
            <a-col :span="11" style="margin-right:20px">
              <a-button size="large" type="primary" block @click="toRegister">注册</a-button>
            </a-col>
            <a-col :span="11">
              <a-button size="large" type="primary" block @click="checklogin">登录</a-button>
            </a-col>
          </a-row>
          <a-avatar style="opacity:0.8" src="https://i.loli.net/2020/08/10/Q1G3yKVZDa8In7q.png" />
          <div style="text-align:center" />
        </a-card>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>
  </div>
</template>

<style>
.welcome {
  background: url("../assets/cover.png");
}

.logo {
  width: 40px;
  height: 40px;
  float: center;
  background: url("../assets/logo1.png");
}

#particles-js{
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;    
}
</style>

<script>
// @ is an alias to /src
import Vue from "vue";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      token: "",
      count: "",
      errorLogin: false,
    };
  },
  methods: {
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    checklogin() {
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/login",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then(function (response) {
        console.log(response.data);
        if (response.data.success == true) {
          that.$store.state.token = response.data.token;
          Vue.axios({
            method: "get",
            url: "http://39.106.230.20:8090/user/info",
            headers: {
              token: that.$store.state.token,
            },
          })
            .then((response) => {
              console.log(response.data);
              that.$store.state.username = response.data.username;
              that.$store.state.userid = response.data.userid;
              window.sessionStorage.setItem('token',that.$store.state.token)
              window.sessionStorage.setItem('username',that.$store.state.username)
              window.sessionStorage.setItem('userid',that.$store.state.userid)
            })
            .catch(function (response) {
              console.log(response);
            });
          that.$message.success("登录成功，即将跳转工作台", 1.5).then(() => {
            that.$router.push({ path: "/" });
            that.$store.state.showNav = true;
          });
        } else {
          that.$message.error(response.data.message);
        }
      });
    },
  },
  created() {
    this.$store.state.showNav = false;
  },
  destroyed() {
    this.$store.state.showNav = true;
  },
};
</script>