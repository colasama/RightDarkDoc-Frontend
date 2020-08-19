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
        <a-upload
          style="margin:0 auto"
          name="image"
          :show-upload-list="false"
          action="http://182.92.57.178:5000/pictures/add"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-avatar :size="64" class="avatarStyle" v-if="data.avatar!=null" :src="data.avatar" />

          <avatar
            :size="64"
            class="avatarStyle"
            v-if="data.avatar==null"
            :username="`${data.username}`"
          ></avatar>
        </a-upload>
        <div style="margin-top:20px">点击上传头像</div>
        <a-menu
          style="background:#F3F3F3;margin-top:50px"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item key="1">账号信息</a-menu-item>
          <!--a-menu-item key="2">头像</a-menu-item-->
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
          <a-row style="margin:30px 64px 0 0;">
            <a-button type="primary" @click="handleUpdateInfo">修改个人信息</a-button>
            <a-button type="primary" @click="handleUpdatePassword" style="margin-left: 16px;">修改密码</a-button>
            <a-button type="primary" @click="handleUpdateEmail" style="margin-left: 16px;">修改邮箱</a-button>
          </a-row>
        </div>
      </a-layout-content>
      <!--a-layout-content
        v-if="sider_status==2"
        style="background:#fff;"
      >
        <div style="text-align:center;margin:auto">
          <a-upload
            style="margin:0 auto"
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
      </a-layout-content-->
    </a-layout>
    <a-modal
      width="480px"
      v-model="updateInfoModalVisible"
      title="修改个人信息"
      centered
      @ok="updateInfo"
      okText="确认"
      cancelText="取消"
    >
      <a-form-model
        style="margin:24px 24px 24px 48px"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="temp"
        :rules="rules"
      >
        <a-form-model-item has-feedback label="手机号" prop="phone">
          <a-input style="width:240px" v-model="temp.phone" />
        </a-form-model-item>
        <a-form-model-item label="生日">
          <a-date-picker v-model="temp.birthday" format="YYYY/MM/DD" style="width: 240px" />
        </a-form-model-item>
        <a-form-model-item label="个人描述">
          <a-input style="width:240px" v-model="temp.description" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
      width="480px"
      v-model="updatePasswordModalVisible"
      title="修改密码"
      centered
      @ok="updatePassword"
      cancelText="取消"
      okText="确认"
    >
      <a-form-model
        style="margin:24px"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="temp"
        :rules="rules"
      >
        <a-form-model-item label="旧密码">
          <a-input style="width:270px" v-model="temp.oldpassword" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="新密码" prop="new_password">
          <a-input style="width:270px" v-model="temp.newpassword" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
      width="480px"
      v-model="updateEmailModalVisible"
      title="修改邮箱"
      centered
      @ok="updateEmail"
      cancelText="取消"
      okText="确认"
    >
      <a-form-model
        style="margin:24px"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="temp"
        :rules="rules"
      >
        <a-form-model-item has-feedback label="邮箱" prop="email">
          <a-input style="width:240px" v-model="temp.email" />
        </a-form-model-item>
        <a-form-model-item label="验证码">
          <a-input-search v-model="authcode" @search="sendMail">
            <a-button v-if="count==0" slot="enterButton">获取验证码</a-button>
            <a-button v-else disabled slot="enterButton">{{count}}秒后重试</a-button>
          </a-input-search>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<style>
.avatarStyle {
  cursor: pointer;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
}

.avatarStyle.hover {
  color: #000000;
}

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
    const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const regPhone = /^[0-9]{11}$/;
    const validatePhone = (rules, value, callback) => {
      if (!regPhone.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    const validateEmail = (rules, value, callback) => {
      if (!regEmail.test(value)) {
        callback(new Error("请输入正确格式的邮箱"));
      } else {
        callback();
      }
    };

    return {
      openKeys: [],
      data: {},
      temp: {},
      rules: {
        phone: [{ validator: validatePhone, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
      },
      count: 0,
      authcode: "",
      sider_status: 1,
      updateInfoModalVisible: false,
      updatePasswordModalVisible: false,
      updateEmailModalVisible: false,
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
        this.data.avatar = this.imageUrl;
        Vue.axios({
          method: "put",
          url: "http://39.106.230.20:8090/user/mod_info",
          headers: {
            token: this.$store.state.token,
          },
          data: this.data,
        }).then((response) => {
          if (response.data.success == true) {
            this.getInfo();
            this.$message.success("头像上传成功", 1.5);
            this.loading = false;
            this.$store.state.useravatar = this.imageUrl;
            window.sessionStorage.setItem("useravatar", this.imageUrl);
          } else {
            this.$message.error("头像上传失败", 1.5);
          }
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("你只能上传jpg格式的文件。");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片不能小于2MB~");
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
        this.imageUrl == response.data.avatar;
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
      this.temp.avatar = this.data.avatar;
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/user/mod_info",
        headers: {
          token: this.$store.state.token,
        },
        data: this.temp,
      }).then((response) => {
        const { success, message } = response.data;
        if (success == true) {
          this.getInfo();
          this.$message.success(message, 1.5);
          this.updateInfoModalVisible = false;
        } else {
          this.$message.error(message, 1.5);
        }
      });
    },
    handleUpdatePassword() {
      this.temp = {
        oldpassword: "",
        newpassword: "",
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
        const { success, message } = response.data;
        if (success == true) {
          this.getInfo();
          this.$message.success(message, 1.5);
          this.updatePasswordModalVisible = false;
        } else {
          this.$message.error(message, 1.5);
        }
      });
    },
    updateEmail() {
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/user/updateEmail",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          email: this.temp.email,
          code: this.authcode,
        },
      }).then((response) => {
        const { success, message } = response.data;
        if (success == true) {
          that.getInfo();
          that.$message.success(message, 1.5);
          that.updateEmailModalVisible = false;
        } else {
          that.$message.error(message, 1.5);
        }
      });
    },
    sendMail() {
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/changeEmail/code",
        data: {
          email: this.temp.email,
        },
        headers: {
          token: this.$store.state.token,
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
    handleUpdateEmail() {
      this.updateEmailModalVisible = true;
    },
    handleClick(e) {
      console.log("click", e);
      this.sider_status = e.key;
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
  width: 128px;
  height: 128px;
  text-align: center;
  padding: 24px;
}

.ant-upload-select-picture-card {
  text-align: center;
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
