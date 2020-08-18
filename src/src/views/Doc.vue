<template>
  <div style="text-align:center;background:#FAFAFA">
    <div class="subNavi">
      <a-row>
        <a-col :span="15">
          <div style="margin:8px 0 0 128px;text-align:left">
            <a-icon @click="toWorkshop" type="arrow-left" class="returnNarrow" />
            <a-popover placement="bottom">
              <template slot="content">点击即可收藏文档哦~</template>
              <a-rate
                @change="judgeFav"
                :count="1"
                :value="isFav"
                style="margin:0px 0 5px 5px;font-size:24px;"
              />
              <!--↑说起来你可能不信，但是这个可以当按钮来用-->
            </a-popover>
            <!--span style="font-size:24px;margin-right:5px">{{title}}</span-->
            <span style="font-size:24px;margin-right:5px">
              <b>
                <a-input
                  v-model="title"
                  size="large"
                  style="border:0;width:200px;background:#FAFAFA;font-size:18px"
                />
              </b>
            </span>
            <span style="margin-left:5px">上次修改时间是{{lastetidtimeString}}，共计修改了{{editcount}}次。</span>
          </div>
        </a-col>
        <a-col :span="3"></a-col>
        <a-col :span="6">
          <div style="margin:11px 48px 0 0;text-align:right">
            <a-popover placement="bottomLeft" trigger="click">
              <template slot="content" style="text-align:right">
                <div style="margin-top:12px">团队权限设置</div>
                <div style="margin-top:5px">
                  <a-radio-group
                    style="margin-bottom:12px"
                    v-model="tempteamauth"
                    @change="onTeamAuthChange"
                  >
                    <a-radio-button :value="1">仅查看</a-radio-button>
                    <a-radio-button :value="3">可讨论</a-radio-button>
                    <a-radio-button :value="7">可编辑</a-radio-button>
                  </a-radio-group>
                </div>
              </template>
              <a-button style="margin-right:24px" v-if="teamid!=0&&isteamauth">
                <a-icon type="safety" />团队权限
              </a-button>
            </a-popover>
            <a-popover placement="bottomLeft" trigger="click">
              <template slot="content" style="text-align:center">
                <div style="margin-top:12px">权限设置</div>
                <div style="margin-top:5px;text-align:center" v-if="creatorid==$store.state.userid">
                  <a-radio-group v-model="tempauth" @change="onAuthChange">
                    <a-radio-button :value="1">仅查看</a-radio-button>
                    <a-radio-button :value="3">可讨论</a-radio-button>
                    <a-radio-button :value="7">可编辑</a-radio-button>
                  </a-radio-group>
                </div>
                <div style="margin-top:12px" v-if="tempauth!=0">
                  <div>分享链接</div>
                  <a-input-search
                    :value="pagePath"
                    @search="onShareCopy"
                    style="margin-top:5px;width:220px"
                    disabled
                  >
                    <a-button
                      class="tag-read"
                      v-clipboard:copy="pagePath"
                      v-clipboard:success="onShareCopy"
                      v-clipboard:error="onShareCopyError"
                      @click="onShareCopy"
                      slot="enterButton"
                    >复制</a-button>
                  </a-input-search>
                </div>
                <div v-if="tempauth!=0" style="text-align:center;margin:12px;">
                  <qrcode :value="pagePath" :options="{ size: 120 }"></qrcode>
                </div>
                <div style="text-align:center">
                  <a-button
                    style="margin:0px 10px 10px 0px"
                    @click="stopShare"
                    v-if="creatorid==$store.state.userid"
                  >停止分享</a-button>
                </div>
              </template>
              <a-button>
                <a-icon type="share-alt" />分享
              </a-button>
            </a-popover>
            <!--a-button @click="test" ><a-icon type="save"/>TEST_测试</a-button-->
          </div>
        </a-col>
      </a-row>
    </div>

    <div style="text-align:center">
      <a-row>
        <a-col :span="5">
          <a-timeline style="width:260px;margin:64px">
            <a-timeline-item
              v-for="item in editrecord"
              :key="item.edittime"
            >{{item.userid}}于{{item.edittimestring}}编辑</a-timeline-item>
          </a-timeline>
        </a-col>
        <a-col :span="14">
          <div class="text-editor">
            <mavon-editor
              v-bind:editable="iseditable"
              :subfield="iseditable"
              :toolbarsFlag="iseditable"
              defaultOpen="preview"
              v-model="content"
              ref="md"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
              @save="saveDoc"
              @change="textChange"
              style="min-height:1000px;z-index:0"
            />
          </div>
        </a-col>
        <a-col :span="5">
          <div>
            <div style="margin:48px">
              <a-list
                class="commentList"
                :header="`${data.length}个评论`"
                item-layout="horizontal"
                :data-source="data"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-comment>
                    <p slot="author" @click="toUserInfo(item.comment.userid)">{{item.username}}</p>
                    <a-avatar
                      slot="avatar"
                      :src="item.avatar"
                      @click="toUserInfo(item.comment.userid)"
                    />
                    <p slot="content">{{ item.comment.content }}</p>
                    <a-tooltip
                      slot="datetime"
                      :title="item.comment.commenttime.format('YYYY-MM-DD HH:mm:ss')"
                    >
                      <span>{{ item.comment.commenttime.fromNow() }}</span>
                    </a-tooltip>
                  </a-comment>
                  <a-button
                    v-if="userinfo.userid === item.comment.userid || userinfo.userid === creatorid"
                    type="primary"
                    size="small"
                    @click="handleDeleteComment(item)"
                  >删除</a-button>
                  <!-- 如果item的评论者或者该文档的所有者的userid 等于 当前userid，则该评论可删除 -->
                </a-list-item>
              </a-list>
              <a-row v-if="iscommentable">
                <a-col :span="4">
                  <div style="text-align:left">
                    <a-avatar slot="avatar" :src="userinfo.avatar" :alt="userinfo.username" />
                  </div>
                </a-col>
                <a-col :span="20" style="text-align:left;margin-bottom:-12px">
                  <div>
                    <a
                      style="margin:12px 0 0 0px;font-size:16px;padding-top:10px"
                      href="#/profile"
                    >{{userinfo.username}}</a>
                  </div>
                  <div style="font-size:12px;margin-left:0px">{{userinfo.description}}</div>
                </a-col>
              </a-row>

              <a-comment class="addComment" v-if="iscommentable">
                <div slot="content">
                  <a-form-item>
                    <a-textarea :rows="4" :value="comment" @change="handleChange" />
                  </a-form-item>
                  <a-form-item style="text-align:right">
                    <a-button html-type="submit" type="primary" @click="handleSubmitComment">评论</a-button>
                  </a-form-item>
                </div>
              </a-comment>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<style>
