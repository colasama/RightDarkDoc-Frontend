<template>
  <div class="re-header">
        <div @click ="toIndex" class="top-logo" />
        
        <a-menu mode="horizontal"  v-model="current" :style="{ lineHeight: '64px' }" class="header-menu">
          <a-menu-item key="index" @click = "toIndex">首页</a-menu-item>

            <a-button type="primary" size="small" @click="toRegister" style="margin-left:10px" v-if="showLogin">
              注册
            </a-button>
            <a-button type="primary" size="small" @click="toLogin" style="margin-left:15px;margin-right:48px" v-if="showLogin">
              登录
            </a-button>
            <a-dropdown v-if="!showLogin">
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="toUserindex">
                  个人主页
                </a-menu-item>
                <a-menu-item key="3" @click="exit">
                  退出
                </a-menu-item>
              </a-menu> 
              <a-button type="link" @click="toUserindex"> 欢迎回来，{{username}}。 <a-icon type="down" /> </a-button>
            </a-dropdown>
            <!--a-sub-menu key="topic" v-if="showExit">
              <span>
                <a-icon/>欢迎您：{{username_head}}
              </span>
              <a-menu-item-group title="Item 1">
                <a-menu-item key="setting:1">Option 1</a-menu-item>
                <a-menu-item key="setting:2" @click="exit">登出</a-menu-item>
              </a-menu-item-group>
            </a-sub-menu-->
        </a-menu>
  </div>
</template>

<style>
.top-logo {
  cursor: pointer;
  width: 135px;
  height: 40px;
  background: url("../assets/logo1.png");
  margin: 14px 48px 0px 48px;
  float: left;
}

.search{
  cursor: pointer;
  height: 40px;
  margin: 0px 0px 0px calc(50vw - 300px);
  float: left;
}

.re-header{
  background: rgb(255,255,255);
  height: 62px;
  text-align:center;
  
}

.header-menu{
  text-align:right;
}
</style>



<script>
export default {
  components:{
  },
  data() {
    return {
      showLogin: true,
    };
  },
  created: function(){

  },
  computed:{

  },
  watch:{

  },
  methods: {

  }
};
</script>