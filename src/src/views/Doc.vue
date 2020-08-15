<template>
    <div style="text-align:center;background:#FAFAFA">      
        <div class="subNavi">
            <a-row>
                <a-col :span="15">
                    <div style="margin:8px 0 0 128px;text-align:left">
                        <a-icon @click="toWorkshop" type="arrow-left" class="returnNarrow"/>
                        <a-popover placement="bottom" >
                            <template slot="content">
                                点击即可收藏文档哦~
                            </template>
                            <a-rate @change="judgeFav" count="1" :value="isFav"
                            style="margin:0px 0 5px 5px;font-size:24px;" />
                            <!--↑说起来你可能不信，但是这个可以当按钮来用-->
                        </a-popover>
                        <!--span style="font-size:24px;margin-right:5px">{{title}}</span-->
                        <span style="font-size:24px;margin-right:5px"><b>
                        <a-input v-model="title"
                            size="large"
                            style="border:0;width:200px;background:#FAFAFA;font-size:18px"
                        /></b>
                        </span>
                        <span style="margin-left:5px">
                            上次修改时间是{{edittime}}，共计修改了{{editcount}}次。
                            </span>
                    </div>
                    
                </a-col>
                <a-col :span="3">

                </a-col>
                <a-col :span="6">
                    <div style="margin:11px 48px 0 0;text-align:right">
                        <a-popover placement="bottomLeft" trigger="click">
                            <template slot="content" style="text-align:right">
                                <div style="margin-top:12px">
                                    <a-radio-group v-model="groupAuthValue" @change="onChange">
                                        <a-radio :value="1">
                                            允许团队查看
                                        </a-radio>
                                        <a-radio :value="2">
                                            允许团队编辑
                                        </a-radio>
                                    </a-radio-group>
                                    <a-divider style="margin-top:24px;margin-bottom:10px"/>
                                    <a-radio style="margin-bottom:0px">允许团队评论</a-radio>
                                </div>
                                <div style="text-align:right">
                                    <a-button style="margin:24px 10px 10px 0px">取消</a-button>
                                    <a-button type="primary" style="margin:24px 10px 10px 0px">确认</a-button>
                                </div>    
                            </template>
                            <a-button style="margin-right:24px"><a-icon type="safety"/>团队权限</a-button>
                        </a-popover>
                        <a-popover placement="bottomLeft" trigger="click">
                            <template slot="content">
                                <div style="margin-top:12px" >
                                    <!--div>
                                        <a-switch size="small" style="margin:-2px 5px 0 0"/>
                                        <span >是否公开</span>
                                    </div>
                                    <a-divider style="margin-top:24px;margin-bottom:10px"/-->
                                    <a-radio-group style="margin-top:12px" v-model="personAuthValue" @change="onChange">
                                        <a-radio :value="1">
                                            允许查看
                                        </a-radio>
                                        <a-radio :value="2">
                                            允许编辑
                                        </a-radio>
                                    </a-radio-group>
                                    <a-divider style="margin-top:24px;margin-bottom:10px"/>
                                    <a-radio style="margin-bottom:0px">允许评论</a-radio>
                                </div>
                                <div style="text-align:right">
                                    <a-button style="margin:24px 10px 10px 0px">停止分享</a-button>
                                    <a-button type="primary" style="margin:24px 10px 10px 0px">分享链接</a-button>
                                </div>
                                
                            </template>
                            <a-button><a-icon type="share-alt"/>分享</a-button>
                        </a-popover>
                        <!--a-button @click="test" ><a-icon type="save"/>TEST_测试</a-button-->
                    </div>
                </a-col>
            </a-row>
        </div>
        
        <div style="text-align:center">
            <div class="text-editor">
                <!--InEditor :editor="s1" :value="s2"></InEditor-->
                <mavon-editor 
                    v-model="content" 
                    ref="md"
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
                    @save="saveDoc"
                    @change="textChange" 
                    style="min-height:1600px;z-index:0"
                />
            </div>
        </div>
        
        <div class="commentBox">
            <div style="margin:48px">
                <a-list class="commentList" :header="`${data.length} replies`" item-layout="horizontal" :data-source="data">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-comment :author="item.username" :avatar="item.avatar">
                        <p slot="content">{{ item.content }}</p>  
                        </a-comment>
                        <a-button 
                            v-if="userinfo.userid === item.userid || userinfo.userid === creatorid" 
                            type="primary"
                            @click="handleDeleteComment(item)">
                            删除
                        </a-button>
                        <!-- 如果item的评论者或者该文档的所有者的userid 等于 当前userid，则该评论可删除 -->
                    </a-list-item>
                </a-list>
                <a-comment class="addComment">
                    <a-avatar slot="avatar" :src="userinfo.avatar" :alt="userinfo.username" />
                    <div slot="content">
                        <a-form-item>
                            <a-textarea :rows="4" :value="comment" @change="handleChange" />
                        </a-form-item>
                        <a-form-item>
                            <a-button html-type="submit" type="primary" @click="handleSubmitComment">
                                添加评论
                            </a-button>
                        </a-form-item>
                    </div>
                </a-comment>
            </div>
        </div>
    </div>
