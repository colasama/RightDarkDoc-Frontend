<template>
  <div class="profile">
    <a-breadcrumb style="margin:100px 0 -100px -600px;">
      <a-breadcrumb-item>右墨文档</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href="/">工作台</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>消息中心</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="profileBox">
      <a-layout-sider style="text-align:center;background:#F3F3F3">
        <a-avatar :size="64" class="avatarStyle" v-if="user.avatar!=null" :src="user.avatar" />
        <avatar
          :size="64"
          class="avatarStyle"
          v-if="user.avatar==null"
          :username="`${user.username}`"
        ></avatar>
        <a-menu
          style="background:#F3F3F3;margin-top:50px"
          :default-selected-keys="['1']"
          mode="inline"
        >
          <a-menu-item key="1">当前</a-menu-item>
          <a-menu-item key="2">历史消息</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="background:#fff;text-align:left;">
        <h1 style="margin:48px 0 0 64px">
          <b>当前消息</b>
        </h1>
        <div style="margin:12px 0 0 64px"></div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<style>
.profile {
  background: #fafafa;
  text-align: center;
  position: flex;
}

.profileBox {
  height: 400px;
  width: 800px;
  margin: 120px auto;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
}

.card-container {
  background: #fff;
  overflow: hidden;
}

.card-container > .ant-tabs-line > .ant-tabs-bar {
  border-color: #fff;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<script>
import Vue from "vue";
import Avatar from "vue-avatar";
export default {
  name: "Home",
  components: {
    Avatar,
  },
  data() {
    return {
      user: {},
      message:null,
      invitemessage: [],
      applymessage: [],
      normalmessage: [],
    };
  },
  watch: {},
  mounted() {
    this.getInfo();
    this.getMessage();
  },
  methods: {
    getInfo() {
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/user/info",
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        this.user = response.data;
      });
    },
    getMessage() {
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/message/messages",
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        this.invitemessage = response.data.inviteMessage;
        this.applyMessage = response.data.applyMessage;
        this.normalmessage = response.data.normalMessage;
      });
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
    },
  },
};
</script>
<style>
.avatarStyle {
  cursor: pointer;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
}
</style>
