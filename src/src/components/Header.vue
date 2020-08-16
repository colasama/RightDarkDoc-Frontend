<template>
  <div class="re-header">
    <div @click="toIndex" class="top-logo" />

    <a-menu mode="horizontal" :style="{ lineHeight: '64px' }" class="header-menu">
      <a-button
        type="primary"
        size="small"
        @click="toRegister"
        style="margin-left:10px"
        v-if="$store.state.token==null"
      >注册</a-button>
      <a-button
        type="primary"
        size="small"
        @click="toLogin"
        style="margin-left:15px;margin-right:48px"
        v-if="$store.state.token==null"
      >登录</a-button>

      
      <a-popover v-if="$store.state.token!=''" placement="bottom">
        <template slot="content">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item.description"
              >
                <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </template>
        <a-button type="link">
          <a-icon type="bell" style="color:#313131"/>
        </a-button>
      </a-popover>
      <a-dropdown v-if="$store.state.token!=null">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="toUserindex">账户信息</a-menu-item>
          <a-menu-item key="3" @click="exit">退出</a-menu-item>
        </a-menu>
        <a-button type="link" @click="toUserindex">
          欢迎回来，{{$store.state.username}}。
          <a-icon type="down" />
        </a-button>
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

.search {
  cursor: pointer;
  height: 40px;
  margin: 0px 0px 0px calc(50vw - 300px);
  float: left;
}

.re-header {
  background: rgb(255, 255, 255);
  height: 62px;
  text-align: center;
}

.header-menu {
  text-align: right;
}
</style>



<script>
const data = [
  {
    title: '加入团队通知',
    description: '米奇妙♂妙♂屋向你发送了一个团队邀♂请。',
    type:''
  },
  {
    title: '你真的很棒棒',
    description: '竟然使用了超级无敌的右墨文档。'
  },
];
export default {
  components: {},
  data() {
    return {
      showLogin: true,
      data
    };
  },
  created: function () {},
  computed: {},
  watch: {},
  methods: {
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    toLogin(){
      this.$router.push({path:"/login"});
    },
    toIndex(){
      this.$router.push({path:"/"});
      location.reload();
    },
    toUserindex(){
      this.$router.push({path:"/profile"});
    },
    exit(){
      this.$store.state.token=null;
      this.$store.state.username='';
      this.$store.state.userid='';
      window.sessionStorage.clear();
      this.$router.push({path:"/welcome"});
    }
  },
};
</script>