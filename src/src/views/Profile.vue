<template>
  <div class="profile">
    <a-breadcrumb style="margin:100px 0 -100px -600px;">
      <a-breadcrumb-item>右墨文档</a-breadcrumb-item>
      <a-breadcrumb-item><a href="/">工作台</a></a-breadcrumb-item>
      <a-breadcrumb-item>账户</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="profileBox">
      <a-layout-sider style="text-align:center;background:#F3F3F3">
        <a-avatar :size="64" style="margin-top:120px" :src="data.avatar"></a-avatar>
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
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px" @click="handleUpdateInfo">修改</a-button>
            </a-col> -->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="info-circle"/> 简介</b>
            </a-col>
            <a-col :span="6">
              {{data.description}}
            </a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col> -->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="phone"/> 手机</b>
            </a-col>
            <a-col :span="6">
              {{data.phone}}
            </a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col> -->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="mail"/> 邮箱</b>
            </a-col>
            <a-col :span="6">
              {{data.email}}
            </a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col> -->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b><a-icon type="calendar"/> 生日</b>
            </a-col>
            <a-col :span="6">
              {{ birthday }}
            </a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col> -->
          </a-row>
          <a-row style="margin-top:30px;">
            <a-button type="primary" @click="handleUpdateInfo">修改个人信息</a-button>
            <a-button type="primary" @click="handleUpdatePassword" style="margin-left: 20px;">修改密码</a-button>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal v-model="updateInfoModalVisible" title="修改个人信息" centered @ok="updateInfo">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :form="temp">
        <a-form-item label="手机号">
          <a-input v-model="temp.phone" />
        </a-form-item>
        <a-form-item label="生日" >
          <a-date-picker v-model="temp.birthday" format="YYYY/MM/DD" style="width: 100%;" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="temp.email" />
        </a-form-item>
        <a-form-item label="头像">
          <a-input v-model="temp.avatar" />
        </a-form-item>
        <a-form-item label="个人描述">
          <a-input v-model="temp.description" />
        </a-form-item>
      </a-form>>
    </a-modal>
    <a-modal v-model="updatePasswordModalVisible" title="修改密码" center @ok="updatePassword">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :form="temp">
        <a-form-item label="旧密码">
          <a-input v-model="temp.old_password"/>
        </a-form-item>
        <a-form-item label="新密码">
          <a-input v-model="temp.new_password"/>
        </a-form-item>
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
import Vue from 'vue'
export default {
  name: "Home",
  components: {},
  data() {
    return {
      openKeys: [],
      data: {},
      temp: {},
      updateInfoModalVisible: false,
      updatePasswordModalVisible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }
  },
  computed: {
    birthday: function() {
      const date = this.data.birthday
      return date ? date.split('T')[0] : ''
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
      Vue.axios({
        method: 'get',
        url: 'http://39.106.230.20:8090/user/info',
        headers: {
          token: this.$store.state.token,
        },
      }).then(response => {
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
      Vue.axios({
        method: 'put',
        url: 'http://39.106.230.20:8090/user/mod_info',
        headers: {
          token: this.$store.state.token,
        },
        data: this.temp
      }).then(response => {
        console.log(response.data)
        this.getInfo()
        this.$message.success("修改成功", 1.5)
      })
      this.updateInfoModalVisible = false
    },
    handleUpdatePassword() {
      this.temp = {
        old_password: '',
        new_password: ''
      }
      this.updatePasswordModalVisible = true
    },
    updatePassword() {
      Vue.axios({
        method: 'put',
        url: 'http://39.106.230.20:8090/user/mod_password',
        headers: {
          token: this.$store.state.token,
        },
        data: this.temp
      }).then(response => {
        console.log(response.data)
        this.getInfo()
        this.$message.success("修改成功", 1.5)
      })
      this.updatePasswordModalVisible = false
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
