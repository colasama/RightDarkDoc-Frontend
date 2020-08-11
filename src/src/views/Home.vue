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
          <a-button size="large" type="primary" style="margin:20px 0 0 45px;width:160px">
            <a-icon type="team" />创建团队
          </a-button>
          <a-menu-item key="doc" style="margin-top:50px">
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
            <a-menu-item-group key="team">
              <a-menu-item key="t1">团队A</a-menu-item>
              <a-menu-item key="t2">团队B</a-menu-item>
              <a-menu-item key="t3">团队C</a-menu-item>
              <a-menu-item key="t4">团队D</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="trash" style="margin-top:20px">
            <div style="margin:0px 0 0 20px">
              <a-icon type="delete" />
              <span>回收站</span>
            </div>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="background:#fff">
        <div v-if="sider_status==1">
        <!--我的文档页面部分-->
          <a-tabs style="text-align:left;margin:24px" type="line">
            <a-tab-pane key="1" tab="我的文档">
              <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }" :data-source="data" style="text-align:center;margin:15px auto">
                <a-list-item slot="renderItem" slot-scope="item" style="text-align:center;margin:15px auto">
                  <a-card
                    :bordered="false"
                    :hoverable="true"
                    style="min-width:240px;max-width:240px;text-align:center"
                    @contextmenu.prevent=""
                    v-contextmenu:contextmenu>
                    <div><a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon></div>
                    <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.content}}</div>
                    <div style="font-size:12px;color:#9c9c9c">{{item.lastedittime}} <!--a-icon key="ellipsis" type="ellipsis" /--></div>
                  </a-card>

                  <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                    <v-contextmenu-item @click="handleRightMenuClick"><a-icon type="edit"/> 打开</v-contextmenu-item>
                    <v-contextmenu-item @click="handleRightMenuClick"><a-icon type="control"/> 权限设置</v-contextmenu-item>
                    <v-contextmenu-item @click="handleRightMenuClick"><a-icon type="delete"/> 删除</v-contextmenu-item>
                  <v-contextmenu-item divider/>
                  <v-contextmenu-item @click="handleRightMenuClick"><a-icon type="share-alt"/> 分享</v-contextmenu-item>
                  </v-contextmenu>

                </a-list-item>
              </a-list>
              
            </a-tab-pane>
            <a-tab-pane key="2" tab="最近浏览">

            </a-tab-pane>
            <a-tab-pane key="3" tab="我的收藏">

            </a-tab-pane>
          </a-tabs>
        </div>
        <div v-if="sider_status==2">
        <!--团队页面部分-->
          <a-row style="height:50px"></a-row>
          <a-row type="flex">
            <a-col :span="2"></a-col>
            <a-col style="text-align:left">
              <div style="font-size:40px">咕咕咕的团队</div>
            </a-col>
            <a-col style="text-align:left">
              <div v-if="ismanage" style="margin-top:30px;margin-left:5px">
                <a-icon type="edit" style="font-size:25px;color:#ec583a" />
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
        <div v-if="sider_status==3">
        <!--回收站页面部分-->
          回收站
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
const data = [
  {
    content: '一起来打雪仗吧',
    lastedittime: '2020.08.11 14:30:11',
  },
  {
    content: '其实我也没上过学',
    lastedittime: '2020.08.11 14:30:11',
  },
  {
    content: '今生再无悲喜',
    lastedittime: '2020.08.11 14:30:11',
  },
  {
    content: '好耶',
    lastedittime: '2020.08.11 14:30:11',
  },
  {
    content: '说，藤本树',
    lastedittime: '2020.08.11 14:30:11',
  },
  {
    content: '你哭什么啊',
    lastedittime: '2020.08.11 14:30:11',
  },
];
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
      sider_status:1,
      data,
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
      if (e.key=="doc") {
        this.sider_status=1;
      }
      if (e.key[0]=='t') {
        this.sider_status=2;
      }
      if (e.key=="trash") {
        this.sider_status=3;
      }
    },
    startmanage() {
      this.ismanage = true;
    },
    stopmanage() {
      this.ismanage = false;
    },
    handleRightMenuClick(vm, event){
      console.log(vm, event)
    }
  },
};
</script>
