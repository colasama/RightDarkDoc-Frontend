<template>
  <div class="home">
    <a-layout style="height:100%">
      <a-layout-sider style="min-width: 256px;height:100%;text-align:left;">
        <a-menu
          style="width: 256px;height:100%;text-align:left;"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-button size="large" type="primary" style="margin:50px 0 0 45px;width:160px">
            <a-icon type="edit" />创建文档
          </a-button>
          <a-menu-item key="1" style="margin-top:50px">
            <div style="margin:0px 0 0 20px">
              <a-icon type="file" />
              <span>我的文档</span>
            </div>
          </a-menu-item>
          <a-sub-menu key="sub1" style="margin-top:20px">
            <span style="margin:0px 0 0 20px" slot="title">
              <a-icon type="mail" />
              <span>我的团队</span>
            </span>
            <a-menu-item-group key="g1">
              <a-menu-item key="2">团队A</a-menu-item>
              <a-menu-item key="3">团队B</a-menu-item>
              <a-menu-item key="4">团队C</a-menu-item>
              <a-menu-item key="5">团队D</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="6" style="margin-top:20px">
            <div style="margin:0px 0 0 20px">
              <a-icon type="delete" />
              <span>回收站</span>
            </div>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="background:#fff">
        <div>
          <a-row style="height:50px"></a-row>
          <a-row type="flex">
            <a-col :span="2"></a-col>
            <a-col style="text-align:left">
              <div style="font-size:40px">咕咕咕的团队</div>
            </a-col>
            <a-col style="text-align:left">
              <div style="margin-top:30px;margin-left:5px">
                <a-icon v-if="ismanage" type="edit" style="font-size:25px " />
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="15" style="text-align:left">
              <div style="font-size:20px">这是一个绝对不鸽，永远准时的团队</div>
            </a-col>
            <a-col>
              <div>
                <a-button v-if="!ismanage" type="primary" @click="startmanage">
                  <a-icon type="setting" />管理
                </a-button>
                <a-button v-if="ismanage" type="default" @click="stopmanage">
                  <a-icon type="check" />完成
                </a-button>
              </div>
            </a-col>
          </a-row>
          <a-row style="margin-top:5px">
            <a-col :span="1"></a-col>
            <a-col :span="21" style="background:grey;height:1px"></a-col>
          </a-row>
          <a-row style="margin-top:20px">
            <a-col :span="1"></a-col>
            <a-col :span="18" style="text-align:left">
              <div style="font-size:30px">团队文档</div>
            </a-col>
            <a-col :span="3">
              <div style="font-size:20px">团队成员</div>
              <div>
                <a-list item-layout="horizontal" :data-source="team_members">
                  <div slot="header">
                    <a-avatar
                      slot="avatar"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <a slot="title">创建者</a>
                  </div>
                  <a-list-item slot="renderItem" slot-scope="item">
                    <div style="margin:auto">
                      <a-avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                      {{item.username}}
                    </div>
                    <a-icon v-if="ismanage" type="delete" />
                  </a-list-item>
                  <div slot="footer">
                    <a-button v-if="ismanage" type="danger">
                      <a-icon type="close" />解散团队
                    </a-button>
                  </div>
                </a-list>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
// @ is an alias to /src
const team_members = [
  {
    username: "成员1",
  },
  {
    username: "成员2",
  },
  {
    username: "成员3",
  },
  {
    username: "成员4",
  },
];
export default {
  name: "Home",
  components: {},
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
      team_members,
      ismanage: false,
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    startmanage() {
      this.ismanage = true;
    },
    stopmanage() {
      this.ismanage = false;
    },
  },
};
</script>
