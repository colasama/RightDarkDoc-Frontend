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
          <a-dropdown placement="bottomCenter" trigger="['click']">
            <a-button size="large" type="primary" style="margin:50px 0 0 45px;width:160px">
              <a-icon type="form" />创建文档
            </a-button>
            <a-icon type="down" />
            <a-menu slot="overlay" @click="onClick" style="text-align:center">
              <a-menu-item v-if="sider_status!=2" key="1">创建空白文档</a-menu-item>
              <a-menu-item v-if="sider_status!=2" key="2">从模板创建</a-menu-item>
              <a-menu-item v-if="sider_status==2" key="3">创建空白团队文档</a-menu-item>
              <a-menu-item v-if="sider_status==2" key="4">从模板创建团队文档</a-menu-item>
            </a-menu>
          </a-dropdown>

          <!--从模板新建文档的对话框-->
          <a-modal 
            width="1020px"
            v-model="createFromTempleteVisible"
            title="选择模板"
            okText="确认"
            cancelText="取消"
            @ok="handleOk"
            >
          <div style="text-align:center">
            <a-list
                :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
                :data-source="data"
                style="text-align:center;margin:24px"
              >
            <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                  style="text-align:center;margin:10px auto"
                >
                  <a-card
                    :bordered="false"
                    :hoverable="true"
                    style="min-width:220px;max-width:220px;text-align:center"
                    @contextmenu.prevent
                    v-contextmenu:contextmenu
                  >
                    <div>
                      <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                    </div>
                    <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.content}}</div>
                    <div style="font-size:12px;color:#9c9c9c">
                      {{item.lastedittime}}
                      <!--a-icon key="ellipsis" type="ellipsis" /-->
                    </div>
                  </a-card>
                </a-list-item>
              </a-list>
              </div>
          </a-modal>

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
              <a-menu-item v-for="item in teams" v-bind:key="'t'+item.teamid">{{item.teamname}}</a-menu-item>
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
          <div class="card-container">
            <a-tabs style="text-align:left;margin:24px" type="line">
              <a-tab-pane key="1" tab="我的文档">
                <a-list
                  :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                  :data-source="data"
                  style="text-align:center;margin:15px auto"
                >
                  <a-list-item
                    slot="renderItem"
                    slot-scope="item"
                    style="text-align:center;margin:15px auto"
                  >
                    <a-card
                      :bordered="false"
                      :hoverable="true"
                      style="min-width:240px;max-width:240px;text-align:center"
                      @contextmenu.prevent
                      v-contextmenu:contextmenu
                    >
                      <div>
                        <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                      </div>
                      <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.content}}</div>
                      <div style="font-size:12px;color:#9c9c9c">
                        {{item.lastedittime}}
                        <!--a-icon key="ellipsis" type="ellipsis" /-->
                      </div>
                    </a-card>

                    <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                      <v-contextmenu-item @click="handleRightMenuClick">
                        <a-icon type="folder-open" /><span style="margin-left:3px">打开</span>
                      </v-contextmenu-item>
                      <v-contextmenu-item @click="handleRightMenuClick">
                        <a-icon type="edit" /><span style="margin-left:3px">重命名</span>
                      </v-contextmenu-item>
                      <v-contextmenu-item @click="handleRightMenuClick">
                        <a-icon type="control" /><span style="margin-left:3px">权限设置</span>
                      </v-contextmenu-item>
                      <v-contextmenu-item @click="handleRightMenuClick">
                        <a-icon type="delete" /><span style="margin-left:3px">删除</span>
                      </v-contextmenu-item>
                      <v-contextmenu-item divider />
                      <v-contextmenu-item @click="handleRightMenuClick">
                        <a-icon type="share-alt" /><span style="margin-left:3px">分享</span>
                      </v-contextmenu-item>
                      <v-contextmenu-item divider />
                      <v-contextmenu-item @click="handleRightMenuClick">
                        <a-icon type="share-alt" /><span style="margin-left:3px">详细信息</span>
                      </v-contextmenu-item>
                    </v-contextmenu>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
              <a-tab-pane key="2" tab="最近浏览"></a-tab-pane>
              <a-tab-pane key="3" tab="我的收藏"></a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div v-if="sider_status==2">
          <!--团队页面部分-->
          <a-row style="height:50px"></a-row>
          <a-row type="flex">
            <a-col style="text-align:left">
              <span v-if="!isedit_name" style="font-size:40px;margin-left:24px">
                <b>{{current_team.teamname}}</b>
                <transition name="slide-fade">
                  <a-button
                    v-if="ismanage"
                    type="link"
                    @click="editname"
                    icon="edit"
                    style="margin-left:5px;font-size:24px;"
                  />
                </transition>
              </span>
              <div v-if="isedit_name" style="font-size:40px">
                <a-input-search
                  v-bind:defaultValue="current_team.teamname"
                  enter-button="确定"
                  size="large"
                  @search="change_name"
                  style="margin-left:24px"
                />
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21" style="text-align:left">
              <div v-if="!isedit_info" style="font-size:20px;margin-left:24px">
                <span style>{{current_team.info}}</span>
                <transition name="slide-fade">
                  <a-button
                    v-if="ismanage"
                    type="link"
                    @click="editinfo"
                    icon="edit"
                    style="font-size:15px;"
                  />
                </transition>
              </div>
              <div v-if="isedit_info">
                <a-input-search
                  v-bind:defaultValue="current_team.info"
                  enter-button="确定"
                  size="large"
                  @search="change_info"
                  style="margin-left:24px;width:50%"
                />
                <!--这个@search本质上就是click-->
              </div>
            </a-col>
            <a-col :span="1" style="text-align:right;margin:0 48px 10px 0">
              <div v-if="isleader">
                <a-button v-if="!ismanage" type="primary" @click="startmanage">
                  <a-icon type="setting" />管理
                </a-button>
                <a-button v-if="ismanage" type="default" @click="stopmanage">
                  <a-icon type="check" />完成
                </a-button>
              </div>
              <div v-if="!isleader">
                <a-button v-if="!ismanage" type="primary">
                  <a-icon type="logout" />退出团队
                </a-button>
              </div>
            </a-col>
          </a-row>
          <a-row style="margin-top:5px">
            <a-col style="background:#c2c2c2;height:1px;margin:10px 24px 0 24px"></a-col>
          </a-row>
          <a-row style="margin-top:20px">
            <a-col :span="21" style="text-align:left">
              <div style="font-size:30px;margin-left:24px">团队文档</div>
              <a-list
                :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                :data-source="data"
                style="text-align:center;margin:15px auto"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                  style="text-align:center;margin:15px auto"
                >
                  <a-card
                    :bordered="false"
                    :hoverable="true"
                    style="min-width:240px;max-width:240px;text-align:center"
                    @contextmenu.prevent
                    v-contextmenu:contextmenu
                  >
                    <div>
                      <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                    </div>
                    <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.content}}</div>
                    <div style="font-size:12px;color:#9c9c9c">
                      {{item.lastedittime}}
                      <!--a-icon key="ellipsis" type="ellipsis" /-->
                    </div>
                  </a-card>

                  <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                    <v-contextmenu-item @click="handleRightMenuClick">
                      <a-icon type="folder-open" />打开
                    </v-contextmenu-item>
                    <v-contextmenu-item @click="handleRightMenuClick">
                      <a-icon type="edit" />重命名
                    </v-contextmenu-item>
                    <v-contextmenu-item @click="handleRightMenuClick">
                      <a-icon type="control" />权限设置
                    </v-contextmenu-item>
                    <v-contextmenu-item @click="handleRightMenuClick">
                      <a-icon type="delete" />删除
                    </v-contextmenu-item>
                    <v-contextmenu-item divider />
                    <v-contextmenu-item @click="handleRightMenuClick">
                      <a-icon type="share-alt" />分享
                    </v-contextmenu-item>
                  </v-contextmenu>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="2" style="text-align:left;margin-right:24px">
              <div style="font-size:20px">团队成员</div>
              <div>
                <a-list item-layout="horizontal" :data-source="team_members">
                  <div slot="header">
                    <a-avatar icon="user" />
                    <a slot="title">创建者</a>
                  </div>
                  <a-list-item slot="renderItem" slot-scope="item">
                    <div style="text-align:left">
                      <a-avatar icon="user" />
                      {{item.username}}
                    </div>
                    <transition name="slide-fade">
                      <a-icon v-if="ismanage" type="delete" @click="delete_member" />
                    </transition>
                  </a-list-item>
                  <div slot="footer" style="text-align:right">
                    <transition name="slide-fade">
                      <a-button v-if="ismanage" type="danger" style="margin-top:12px">
                        <a-icon type="close" />解散团队
                      </a-button>
                    </transition>
                  </div>
                </a-list>
              </div>
            </a-col>
          </a-row>
        </div>
        <div v-if="sider_status==3">
          <!--回收站页面部分-->
          <a-row>
            <a-col :span="20"></a-col>
            <a-col :span="2" style="text-align:left">
              <a-button size="default" type="default" style="margin-top:50px">
                <a-icon type="delete" />清空回收站
              </a-button>
            </a-col>
          </a-row>
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
            :data-source="data"
            style="text-align:center;margin:15px auto"
          >
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              style="text-align:center;margin:15px auto"
            >
              <a-card
                :bordered="false"
                :hoverable="true"
                style="min-width:240px;max-width:240px;text-align:center"
                @contextmenu.prevent
                v-contextmenu:contextmenu
              >
                <div>
                  <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                </div>
                <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.content}}</div>
                <div style="font-size:12px;color:#9c9c9c">
                  {{item.lastedittime}}
                  <!--a-icon key="ellipsis" type="ellipsis" /-->
                </div>
              </a-card>
              <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                <v-contextmenu-item @click="handleRightMenuClick">
                  <a-icon type="redo" />恢复
                </v-contextmenu-item>
                <v-contextmenu-item @click="handleRightMenuClick">
                  <a-icon type="delete" />彻底删除
                </v-contextmenu-item>
              </v-contextmenu>
            </a-list-item>
          </a-list>
        </div>
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
const data = [
  {
    content: "一起来打雪仗吧",
    lastedittime: "2020.08.11 14:30:11",
  },
  {
    content: "其实我也没上过学",
    lastedittime: "2020.08.11 14:30:11",
  },
  {
    content: "今生再无悲喜",
    lastedittime: "2020.08.11 14:30:11",
  },
  {
    content: "好耶",
    lastedittime: "2020.08.11 14:30:11",
  },
  {
    content: "说，藤本树",
    lastedittime: "2020.08.11 14:30:11",
  },
  {
    content: "你哭什么啊",
    lastedittime: "2020.08.11 14:30:11",
  },
  {
    content: "不知道",
    lastedittime: "2020.08.11 14:30:11",
  },
];
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      createFromTempleteVisible:true,
      current: ["mail"],
      openKeys: ["sub1"],
      teams: [
        {
          teamid: 1,
          teamname: "咕咕咕的团队",
          info: "这是一个绝对不鸽，永远准时的团队。",
        },
        {
          teamid: 2,
          teamname: "鸽鸽鸽的团队",
          info: "这是一个绝对不鸽，永远准时的团队。",
        },
        {
          teamid: 3,
          teamname: "团队A",
          info: "团队A",
        },
        {
          teamid: 4,
          teamname: "团队B",
          info: "团队B",
        },
      ],
      current_team:{},
      team_members:[
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
      ],
      isleader: true,
      ismanage: false,
      sider_status: 1,
      isedit_name: false,
      isedit_info: false,
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
