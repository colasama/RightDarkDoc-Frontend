<template>
    <div style="text-align:center;background:#FAFAFA">
        <div class="subNavi">
            <a-row>
                <a-col :span="15">
                    <div style="margin:8px 0 0 128px;text-align:left">
                        <a-icon type="arrow-left" class="returnNarrow"/>
                        <span style="font-size:24px;margin-right:5px"><b>{{title}}</b></span>
                        <a-popover placement="bottom" >
                            <template slot="content">
                                点击即可收藏文档哦~
                            </template>
                            <a-rate :default-value="0" count="1" 
                            style="margin:0px 0 5px 5px;font-size:24px;" />
                            <!--↑说起来你可能不信，但是这个可以当按钮来用-->
                        </a-popover>
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
                            <a-button @click="openShare"><a-icon type="share-alt"/>分享</a-button>
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
                    @change="textChange" 
                    style="min-height:1600px;z-index:0"

                />

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
</style>
<script>
  //import InEditor from '@/components/InEditor'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
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
        title:'我不做人啦',
        edittime:"2020.08.13 20:15",
        editcount:5,
      }
    },
    methods:{
        textChange(value,render){
            this.html = render;
        },
        test(){
            console.log(this.html)
        },
        toWorkshop(){

        }
    },
    
  }
</script>
