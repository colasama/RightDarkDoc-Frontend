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
        </div>
      </a-layout-content>
    </a-layout>
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
export default {
  name: "Home",
  components: {},
  data() {
    return {
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
  watch: {

  },
  mounted() {
      
  },
  methods: {

  },
};
</script>
