<template>
    <div style="text-align:center;background:#FAFAFA">
        <div style="margin:24px 48px 0 0;text-align:right">
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
                        <a-radio-group v-model="personAuthValue" @change="onChange">
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
                        <a-button type="primary" style="margin:24px 10px 10px 0px">分享链接</a-button>
                    </div>
                    
                </template>
                <a-button @click="openShare"><a-icon type="share-alt"/>分享</a-button>
            </a-popover>
        </div>
        <div style="text-align:center">
            <div class="text-editor">
                <InEditor :editor="s1" :value="s2"></InEditor>
            </div>
        </div>
        
        
    </div>
</template>
<style>
    .text-editor{
        width:1200px;
        background:#FFFFFF;
        margin: 24px auto;
        height:1200px;
        border: 1px hsl( 0,0%,82.7% ) solid;
        border-radius: var(--ck-border-radius);
        box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
    }
</style>
<script>
  import InEditor from '@/components/InEditor'

  export default {
    name: 'Doc',
    components: {
      InEditor
    },
    data() {
      return {
        groupAuthValue: 0,
        personAuthValue: 0,
      }
    }
  }
</script>
