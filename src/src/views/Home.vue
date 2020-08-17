<template>
  <div class="home">
    <a-layout style="height:100%">
      <a-drawer
        title="详细信息"
        placement="right"
        maskClosable
        :closable="true"
        :visible="doc_info_visible"
        @close="on_info_Close"
      >
        <div style>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="file-text" />标题
              </b>
            </a-col>
            <a-col>{{current_doc.title}}</a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="user" />创建者
              </b>
            </a-col>
            <a-col>{{current_doc.createusername}}</a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="clock-circle" />创建时间
              </b>
            </a-col>
            <a-col>{{current_doc.createtimeString}}</a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="clock-circle" />最后修改时间
              </b>
            </a-col>
            <a-col>{{current_doc.lastetidtimeString}}</a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="hourglass" />修改次数
              </b>
            </a-col>
            <a-col>{{current_doc.editcount}}</a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="user" />最后修改用户
              </b>
            </a-col>
            <a-col>{{current_doc.lasteditusername}}</a-col>
          </a-row>
          <a-row style="margin-top:24px">
            <a-col>
              <b>
                <a-icon type="folder" />类型
              </b>
            </a-col>
            <a-col>{{current_doc.teamid ? ("团队文档"+"（团队号："+current_doc.teamid+"）"): "普通文档"}}</a-col>
          </a-row>
        </div>
      </a-drawer>
      <a-layout-sider style="min-width: 256px;height:100%;text-align:left;">
        <a-menu
          style="width: 256px;height:100%;text-align:left;"
          :default-selected-keys="['1']"
          :open-keys.sync="openKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-dropdown :trigger="['click']" placement="bottomCenter">
            <a-button
              size="large"
              type="primary"
              style="border-radius:0px;margin:50px 0 0 45px;width:160px"
            >
              <a-icon type="form" />创建文档
            </a-button>
            <a-icon type="down" />
            <a-menu slot="overlay" style="text-align:center">
              <a-menu-item v-if="sider_status!=2" key="1" @click="createDocBTN">创建空白文档</a-menu-item>
              <a-menu-item @click="createFromTempleteBTN" v-if="sider_status!=2" key="2">从模板创建</a-menu-item>
              <a-menu-item v-if="sider_status==2" key="3" @click="createTeamDocBTN">创建空白团队文档</a-menu-item>
              <a-menu-item
                @click="createFromTempleteTeamBTN"
                v-if="sider_status==2"
                key="4"
              >从模板创建团队文档</a-menu-item>
            </a-menu>
          </a-dropdown>

          <!--从模板新建文档的对话框-->
          <a-modal
            width="1020px"
            v-model="createFromTempleteVisible"
            title="选择模板"
            okText="确认"
            cancelText="取消"
            @ok="createFromTemplete"
          >
            <div style="text-align:center">
              <a-list
                :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }"
                :data-source="templates"
                style="text-align:center;margin:24px"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                  style="text-align:center;margin:10px auto"
                >
                  <a-card
                    v-bind:bordered="item.tempid==current_tempid"
                    :hoverable="true"
                    style="min-width:220px;max-width:220px;text-align:center;border-color:#457AD3;"
                    @click="chooseTemplate(item.tempid)"
                    @ok="createFromTemplete"
                  >
                    <div>
                      <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                    </div>
                    <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.title}}</div>
                    <div style="font-size:12px;color:#9c9c9c">
                      {{item.lastetidtimeString}}
                      <!--a-icon key="ellipsis" type="ellipsis" /-->
                    </div>
                  </a-card>
                </a-list-item>
              </a-list>
            </div>
          </a-modal>

          <a-button
            @click="createTeamBTN"
            size="large"
            type="primary"
            style="border-radius:0px;margin:16px 0 0 45px;width:160px"
          >
            <a-icon type="team" />创建团队
          </a-button>

          <!--创建团队的对话框-->
          <a-modal
            width="520px"
            v-model="createTeamVisible"
            title="创建团队"
            okText="确认"
            centered
            cancelText="取消"
            @ok="createteam"
          >
            <span style="color:#ff4c00">*</span>团队名称
            <a-input style="margin-top:5px;margin-bottom:12px" v-model="teamname"></a-input>
            <span style="color:#ff4c00">*</span>团队简介
            <a-textarea
              v-model="teaminfo"
              style="margin-top:5px"
              :auto-size="{ minRows: 4, maxRows: 6 }"
            />
          </a-modal>
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
            <a-tabs
              default-active-key="1"
              style="text-align:left;margin:24px"
              type="line"
              @change="tabchange"
            >
              <a-tab-pane key="1" tab="我的文档">
                <a-list
                  :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                  :data-source="docs"
                  style="text-align:center;margin:15px auto"
                >
                  <a-list-item
                    slot="renderItem"
                    slot-scope="item"
                    style="text-align:center;margin:15px auto"
                  >
                    <a-dropdown :trigger="['contextmenu']">
                      <a-card
                        :bordered="false"
                        :hoverable="true"
                        style="min-width:240px;max-width:240px;text-align:center"
                        :docid="item.docid"
                        @click="open_doc(item.docid)"
                      >
                        <div v-if="item.teamid!=0">
                          <TeamFileIcon
                            width="72"
                            height="72"
                            style="margin-bottom:-10px;margin-top:-3px"
                          />
                        </div>
                        <div v-else>
                          <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                        </div>
                        <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.title}}</div>
                        <div style="font-size:12px;color:#9c9c9c">
                          {{item.lastetidtimeString}}
                          <!--a-icon key="ellipsis" type="ellipsis" /-->
                        </div>
                      </a-card>
                      <a-menu slot="overlay" style="width:180px">
                        <a-menu-item key="1" @click="open_doc(item.docid)">
                          <a-icon type="folder-open" />
                          <span style="margin-left:3px">打开</span>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <a-icon type="edit" />
                          <span style="margin-left:3px">重命名</span>
                        </a-menu-item>
                        <a-menu-item key="3">
                          <a-icon type="control" />
                          <span style="margin-left:3px">权限设置</span>
                        </a-menu-item>
                        <a-menu-item key="4" @click="delete_doc(item.docid)">
                          <a-icon type="delete" />
                          <span style="margin-left:3px">删除</span>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="5">
                          <a-icon type="share-alt" />
                          <span style="margin-left:3px">分享</span>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="6" @click="show_doc_info(item)">
                          <a-icon type="share-alt" />
                          <span style="margin-left:3px">详细信息</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
              <a-tab-pane key="2" tab="最近浏览">
                <a-list
                  :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                  :data-source="docs"
                  style="text-align:center;margin:15px auto"
                >
                  <a-list-item
                    slot="renderItem"
                    slot-scope="item"
                    style="text-align:center;margin:15px auto"
                  >
                    <a-dropdown :trigger="['contextmenu']">
                      <a-card
                        :bordered="false"
                        :hoverable="true"
                        style="min-width:240px;max-width:240px;text-align:center"
                        :docid="item.docid"
                        @click="open_doc(item.docid)"
                      >
                        <div v-if="item.teamid!=0">
                          <TeamFileIcon
                            width="72"
                            height="72"
                            style="margin-bottom:-10px;margin-top:-3px"
                          />
                        </div>
                        <div v-else>
                          <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                        </div>
                        <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.title}}</div>
                        <div style="font-size:12px;color:#9c9c9c">
                          {{item.lastetidtimeString}}
                          <!--a-icon key="ellipsis" type="ellipsis" /-->
                        </div>
                      </a-card>
                      <a-menu slot="overlay" style="width:180px">
                        <a-menu-item key="1" @click="open_doc(item.docid)">
                          <a-icon type="folder-open" />
                          <span style="margin-left:3px">打开</span>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <a-icon type="share-alt" />
                          <span style="margin-left:3px">分享</span>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3" @click="show_doc_info(item)">
                          <a-icon type="share-alt" />
                          <span style="margin-left:3px">详细信息</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
              <a-tab-pane key="3" tab="我的收藏">
                <a-list
                  :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                  :data-source="docs"
                  style="text-align:center;margin:15px auto"
                >
                  <a-list-item
                    slot="renderItem"
                    slot-scope="item"
                    style="text-align:center;margin:15px auto"
                  >
                    <a-dropdown :trigger="['contextmenu']">
                      <a-card
                        :bordered="false"
                        :hoverable="true"
                        style="min-width:240px;max-width:240px;text-align:center"
                        :docid="item.docid"
                        @click="open_doc(item.docid)"
                      >
                        <div v-if="item.teamid!=0">
                          <TeamFileIcon
                            width="72"
                            height="72"
                            style="margin-bottom:-10px;margin-top:-3px"
                          />
                        </div>
                        <div v-else>
                          <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                        </div>
                        <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.title}}</div>
                        <div style="font-size:12px;color:#9c9c9c">
                          {{item.lastetidtimeString}}
                          <!--a-icon key="ellipsis" type="ellipsis" /-->
                        </div>
                      </a-card>
                      <a-menu slot="overlay" style="width:180px">
                        <a-menu-item key="1" @click="open_doc(item.docid)">
                          <a-icon type="folder-open" />
                          <span style="margin-left:3px">打开</span>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <a-icon type="share-alt" />
                          <span style="margin-left:3px">分享</span>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3" @click="show_doc_info(item)">
                          <a-icon type="share-alt" />
                          <span style="margin-left:3px">详细信息</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
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
            <a-col :span="18" style="text-align:left">
              <div v-if="!isedit_info" style="font-size:20px;margin-left:24px">
                <span style>{{current_team.teaminfo}}</span>
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
                  v-bind:defaultValue="current_team.teaminfo"
                  enter-button="确定"
                  size="large"
                  @search="change_info"
                  style="margin-left:24px;width:50%"
                />
                <!--这个@search本质上就是click-->
              </div>
            </a-col>
            <a-col :span="3">
              <span style="font-size:20px">团队号：{{current_team.teamid}}</span>
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
                <a-popconfirm
                  placement="bottomRight"
                  title="确定要退出团队吗?"
                  ok-text="确认"
                  cancel-text="算了"
                  @confirm="exitTeam"
                >
                  <a-button v-if="!ismanage" type="primary">
                    <a-icon type="logout" />退出团队
                  </a-button>
                </a-popconfirm>
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
                :data-source="docs"
                style="text-align:center;margin:15px"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                  style="text-align:center;margin:15px"
                >
                  <a-dropdown :trigger="['contextmenu']">
                    <a-card
                      :bordered="false"
                      :hoverable="true"
                      style="min-width:240px;max-width:240px;text-align:center"
                      :docid="item.docid"
                      @click="open_doc(item.docid)"
                    >
                      <div>
                        <TeamFileIcon
                          width="72"
                          height="72"
                          style="margin-bottom:-10px;margin-top:-3px"
                        />
                      </div>
                      <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.title}}</div>
                      <div style="font-size:12px;color:#9c9c9c">
                        {{item.lastetidtimeString}}
                        <!--a-icon key="ellipsis" type="ellipsis" /-->
                      </div>
                    </a-card>
                    <a-menu slot="overlay" style="width:180px">
                      <a-menu-item key="1" @click="open_doc(item.docid)">
                        <a-icon type="folder-open" />
                        <span style="margin-left:3px">打开</span>
                      </a-menu-item>
                      <a-menu-item key="2" v-if="isleader">
                        <a-icon type="edit" />
                        <span style="margin-left:3px">重命名</span>
                      </a-menu-item>
                      <a-menu-item key="3" v-if="isleader">
                        <a-icon type="control" />
                        <span style="margin-left:3px">权限设置</span>
                      </a-menu-item>
                      <a-menu-item key="4" v-if="isleader" @click="delete_doc(item.docid)">
                        <a-icon type="delete" />
                        <span style="margin-left:3px">删除</span>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="5">
                        <a-icon type="share-alt" />
                        <span style="margin-left:3px">分享</span>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="6" @click="show_doc_info(item)">
                        <a-icon type="share-alt" />
                        <span style="margin-left:3px">详细信息</span>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="2" style="text-align:left;margin-right:24px">
              <a-modal v-model="inviteVisible" title="邀请成员" :footer="null">
                <a-input
                  allowClear
                  v-model="memberName"
                  placeholder="请输入成员名称"
                  @change="changeMemberName"
                ></a-input>
                <a-list item-layout="horizontal" :data-source="memberData">
                  <a-list-item slot="renderItem" slot-scope="item" v-if="check_member(item.userid)">
                    <a-row style="margin:12px 48px 12px 28px;width:100%">
                      <a-col :span="22">
                        <a-avatar :size="36" v-if="item.avatar!=null" :src="item.avatar"></a-avatar>
                        <avatar
                          :size="36"
                          inline
                          v-if="item.avatar==null"
                          :username="`${item.username}`"
                        ></avatar>
                        {{ item.username }}
                      </a-col>
                      <a-col :span="2" style="text-align:right">
                        <a-button
                          type="primary"
                          @click="invite_member(item.username)"
                          :disabled="false"
                        >邀请</a-button>
                      </a-col>
                    </a-row>
                  </a-list-item>
                </a-list>
              </a-modal>

              <div style="font-size:20px">团队成员</div>
              <div>
                <a-list item-layout="horizontal" :data-source="team_members">
                  <div slot="header">
                    <a-avatar
                      :size="36"
                      v-if="team_creator.avatar!=null"
                      :src="team_creator.avatar"
                    ></a-avatar>
                    <avatar
                      :size="36"
                      inline
                      v-if="team_creator.avatar==null"
                      :username="`${team_creator.username}`"
                    ></avatar>
                    {{team_creator.username}}
                    <span>
                      <a-icon type="crown" style="font-size:16px;color:#E85A4F" />
                    </span>
                  </div>
                  <a-list-item slot="renderItem" slot-scope="item">
                    <div style="text-align:left">
                      <a-avatar :size="36" v-if="item.avatar!=null" :src="item.avatar"></a-avatar>
                      <avatar
                        :size="36"
                        inline
                        v-if="item.avatar==null"
                        :username="`${item.username}`"
                      ></avatar>
                      {{item.username}}
                    </div>
                    <transition name="slide-fade">
                      <a-popconfirm
                        placement="bottomRight"
                        title="确定要删除该成员吗?"
                        ok-text="确认"
                        cancel-text="算了"
                        @confirm="delete_member(item.username)"
                      >
                        <a-icon v-if="ismanage" type="delete" />
                      </a-popconfirm>
                    </transition>
                  </a-list-item>

                  <div slot="footer" style="text-align:right">
                    <div style="text-align:right;margin-top:7px">
                      <transition name="slide-fade">
                        <a-button v-if="!ismanage&&isleader" @click="showInviteModal" type="link">
                          <a-icon type="plus" />邀请成员
                        </a-button>
                        <a-button v-if="ismanage&&isleader" type="danger" @click="dismissTeam">
                          <a-icon type="close" />解散团队
                        </a-button>
                      </transition>
                    </div>
                  </div>
                </a-list>
              </div>
            </a-col>
          </a-row>
        </div>
        <div v-if="sider_status==3">
          <!--回收站页面部分-->
          <div style="font-size:40px;text-align:left;margin:48px 0 -24px 48px">
            <b>回收站</b>
          </div>
          <a-row>
            <a-col :span="21"></a-col>
            <a-col :span="3" style="text-align:right">
              <a-popconfirm
                placement="bottomRight"
                title="确定要清空回收站吗?"
                ok-text="确认"
                cancel-text="算了"
                @confirm="emptytrash"
              >
                <a-button size="default" type="default" style="margin-top:50px;margin-right:48px">
                  <a-icon type="delete" />清空回收站
                </a-button>
              </a-popconfirm>
            </a-col>
          </a-row>
          <div style="margin:24px;text-align:center">
            <a-list
              :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
              :data-source="docs"
              style="text-align:center;margin:15px"
            >
              <a-list-item slot="renderItem" slot-scope="item" style="text-align:center">
                <a-dropdown :trigger="['contextmenu']">
                  <a-card
                    :bordered="false"
                    :hoverable="true"
                    style="min-width:240px;max-width:240px;text-align:center"
                    :docid="item.docid"
                  >
                    <div>
                      <a-icon style="font-size:64px;color:#457AD3" type="file-word"></a-icon>
                    </div>
                    <div style="font-size:15px;margin:10px 0 3px 0;color:black">{{item.title}}</div>
                    <div style="font-size:12px;color:#9c9c9c">
                      {{item.lastetidtimeString}}
                      <!--a-icon key="ellipsis" type="ellipsis" /-->
                    </div>
                  </a-card>
                  <a-menu slot="overlay" style="width:180px">
                    <a-menu-item key="1" @click="restore_doc(item.docid)">
                      <a-icon type="redo" />
                      <span style="margin-left:3px">恢复</span>
                    </a-menu-item>
                    <a-menu-item key="2" @click="delete_trash(item.docid)">
                      <a-icon type="delete" />
                      <span style="margin-left:3px">彻底删除</span>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-list-item>
            </a-list>
          </div>
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
import Vue from "vue";
import Avatar from "vue-avatar";
import TeamFileIcon from "../components/TeamFileIcon.vue";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    Avatar,
    TeamFileIcon,
  },
  data() {
    return {
      memberName: "",
      inviteVisible: false,
      createFromTempleteVisible: false,
      createTeamVisible: false,
      openKeys: ["sub1"],
      activeKey: 1,
      teamname: "",
      teaminfo: "",
      docs: [],
      teams: [],
      templates: [],
      current_team: {},
      team_creator: {},
      team_members: [],
      isleader: false,
      ismanage: false,
      sider_status: 1,
      isedit_name: false,
      isedit_info: false,
      current_docid: 0,
      current_doc: {},
      current_tempid: 0,
      memberData: [],
      doc_info_visible: false,
    };
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    },
  },
  updated() {},
  mounted() {
    this.load_team();
    this.load_doc();
    this.load_template();
  },
  methods: {
    load_team() {
      var that = this;
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/team/myTeams",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        console.log(response.data);
        that.teams = response.data.myAttendTeams;
      });
    },
    load_doc() {
      var that = this;
      var type = "";
      if (this.activeKey == "1") {
        type = "creator";
      }
      if (this.activeKey == "2") {
        type = "view";
      }
      if (this.activeKey == "3") {
        type = "fav";
      }
      if (this.sider_status == 3) {
        type = "trash";
      }
      if (this.sider_status != 2) {
        Vue.axios({
          method: "get",
          url: "http://39.106.230.20:8090/document/" + type,
          headers: {
            token: this.$store.state.token,
          },
        }).then(function (response) {
          that.docs = response.data.contents;
        });
      } else {
        Vue.axios({
          method: "get",
          url:
            "http://39.106.230.20:8090/team/" +
            this.current_team.teamid +
            "/documents",
        }).then(function (response) {
          that.docs = response.data.documents;
        });
      }
    },
    load_team_info() {
      var that = this;
      Vue.axios({
        method: "get",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/view",
      }).then(function (response) {
        console.log(response.data);
        that.team_creator = response.data.teamCreator;
        that.team_members = response.data.teamMembers;
        if (that.team_creator.userid == that.$store.state.userid) {
          that.isleader = true;
        } else {
          that.isleader = false;
        }
      });
    },
    load_template() {
      var that = this;
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/template/pub",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        that.templates = response.data.contents;
      });
    },
    chooseTemplate(tempid) {
      this.current_tempid = tempid;
    },
    handleClick(e) {
      console.log("click", e);
      this.stopmanage();
      if (e.key == "doc") {
        this.sider_status = 1;
        this.load_doc();
      }
      if (e.key[0] == "t" && e.key != "trash") {
        this.sider_status = 2;
        var current_teamid = e.key.substring(1);
        for (let index = 0; index < this.teams.length; index++) {
          const element = this.teams[index];
          if (element.teamid == current_teamid) {
            this.current_team = this.teams[index];
          }
        }
        this.load_team_info();
        this.load_doc();
      }
      if (e.key == "trash") {
        this.sider_status = 3;
        this.load_doc();
      }
    },
    tabchange(activeKey) {
      this.activeKey = activeKey;
      this.load_doc();
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
      var that = this;
      Vue.axios({
        method: "post",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/update",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          newTeamname: value,
        },
      }).then(function (response) {
        console.log(response.data);
        that.current_team.teamname = value;
      });
      this.isedit_name = false;
    },
    change_info(value) {
      var that = this;
      Vue.axios({
        method: "post",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/update",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          newTeaminfo: value,
        },
      }).then(function (response) {
        console.log(response.data);
        that.current_team.teaminfo = value;
      });
      this.isedit_info = false;
    },
    exitTeam() {
      var that = this;
      Vue.axios({
        method: "get",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/exit",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("退出团队成功", 1.5).then(() => {
            location.reload();
          });
        } else {
          that.$message.error("退出团队失败", 1.5);
        }
        that.load_team();
      });
    },
    handleRightMenuClick() {},
    delete_member(username) {
      var that = this;
      Vue.axios({
        method: "get",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/deleteMember?deletedname=" +
          username,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("删除成员成功", 1);
          for (let index = 0; index < that.team_members.length; index++) {
            const element = that.team_members[index];
            if (element.username == username) {
              that.team_members.splice(index, 1);
            }
          }
        } else {
          that.$message.error("删除成员失败", 1);
        }
        that.load_team();
      });
    },
    open_doc(docid) {
      this.$router.push({ path: "/doc/" + docid });
    },
    delete_doc(docid) {
      var that = this;
      Vue.axios({
        method: "delete",
        url: "http://39.106.230.20:8090/document/" + docid,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("删除文档成功", 1);
        } else {
          that.$message.error("删除文档失败", 1);
        }
        that.load_doc();
      });
    },
    show_doc_info(doc) {
      var that = this;
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/user/" + doc.creatorid,
      }).then(function (response) {
        doc.createusername = response.data.user.username;
        Vue.axios({
          method: "get",
          url: "http://39.106.230.20:8090/user/" + doc.lastedituserid,
        }).then(function (response) {
          doc.lasteditusername = response.data.user.username;
          that.current_doc = doc;
        });
      });
      this.doc_info_visible = true;
    },
    on_info_Close() {
      this.doc_info_visible = false;
    },
    createDocBTN() {
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/document",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        console.log(response.data.contents.docid);
        if (response.data.success == true) {
          that.$message.success("创建文档成功", 1).then(() => {
            that.$router.push({ path: "/doc/" + response.data.contents.docid });
          });
        } else {
          that.$message.error("创建文档失败", 1);
        }
        that.createTeamVisible = false;
      });
    },
    createTeamDocBTN() {
      var that = this;
      Vue.axios({
        method: "post",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/createDocument",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        console.log(response.data.teamDocument.docid);
        if (response.data.success == true) {
          that.$message.success("创建文档成功", 1).then(() => {
            that.$router.push({
              path: "/doc/" + response.data.teamDocument.docid,
            });
          });
        } else {
          that.$message.error("创建文档失败", 1);
        }
        that.createTeamVisible = false;
      });
    },
    createFromTempleteBTN() {
      this.createFromTempleteVisible = true;
      this.current_team = null;
    },
    createFromTempleteTeamBTN() {
      this.createFromTempleteVisible = true;
    },
    createFromTemplete() {
      if (this.current_tempid == 0) {
        this.$message.error("请选择模板", 1);
        return;
      }
      var url = "";
      if (this.current_team == null) {
        url =
          "http://39.106.230.20:8090/document/template/" + this.current_tempid;
      } else {
        url =
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/createDocument/template/" +
          this.current_tempid;
      }
      var that = this;
      Vue.axios({
        method: "post",
        url: url,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("创建文档成功", 1).then(() => {
            if (that.current_team == null) {
              that.$router.push({ path: "/doc/" + response.data.contents.docid });
            }
            else{
              that.$router.push({ path: "/doc/" + response.data.teamDocument.docid });
            }
          });
        } else {
          that.$message.error("创建文档失败", 1);
        }
        that.createFromTempleteVisible = false;
      });
    },
    createTeamBTN() {
      this.createTeamVisible = true;
    },
    createteam() {
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/team/create",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          teamname: this.teamname,
          teaminfo: this.teaminfo,
        },
      }).then(function (response) {
        console.log(response.data);
        if (response.data.success == true) {
          that.$message.success("创建团队成功", 1.5).then(() => {
            location.reload();
          });
        } else {
          that.$message.error("创建团队失败", 1.5);
        }
        that.createTeamVisible = false;
      });
    },
    changeMemberName() {
      if (this.memberName != "") {
        var that = this;
        Vue.axios({
          method: "post",
          url: "http://39.106.230.20:8090/user/fuzSearch",
          headers: {
            token: this.$store.state.token,
          },
          data: {
            username: this.memberName,
          },
        }).then(function (response) {
          that.memberData = response.data.contents;
        });
      } else {
        this.memberData = [];
      }
    },
    check_member(userid) {
      if (userid == this.$store.state.userid) {
        return false;
      }
      for (const user of this.team_members) {
        if (user.userid == userid) {
          return false;
        }
      }
      return true;
    },
    invite_member(username) {
      var that = this;
      Vue.axios({
        method: "get",
        url:
          "http://39.106.230.20:8090/team/" +
          this.current_team.teamid +
          "/inviteMember",
        headers: {
          token: that.$store.state.token,
        },
        params: {
          inviteename: username,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("邀请已发送", 1);
        } else {
          that.$message.error("邀请失败", 1);
        }
        that.load_team_info();
      });
    },
    dismissTeam() {
      var that = this;
      this.$confirm({
        title: "确定要解散团队吗?",
        content: "解散后团队文档将成为文档创建者的个人文档",
        okText: "解散",
        okType: "danger",
        cancelText: "算了",
        onOk() {
          Vue.axios({
            method: "get",
            url:
              "http://39.106.230.20:8090/team/" +
              that.current_team.teamid +
              "/deleteTeam",
            headers: {
              token: that.$store.state.token,
            },
          }).then(function (response) {
            if (response.data.success == true) {
              that.$message.success("解散团队成功", 1.5).then(() => {
                location.reload();
              });
            } else {
              that.$message.error("解散团队失败", 1.5);
            }
            that.load_team();
          });
        },
        onCancel() {},
      });
    },
    restore_doc(docid) {
      var that = this;
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/document/recover/" + docid,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("恢复成功", 1).then(() => {});
        } else {
          that.$message.error("恢复失败", 1);
        }
        that.load_doc();
      });
    },
    delete_trash(docid) {
      var that = this;
      this.$confirm({
        title: "确定永久删除该文档吗?",
        content: "文档将无法恢复",
        okText: "删除",
        okType: "danger",
        cancelText: "算了",
        onOk() {
          Vue.axios({
            method: "delete",
            url: "http://39.106.230.20:8090/document/permanent/" + docid,
            headers: {
              token: that.$store.state.token,
            },
          }).then(function (response) {
            if (response.data.success == true) {
              that.$message.success("删除成功", 1.5).then(() => {});
            } else {
              that.$message.error("删除失败", 1.5);
            }
            that.load_doc();
          });
        },
        onCancel() {},
      });
    },
    emptytrash() {
      var that = this;
      Vue.axios({
        method: "delete",
        url: "http://39.106.230.20:8090/document/permanent/all",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("清空回收站成功", 1.5).then(() => {});
        } else {
          that.$message.error("清空回收站失败", 1.5);
        }
        that.load_doc();
      });
    },
    showInviteModal() {
      this.inviteVisible = true;
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