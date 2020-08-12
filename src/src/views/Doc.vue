<template>
    <div style="text-align:center">
        <div style="margin:24px 48px 0 0;text-align:right">
            <a-popover placement="bottomLeft" trigger="click">
                <template slot="content" style="text-align:right">
                    <div style="margin-top:10px">
                        <a-input placeholder="https://asasaasd"/>
                        
                        <a-checkbox>团队仅查看</a-checkbox>
                        <a-checkbox>团队可编辑</a-checkbox>
                        <a-divider style="margin-top:10px;margin-bottom:10px"/>
                        <a-checkbox style="margin-bottom:-10px">允许团队评论</a-checkbox>
                    </div>
                
                    <a-button style="margin:24px 10px 10px 0px">确认</a-button>
                </template>
                <a-button style="margin-right:24px"><a-icon type="safety"/>团队权限</a-button>
            </a-popover>
            <a-popover placement="bottomLeft" trigger="click">
                <template slot="content" style="text-align:right">
                    <div>
                        <a-checkbox>仅查看</a-checkbox>
                        <a-checkbox>可编辑</a-checkbox>
                        <a-divider style="margin-top:10px;margin-bottom:10px"/>
                        <a-checkbox style="margin-bottom:-10px">确认</a-checkbox>
                    </div>
                
                    <a-button style="margin:24px 10px 10px 0px">分享链接</a-button>
                </template>
                <a-button @click="openShare"><a-icon type="share-alt"/>分享</a-button>
            </a-popover>
        </div>
        <div style="width:1200px;text-align:center">
            <InEditor :editor="s1" :value="s2"></InEditor>
        </div>
        
    </div>
</template>

<script>
  import InEditor from '@/components/InEditor'

  export default {
    name: 'Doc',
    components: {
      InEditor
    },
    data() {
      return {
        s1: '1234',
        s2: '5678'
      }
    }
  }
</script>
