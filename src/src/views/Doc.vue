<template>
    <div style="text-align:center">
        <div style="margin:24px 48px 0 0;text-align:right">
            <a-button style="margin-right:24px"><a-icon type="safety"/>团队权限</a-button>
            <a-popover placement="bottomLeft" trigger="click">
                <template slot="content" style="text-align:right">
                    <div>
                        <a-checkbox>仅查看</a-checkbox>
                        <a-checkbox>可读写</a-checkbox>
                    </div>
                
                    <a-button style="margin:24px 10px 10px 0px">创建分享链接</a-button>
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
