
<template>
  <div class="welcome">
    <a-row>
        <a-col :span="12">
            <a-card style="width:400px;margin:120px auto;text-align:center">
                <h1 style="margin-top:20px;margin-left:5px;font-size:38px;float:left"><b>注册账户</b></h1>
                <a-input size="large" placeholder="用户名" v-model="username" style="margin-top:20px">
                    <a-icon slot="prefix" type="user" />
                </a-input>
                <a-input size="large" placeholder="邮箱" v-model="email" style="margin-top:30px">
                    <a-icon slot="prefix" type="mail" />
                </a-input>
                <a-input-password size="large" placeholder="密码" v-model="password" style="margin-top:30px">
                    <a-icon slot="prefix" type="info-circle" />
                </a-input-password>
                <a-input-password size="large" placeholder="重复密码" v-model="repassword" style="margin-top:30px">
                    <a-icon slot="prefix" type="info-circle" />
                </a-input-password>
                <a-input size="large" placeholder="手机号" v-model="phone" style="margin-top:30px">
                    <a-icon slot="prefix" type="phone" />
                </a-input>
                <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>
                <a-button size="large" type="primary" style="margin-top:30px;margin-bottom:30px" block @click="toRegister">注册</a-button>

                <a-avatar style="opacity:0.8" src="https://i.loli.net/2020/08/10/Q1G3yKVZDa8In7q.png" />
                <div style="text-align:center" />
        </a-card>
        </a-col>
        <a-col :span="12">
            
        </a-col>
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

</style>

<script>
// @ is an alias to /src

export default {
    name: 'Login',
    components: {
    },
    data() {
        return {
            username:'',
            email:"",
            password:"",
            phone:"",
            repassword:"",
            token:'',
            count:"",
            errorLogin: false,
        };
    },
    created(){
        this.$store.state.showNav = false
    },
    destroyed(){
        this.$store.state.showNav = true
    }
}
</script>
