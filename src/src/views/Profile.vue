<template>
  <div class="profile">
    <a-breadcrumb style="margin:100px 0 -100px -600px;">
      <a-breadcrumb-item>右墨文档</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href="/">工作台</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>账户</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="profileBox">
      <a-layout-sider style="text-align:center;background:#F3F3F3">
        <a-avatar :size="64" v-if="data.avatar!=null" style="margin-top:120px" :src="data.avatar"></a-avatar>
        <avatar
          :size="64"
          v-if="data.avatar==null"
          :username="`${data.username}`"
          style="margin-top:120px;margin-left:auto;margin-right:auto"
        ></avatar>
        <a-menu
          style="background:#F3F3F3;margin-top:50px"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item key="1">账号信息</a-menu-item>
          <a-menu-item key="2">头像</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="background:#fff;text-align:left;" v-if="sider_status==1">
        <h1 style="margin:48px 0 0 64px">
          <b>账户信息</b>
        </h1>
        <div style="margin:12px 0 0 64px">
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b>
                <a-icon type="user" />账户
              </b>
            </a-col>
            <a-col :span="6">{{data.username}}</a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px" @click="handleUpdateInfo">修改</a-button>
            </a-col>-->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b>
                <a-icon type="info-circle" />简介
              </b>
            </a-col>
            <a-col :span="6">{{data.description}}</a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>-->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b>
                <a-icon type="phone" />手机
              </b>
            </a-col>
            <a-col :span="6">{{data.phone}}</a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>-->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b>
                <a-icon type="mail" />邮箱
              </b>
            </a-col>
            <a-col :span="6">{{data.email}}</a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>-->
          </a-row>
          <a-row style="margin-top:24px">
            <a-col :span="10">
              <b>
                <a-icon type="calendar" />生日
              </b>
            </a-col>
            <a-col :span="6">{{ birthday }}</a-col>
            <!-- <a-col :span="6">
              <a-button type="link" style="margin-top:-5px">修改</a-button>
            </a-col>-->
          </a-row>
          <a-row style="margin-top:30px;">
            <a-button type="primary" @click="handleUpdateInfo">修改个人信息</a-button>
            <a-button type="primary" @click="handleUpdatePassword" style="margin-left: 20px;">修改密码</a-button>
          </a-row>
        </div>
      </a-layout-content>
      <a-layout-content
        v-if="sider_status==2"
        style="background:#fff;text-align:center;"
      >
        <div>
          <a-upload
            name="image"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http://182.92.57.178:5000/pictures/add"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="data.avatar!=null" :src="data.avatar" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>点击即可上传头像
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal v-model="updateInfoModalVisible" title="修改个人信息" centered @ok="updateInfo">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :form="temp">
        <a-form-item label="手机号">
          <a-input v-model="temp.phone" />
        </a-form-item>
        <a-form-item label="生日">
          <a-date-picker v-model="temp.birthday" format="YYYY/MM/DD" style="width: 100%;" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="temp.email" />
        </a-form-item>
        <a-form-item label="个人描述">
          <a-input v-model="temp.description" />
        </a-form-item>
      </a-form>>
    </a-modal>
    <a-modal v-model="updatePasswordModalVisible" title="修改密码" center @ok="updatePassword">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :form="temp">
        <a-form-item label="旧密码">
          <a-input v-model="temp.old_password" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input v-model="temp.new_password" />
        </a-form-item>
      </a-form>
    </a-modal>
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
      openKeys: [],
      data: {},
      temp: {},
      sider_status: 1,
      updateInfoModalVisible: false,
      updatePasswordModalVisible: false,
      loading: false,
      imageUrl: "",
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
  },
  computed: {
    birthday: function () {
      const date = this.data.birthday;
      return date ? date.split("T")[0] : "";
    },
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.imageUrl = info.file.response.url;
        Vue.axios({
          method: "put",
          url: "http://39.106.230.20:8090/user/mod_info",
          headers: {
            token: this.$store.state.token,
          },
          data: {
            avatar: this.imageUrl,
          },
        }).then((response) => {
          console.log(response.data);
          this.getInfo();
          this.$message.success("头像上传成功", 1.5);
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    getInfo() {
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/user/info",
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        this.data = response.data;
        console.log(response.data.avatar);
        this.imageUrl == response.data.avatar;
        console.log(this.imageUrl);
      });
    },
    handleUpdateInfo() {
      const { phone, birthday, email, description } = this.data;
      (this.temp = {
        phone,
        birthday,
        email,
        description,
      }),
        (this.updateInfoModalVisible = true);
    },
    updateInfo() {
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/user/mod_info",
        headers: {
          token: this.$store.state.token,
        },
        data: this.temp,
      }).then((response) => {
        console.log(response.data);
        this.getInfo();
        this.$message.success("修改成功", 1.5);
      });
      this.updateInfoModalVisible = false;
    },
    handleUpdatePassword() {
      this.temp = {
        old_password: "",
        new_password: "",
      };
      this.updatePasswordModalVisible = true;
    },
    updatePassword() {
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/user/mod_password",
        headers: {
          token: this.$store.state.token,
        },
        data: this.temp,
      }).then((response) => {
        console.log(response.data);
        this.getInfo();
        this.$message.success("修改成功", 1.5);
      });
      this.updatePasswordModalVisible = false;
    },
    handleClick(e) {
      console.log("click", e);
      this.sider_status = e.key;
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
.avatar-uploader > .ant-upload {
  margin-left: 128px;
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
