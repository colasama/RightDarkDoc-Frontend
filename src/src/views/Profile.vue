<template>
  <div class="profile">
    <a-layout style="margin:0 auto 30px;padding:50px 0 70px 60px;">
      <a-layout-sider style="text-align:left;">
      </a-layout-sider>
      <a-layout-content style="background:#fff">
        <a-form layout="horizontal">
          <a-form-item>
            <a-icon type="ie" />
            <span>昵称</span>
            <span>{{ data.username }}</span>
          </a-form-item>
          <a-form-item>
            <a-icon type="ie" />
            <span>密码</span>
            <span>{{ data.password }}</span>
            <a-button>
              修改
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-icon type="ie" />
            <span>手机</span>
            <span>{{ data.phone }}</span>
            <a-button>
              编辑
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-icon type="ie" />
            <span>出生日期</span>
            <span>{{ data.birthday }}</span>
            <a-button>
              修改
            </a-button>
          </a-form-item>
        </a-form>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<style>
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
  description: '000000'
}
export default {
  name: "Home",
  components: {},
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      data,
    }
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
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