</template>
<style>
    .text-editor{
        width:1200px;
        background:#FFFFFF;
        margin: 24px auto;
    }

    .text-editor2{
        border: 1px hsl( 0,0%,82.7% ) solid;
        border-radius: var(--ck-border-radius);
        box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
    }

    .subNavi{
         width:100%;
         height:56px;
         background:#FAFAFA;
         border-bottom: 1px rgb(236, 236, 236) solid;
    }

    .returnNarrow{
        font-size:20px;
        margin-right:10px;
        cursor:pointer;
    }

    .commentBox{
        width:1200px;
        margin:24px auto;
        background:#FFFFFF;
        border: 1px hsl( 0,0%,92.7% ) solid;
        border-radius: var(--ck-border-radius);
        box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
    }

</style>
<script>
  //import InEditor from '@/components/InEditor'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import Vue from "vue"
  const data = [{
      username: '1',
      avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3669125061,4091191473&fm=26&gp=0.jpg',
      content: '这是一条评论'
  }, {
      username: '2',
      avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2556005214,1106499338&fm=26&gp=0.jpg',
      content: '这是第二条评论'
  }]
  export default {
    name: 'Doc',
    components: {
      //InEditor,
      mavonEditor
    },
    data() {
      return {
        submenuCurrent: '',
        groupAuthValue: 0,
        personAuthValue: 0,
        content:'',//输入的Markdown
        html:'',//渲染的html文件
        title:'Untitled',
        edittime:'',
        createtime:'',
        creatorid:0,
        editcount:0,
        teamauth:0,
        auth:0,
        docid:this.$route.params.id,
        istrash:0,
        isFav:1,
        // data - comment list, userinfo - 当前用户信息, value - 新评论
        data,
        userinfo: {},
        comment: ''
      }
    },
    methods:{
        $imgAdd(pos,$file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           Vue.axios({
               url: 'http://182.92.57.178:5000/pictures/add',
               method: 'post',
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
               console.log(url.data.url)
           })
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        textChange(value,render){
            this.html = render;
        },
        test(){
            console.log(this.html)
        },
        toWorkshop(){
            this.$router.push({path:"/"});
        },
        saveDoc(){
            console.log("Saving...")
            var that = this;
            Vue.axios({
                method: "put",
                url: "http://39.106.230.20:8090/document/",
                headers: {
                    token: this.$store.state.token,
                },
                data: {
                    docid: this.docid,
                    title: this.title,
                    content: this.content,
                    creattime:'2020-08-12T14:53:55.800+00:00',
                    lastedittime:'2020-08-12T14:53:55.800+00:00',
                    editcount:this.editcount,
                    lastedituserid: this.$store.state.userid,
                    auth:this.auth,
                    teamauth:this.teamauth,
                    creatorid:this.creatorid,
                    istrash:this.istrash,
                },
            }).then(function (response) {
                console.log(response.data);
                if (response.data.success == true) {
                that.$message.success("保存成功！", 1.5);
                } else {
                that.$message.error("保存失败！", 1.5);
                }
            });
        },
        judgeFav(){
            if(this.isFav==1){
                this.delFav();
            }
            else
                this.addFav();
        },
        addFav(){
            console.log("Faving...Now:"+this.isFav)
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
                    that.isFav=1;
                } else {
                that.$message.error("竟然收藏失败了？！", 1.5);
                }
            });
        },
        delFav(){
            console.log("Faving...Now:"+this.isFav)
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
                    that.isFav=0;
                } else {
                that.$message.error("竟然取消收藏失败了？！", 1.5);
                }
            });
        },

        // comment
        getInfo() {
            Vue.axios({
                method: 'get',
                url: 'http://39.106.230.20:8090/user/info',
                headers: {
                token: this.$store.state.token,
                },
            }).then(response => {
                console.log(response.data)
                this.userinfo = response.data
            })
        },
        getCommentList() {
            Vue.axios({
                method: 'get',
                url: `http://localhost:8090/document/${this.docid}/comments`
            }).then(response => {
                console.log(response.data)
                this.data = response.data
            })
        },
        handleSubmitComment() {

        },
        handleDeleteComment(item) {
            Vue.axios({
                method: 'get',
                url: `http://localhost:8090/document/${this.docid}/comment/${item.comid}/delete`
            }).then(response => {
                this.$message.success('删除成功', 1.5)
            })
        },
        handleChange(e) {
            this.comment = e.target.value
        }
    },
    created: function(){
        var that = this;
        Vue.axios({
            method: "get",
            url: "http://39.106.230.20:8090/document/"+this.$route.params.id,
            headers: {
            token: this.$store.state.token,
            },
        }).then(function (response) {
            console.log(response)
            that.title=response.data.contents.title;
            that.content=response.data.contents.content;
            that.edittime=response.data.contents.edittime;
            that.editcount=response.data.contents.editcount;
            that.auth=response.data.contents.auth;
            that.teamauth=response.data.contents.teamauth;
            that.createtime=response.data.contents.createtime;
            that.docid=response.data.contents.docid;
            that.creatorid=response.data.contents.creatorid;
            this.istrash=response.data.contents.istrash;
        });
        Vue.axios({
            method: "get",
            url: "http://39.106.230.20:8090/document/fav/"+this.$route.params.id,
            headers: {
                token: this.$store.state.token,
            },
        }).then(function (response) {
            console.log(response.data.isFav)
            if(response.data.isFav==true){
                that.isFav=1;
            }
            else{
                that.isFav=0;
            }
            console.log("okay")
        });
    },
  }
</script>
