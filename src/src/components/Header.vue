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

      <a-popover v-if="$store.state.token!=null" placement="bottom">
        <template slot="content">
          <a-tabs default-active-key="1" @change="callback" size="small" style="width:320px">
            <a-tab-pane key="1" tab="未读消息">
              <a-list item-layout="horizontal" :data-source="$store.state.message">
                <a-list-item slot="renderItem" slot-scope="item" v-if="!item.isread">
                  <a-col>
                    <a-row>
                    <a-list-item-meta :description="item.content">
                      <a slot="title" v-if="item.type===2">团队邀请</a>
                      <a slot="title" v-if="item.type===1">团队申请</a>
                      <a slot="title" v-if="item.type===0">系统通知</a>
                      <a-avatar slot="avatar" v-bind:icon="typetoIcon(item.type)" />
                    </a-list-item-meta>
                    </a-row>
                    <a-row style="text-align:right;margin-right:-5px">
                      <a-col :span="14" style="text-align:left;margin:8px 0 0 0;font-size:12px;color:#bdbdbd">
                        {{item.messagetimestring}}
                      </a-col>
                      <a-col :span="10">
                        <a-button v-if="item.type===0" type="link" @click="readMessage(item.messageid)">已读</a-button>
                        <a-button v-if="item.type===1" type="link" @click="confirmApply(item.messageid,false)">拒绝</a-button>
                        <a-button v-if="item.type===1" type="link" @click="confirmApply(item.messageid,true)">通过</a-button>
                        <a-button v-if="item.type===2" type="link" @click="confirmInvite(item.messageid,false)">拒绝</a-button>
                        <a-button v-if="item.type===2" type="link" @click="confirmInvite(item.messageid,true)">确认</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                  
                  
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="2" tab="全部消息" force-render>
              Content of Tab Pane 2
            </a-tab-pane>
          </a-tabs>
          
        </template>
        <a-button type="link" @click="tomessage">
          <a-badge dot v-bind:count="$store.state.message.length" >
            <a-icon type="bell" style="color:#313131;font-size:20px" />
          </a-badge>
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
import Vue from "vue";

export default {
  components: {},
  data() {
    return {
      showLogin: true,
    };
  },
  created: function () {},
  computed: {},
  watch: {},
  methods: {
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toIndex() {
      this.$router.push({ path: "/" });
      location.reload();
    },
    toUserindex() {
      this.$router.push({ path: "/profile" });
    },
    tomessage() {
      this.$router.push({ path: "/message" });
    },
    typetoIcon(type){
      var str = "info";
      switch (type) {
        case 0:
          str = "info";
          break;
        case 1:
          str = "team";
          break;
        case 2:
          str = "team";
          break;  
      }
      return str;
    },
    exit() {
      this.$store.state.token = null;
      this.$store.state.username = "";
      this.$store.state.userid = "";
      window.sessionStorage.clear();
      this.$router.push({ path: "/welcome" });
    },
    confirmInvite(messageid, value) {
      var str = "";
      var msg = "";
      var that = this;
      if (value == true) {
        str = "agree";
        msg = "接受"
      } else {
        str = "reject";
        msg ="拒绝"
      }
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/message/invite/"+messageid+"/"+str,
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.success == true) {
          that.$message.success("已"+msg+"邀请", 1)
        } else {
          that.$message.error("操作失败", 1);
        }
      });
      this.readMessage(messageid)
    },
    confirmApply(messageid,value) {
      var str = "";
      var msg = "";
      var that = this;
      if (value == true) {
        str = "agree";
        msg = "接受"
      } else {
        str = "reject";
        msg ="拒绝"
      }
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/message/apply/"+messageid+"/"+str,
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.success == true) {
          that.$message.success("已"+msg+"申请", 1)
        } else {
          that.$message.error("操作失败", 1);
        }
      });
      this.readMessage(messageid)
    },
    readMessage(messageid) {
      var that = this;
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/message/"+messageid,
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        if (response.data.success == true) {
          that.$message.success("操作成功", 1)
        } else {
          that.$message.error("操作失败", 1);
        }
      });
    },
  },
};
</script>