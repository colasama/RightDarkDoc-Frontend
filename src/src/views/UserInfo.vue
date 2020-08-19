<template>
  <div class="profile">
    <a-breadcrumb style="margin:100px 0 -100px -600px;">
      <a-breadcrumb-item>右墨文档</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href="/">工作台</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>账户信息</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout class="profileBox">
      <a-layout-sider style="text-align:center;background:#F3F3F3">
        <a-avatar :size="64" class="avatarStyle" v-if="data.avatar!=null" :src="data.avatar" />
        <avatar
          :size="64"
          class="avatarStyle"
          v-if="data.avatar==null"
          :username="`${data.username}`"
        ></avatar>
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
    getInfo() {
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/user/"+this.$route.params.id,
      }).then((response) => {
        this.data = response.data.user;
      });
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
