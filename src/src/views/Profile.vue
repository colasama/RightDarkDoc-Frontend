<template>
  <div class="profile">
    <a-breadcrumb style="margin:100px 0 -100px -600px;">
      <a-breadcrumb-item>右墨文档</a-breadcrumb-item>
      <a-breadcrumb-item><a href="/">工作台</a></a-breadcrumb-item>
      <a-breadcrumb-item>账户</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="profileBox">
      <a-layout-sider style="text-align:center;background:#F3F3F3">
        <a-avatar :size="64" style="margin-top:120px"></a-avatar>
        <a-menu
          style="background:#F3F3F3;margin-top:50px"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item key="1">
            账号信息
          </a-menu-item>
          <a-menu-item key="2">
            设置
          </a-menu-item>
      </a-menu>
      </a-layout-sider>
      <a-layout-content style="background:#fff;text-align:left;">
        <h1 style="margin:48px 0 0 64px"><b>账户信息</b></h1>
        <div style="margin:12px 0 0 64px">
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="user"/> 账户</b>
            </a-col>
            <a-col :span="6">
              {{data.username}}
            </a-col>
            <a-col :span="6">
              <a-button type="link" style="margin-top:-5px" @click="handleUpdateInfo">修改</a-button>
            </a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="info-circle"/> 简介</b>
            </a-col>
            <a-col :span="6">
              {{data.description}}
            </a-col>
            <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="phone"/> 手机</b>
            </a-col>
            <a-col :span="6">
              {{data.phone}}
            </a-col>
            <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="mail"/> 邮箱</b>
            </a-col>
            <a-col :span="6">
              {{data.email}}
            </a-col>
            <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="calendar"/> 生日</b>
            </a-col>
            <a-col :span="6">
              {{data.birthday}}
            </a-col>
            <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal v-model="updateInfoModalVisible" title="修改个人信息" centered @ok="updateInfo">
      <a-form>
        <a-form-item></a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style>
.profile{
  background:#FAFAFA;
  text-align:center;
  position:flex;
}

.profileBox{
  height:400px;
  width:800px;
  margin:120px auto;
  box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
}

.card-container {
  background: #fff;
  overflow: hidden;
}

.card-container > .ant-tabs-line > .ant-tabs-bar {
  border-color: #fff;
}
</style>
<script>
const data = {
  username: '咕咕咕',
  password: '000000',
  phone: '13000000000',
  birthday: '2000/01/15',
  avatar: 'xxx',
  description: '000000',
  email:'233@cc.com'
}
export default {
  name: "Home",
  components: {},
  data() {
    return {
      data,
      temp: {},
      updateInfoModalVisible: false,
    }
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.getRequest('/user/info', {}).then(response => {
        console.log(response.data)
        this.data = response.data
      })
    },
    handleUpdateInfo() {
      const { phone, birthday, email, avatar, description } = this.data
      this.temp = {
        phone,
        birthday,
        email,
        avatar,
        description
      },
      this.updateInfoModalVisible = true
    },
    updateInfo() {
      this.putRequest('/user/mod_info', this.temp).then(response => {
        console.log(response.data)
        this.getInfo()
        this.$notify({
          title: 'Success',
          message: '添加成功',
          type: 'success',
          duration: 2000
        })       
      })
    },
    handleClick(e) {
      console.log("click", e);
      this.stopmanage();
      if (e.key == "doc") {
        this.sider_status = 1;
      }
      if (e.key[0] == "t") {
        this.sider_status = 2;
        var current_teamid=e.key.substring(1);
        for (let index = 0; index < this.teams.length; index++) {
          const element = this.teams[index];
          if (element.teamid==current_teamid) {
            this.current_team=this.teams[index];
          }
        }
      }
      if (e.key == "trash") {
        this.sider_status = 3;
      }
    },
    startmanage() {
      this.ismanage = true;
    },
    stopmanage() {
      this.ismanage = false;
      this.isedit_name = false;
      this.isedit_info = false;
    },
    editname() {
      this.isedit_name = true;
    },
    editinfo() {
      this.isedit_info = true;
    },
    change_name(value) {
      console.log(value);
      this.isedit_name = false;
    },
    change_info(value) {
      console.log(value);
      this.isedit_info = false;
    },
    delete_member() {},
    handleRightMenuClick(vm, event) {
      console.log(vm, event);
    },
  },
};
</script>
<style>
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