.text-editor {
  width: 1100px;
  background: #ffffff;
  margin: 24px auto;
}

.text-editor2 {
  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
}

.subNavi {
  width: 100%;
  height: 56px;
  background: #fafafa;
  border-bottom: 1px rgb(236, 236, 236) solid;
}

.returnNarrow {
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.commentBox {
  width: 300px;
  margin: 24px auto;
  background: #ffffff;
  border: 1px hsl(0, 0%, 92.7%) solid;
  border-radius: var(--ck-border-radius);
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
}
</style>
<script>
//import InEditor from '@/components/InEditor'
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Vue from "vue";
import moment from "moment";
import Qrcode from "@chenfengyuan/vue-qrcode";

export default {
  name: "Doc",
  components: {
    //InEditor,
    mavonEditor,
    qrcode: Qrcode,
  },
  data() {
    return {
      pagePath: window.location.href,
      tempauth: 0,
      tempteamauth: 1,
      submenuCurrent: "",
      groupAuthValue: 0,
      personAuthValue: 0,
      content: "", //输入的Markdown
      old_content: "",
      html: "", //渲染的html文件
      title: "Untitled",
      lastetidtimeString: "",
      creatorid: 0,
      editcount: 0,
      teamauth: 0,
      auth: 0,
      isTeammember: false,
      iseditable: false,
      iscommentable: false,
      isteamauth: false,
      teamid: 0,
      docid: this.$route.params.id,
      istrash: 0,
      isFav: 1,
      editrecord: [],
      // data - comment list, userinfo - 当前用户信息, value - 新评论
      data: [],
      userinfo: {},
      comment: "",
    };
  },
  methods: {
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      Vue.axios({
        url: "http://182.92.57.178:5000/pictures/add",
        method: "post",
        data: formdata,
        //headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, url.data.url);
        console.log(url.data.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    textChange(value, render) {
      this.html = render;
    },
    getDoc() {
      var that = this;
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/document/" + this.$route.params.id,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        console.log(response.data);
        that.title = response.data.contents.title;
        that.content = response.data.contents.content;
        that.old_content = response.data.contents.content;
        that.lastetidtimeString = response.data.contents.lastetidtimeString;
        that.editcount = response.data.contents.editcount;
        that.auth = response.data.contents.auth;
        that.teamauth = response.data.contents.teamauth;
        that.createtime = response.data.contents.createtime;
        that.docid = response.data.contents.docid;
        that.creatorid = response.data.contents.creatorid;
        that.istrash = response.data.contents.istrash;
        that.teamid = response.data.contents.teamid;
        that.isTeammember = response.data.isTeammember;
        that.tempauth = that.auth;
        that.tempteamauth = that.teamauth;
        if (that.creatorid == that.$store.state.userid) {
          that.iseditable = true;
          that.iscommentable = true;
        }
        if (that.auth >= 3 || (that.teamauth >= 3 && that.isTeammember)) {
          that.iscommentable = true;
        }
        if (that.auth >= 7 || (that.teamauth >= 7 && that.isTeammember)) {
          that.iseditable = true;
        }
        if (that.$store.state.userid == null) {
          that.iscommentable = false;
          that.iseditable = false;
        }
        if (that.teamid != 0) {
          if (that.creatorid == that.$store.state.userid) {
            that.isteamauth == true;
          }
          Vue.axios({
            method: "get",
            url: "http://39.106.230.20:8090/team/" + that.teamid + "/view",
          }).then(function (res) {
            if (res.data.teamCreator.userid == that.$store.state.userid) {
              that.isteamauth = true;
              that.iscommentable = true;
              that.iseditable = true;
            } else {
              that.isteamauth = false;
            }
          });
        }
      });
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/document/fav/" + this.$route.params.id,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        if (response.data.isFav == true) {
          that.isFav = 1;
        } else {
          that.isFav = 0;
        }
      });
    },
    getRecord(docid) {
      var that = this;
      Vue.axios({
        method: "get",
        url: " http://39.106.230.20:8090/document/" + docid + "/editRecord",
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (response) {
        that.editrecord = response.data.docRecord;
        for (let index = 0; index < that.editrecord.length; index++) {
          const element = that.editrecord[index];
          Vue.axios({
            method: "get",
            url: " http://39.106.230.20:8090/user/" + element.userid,
          }).then(function (res) {
            that.editrecord[index].userid = res.data.user.username;
          });
        }
      });
    },
    test() {
      console.log(this.html);
    },
    toWorkshop() {
      this.$router.push({ path: "/" });
      location.reload();
    },
    saveDoc() {
      var that = this;
      //检测云端版本
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/document/" + this.$route.params.id,
        headers: {
          token: this.$store.state.token,
        },
      }).then(function (res) {
        if (that.old_content == res.data.contents.content) {
          Vue.axios({
            method: "put",
            url: "http://39.106.230.20:8090/document/",
            headers: {
              token: that.$store.state.token,
            },
            data: {
              docid: that.docid,
              title: that.title,
              content: that.content,
              lastedituserid: that.$store.state.userid,
              auth: that.auth,
              teamauth: that.teamauth,
              istrash: that.istrash,
            },
          }).then(function (response) {
            console.log(response.data);
            if (response.data.success == true) {
              that.$message.success("保存成功！", 1.5);
              that.old_content = that.content;
            } else {
              that.$message.error("保存失败！", 1.5);
            }
          });
        } else {
          that.$message.error(
            "云端版本已更新，保存失败，请刷新页面再试（请注意保存当前的编辑）",
            5
          );
        }
      });
    },
    judgeFav() {
      if (this.isFav == 1) {
        this.delFav();
      } else this.addFav();
    },
    addFav() {
      console.log("Faving...Now:" + this.isFav);
      var that = this;
      Vue.axios({
        method: "post",
        url: "http://39.106.230.20:8090/document/fav",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          docid: this.docid,
        },
      }).then(function (response) {
        console.log(response.data);
        if (response.data.success == true) {
          that.$message.success("收藏成功", 1.5);
          that.isFav = 1;
        } else {
          that.$message.error("竟然收藏失败了？！", 1.5);
        }
      });
    },
    delFav() {
      console.log("Faving...Now:" + this.isFav);
      var that = this;
      Vue.axios({
        method: "delete",
        url: "http://39.106.230.20:8090/document/fav",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          docid: this.docid,
        },
      }).then(function (response) {
        console.log(response.data);
        if (response.data.success == true) {
          that.$message.success("成功取消收藏", 1.5);
          that.isFav = 0;
        } else {
          that.$message.error("竟然取消收藏失败了？！", 1.5);
        }
      });
    },
    onAuthChange() {
      var that = this;
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/document/mod_auth",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          docid: this.docid,
          auth: this.tempauth,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("权限更改成功！", 1);
          that.auth = that.tempauth;
        } else {
          that.$message.error("权限更改失败！", 1);
        }
      });
    },
    onTeamAuthChange() {
      var that = this;
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/document/mod_teamauth",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          docid: this.docid,
          teamauth: this.tempteamauth,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("权限更改成功！", 1);
          that.teamauth = that.tempteamauth;
        } else {
          that.$message.error("权限更改失败！", 1);
        }
      });
    },
    stopShare() {
      this.tempauth = 0;
      var that = this;
      Vue.axios({
        method: "put",
        url: "http://39.106.230.20:8090/document/mod_auth",
        headers: {
          token: this.$store.state.token,
        },
        data: {
          docid: this.docid,
          auth: 0,
        },
      }).then(function (response) {
        if (response.data.success == true) {
          that.$message.success("已停止共享！", 1);
          that.auth = that.tempauth;
        } else {
          that.$message.error("权限更改失败！", 1);
        }
      });
    },
    // comment
    getInfo() {
      Vue.axios({
        method: "get",
        url: "http://39.106.230.20:8090/user/info",
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        this.userinfo = response.data;
      });
    },
    toUserInfo(userid) {
      this.$router.push({ path: "/userinfo/" + userid });
    },
    getCommentList() {
      Vue.axios({
        method: "get",
        url: `http://39.106.230.20:8090/document/${this.docid}/comments`,
      }).then((response) => {
        const {
          commentsAndUsernameAndAvatar,
          success,
          message,
        } = response.data;
        this.data = commentsAndUsernameAndAvatar;
        this.data.forEach(
          (x) => (x.comment.commenttime = moment(x.comment.commenttimestring))
        );
        if (success == false) {
          this.$message.error(message, 1.5);
        }
      });
    },
    handleSubmitComment() {
      Vue.axios({
        method: "post",
        url: `http://39.106.230.20:8090/document/${this.docid}/createComment`,
        data: {
          content: this.comment,
        },
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        const { success, message } = response.data;
        if (success == true) {
          this.comment = "";
          this.$message.success(message, 1.5);
        } else {
          this.$message.error(message, 1.5);
        }
        this.getCommentList();
      });
    },
    handleDeleteComment(item) {
      console.log(item);
      Vue.axios({
        method: "get",
        url: `http://39.106.230.20:8090/document/${item.comment.docid}/comment/${item.comment.comid}/delete`,
        headers: {
          token: this.$store.state.token,
        },
      }).then((response) => {
        const { success, message } = response.data;
        if (success == true) {
          this.$message.success(message, 1.5);
        } else {
          this.$message.error(message, 1.5);
        }
        this.getCommentList();
      });
    },
    onShareCopy(e) {
      this.$message.success("成功复制链接~", 1);
      console.log(e);
    },
    onShareCopyError(e) {
      this.$message.error("复制链接失败！", 1);
      console.log(e);
    },
    handleChange(e) {
      this.comment = e.target.value;
    },
  },
  created: function () {
    this.getDoc();
    this.getRecord(this.$route.params.id);
  },
  mounted() {
    this.getInfo();
    this.getCommentList();
  },
};
</script>
