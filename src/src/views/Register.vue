
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
    ></vue-particles>
    <a-row>
      <a-col :span="12">
        <a-card style="width:400px;margin:100px auto;text-align:center">
          <h1 style="margin-top:20px;margin-left:5px;font-size:38px;float:left">
            <b>注册账户</b>
          </h1>
          <a-input size="large" placeholder="用户名" v-model="username" style="margin-top:20px">
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input size="large" placeholder="邮箱" v-model="email" style="margin-top:30px">
            <a-icon slot="prefix" type="mail" />
          </a-input>
          <a-input-password
            size="large"
            placeholder="密码"
            v-model="password"
            style="margin-top:30px"
          >
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <a-input-password
            size="large"
            placeholder="重复密码"
            v-model="repassword"
            style="margin-top:30px"
          >
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <a-input size="large" placeholder="手机号" v-model="phone" style="margin-top:30px">
            <a-icon slot="prefix" type="phone" />
          </a-input>
          <a-input-search
            style="margin-top:30px;margin-bottom:15px"
            placeholder="邮箱验证码"
            size="large"
            @search="sendMail"
            v-model="authcode"
          >
            <a-button v-if="count==0" slot="enterButton">获取验证码</a-button>
            <a-button v-else disabled slot="enterButton">{{count}}秒后重试</a-button>
          </a-input-search>
          <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>
          <a href="#/login">已有账号？点击这里登录</a>
          <a-button
            size="large"
            type="primary"
            style="margin-top:15px;margin-bottom:30px"
            block
            @click="register"
          >注册</a-button>
          <a-avatar style="opacity:0.8" src="https://i.loli.net/2020/08/10/Q1G3yKVZDa8In7q.png" />
          <div style="text-align:center" />
        </a-card>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>
  </div>
</template>
<style>
.logo {
  width: 40px;
  height: 40px;
  float: center;
  background: url("../assets/logo1.png");
}

.welcome {
  background: url("../assets/cover.png");
}

#particles-js {
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
      email: "",
      password: "",
      phone: "",
      repassword: "",
      token: "",
      authcode: "",
      timer: null,
      count: 0,
      errorLogin: false,
    };
  },
  methods: {
    register() {
      var that = this;
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var regPhone = /^[0-9]{11}$/;
      var errorTip = "";
      if (this.username == "") errorTip = "请输入您的用户名";
      else if (this.password == "" || this.repassword == "")
        errorTip = "请输入您的密码";
      else if (this.email == "") errorTip = "请输入您的邮箱";
      else if (this.phone == "") errorTip = "请输入您的手机号码";
      else if (this.authcode == "") errorTip = "请输入邮箱验证码";
      else if (!regEmail.test(this.email)) errorTip = "请输入正确的邮箱";
      else if (!regPhone.test(this.phone)) errorTip = "请输入正确的手机号码";
      else if (this.password != this.repassword)
        errorTip = "两次输入的密码不同";
      if (errorTip != "") {
        this.$message.error(errorTip);
        return;
      }
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/register",
        data: {
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone,
          code: this.authcode,
        },
      }).then(function (response) {
        console.log(response.data);
        if (response.data.success == true) {
          that.$message
            .success("注册成功，即将跳转登录页面")
            .then(() => that.$router.push({ path: "/login" }));
        } else {
          that.$message.error(response.data.message);
        }
      });
    },
    sendMail() {
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/code",
        data: {
          username: this.username,
          email: this.email,
        },
      }).then(function (response) {
        console.log(response.data);
        if (response.data.success == true) {
          that.$message.success("验证码已发送");
          that.count = 60;
          that.timer = setInterval(that.startTimer, 1000);
        } else {
          that.$message.error(response.data.message);
        }
      });
    },
    startTimer() {
      this.count -= 1;
      if (this.count == 0) {
        clearInterval(this.timer);
      }
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
