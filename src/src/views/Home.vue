<template>
  <div class="home">
    <a-menu
      style="width: 256px;height:100%;text-align:left;"
      :default-selected-keys="['1']"
      :open-keys.sync="openKeys"
      mode="inline"
      @click="handleClick"
    >
      <a-button size="large" type="primary" style="margin:50px 0 0 45px;width:160px"><a-icon type="edit"/>创建文档</a-button>
      <a-menu-item key="1" style="margin-top:50px" >
        <div style="margin:0px 0 0 20px">
          <a-icon type="file" />
          <span>我的文档</span>
        </div>
        </a-menu-item>
      <a-sub-menu key="sub1" style="margin-top:20px">
        <span style="margin:0px 0 0 20px" slot="title"><a-icon type="mail" /><span>我的团队</span></span>
        <a-menu-item-group key="g1">
          <a-menu-item key="2">
            团队A
          </a-menu-item>
          <a-menu-item key="3">
            团队B
          </a-menu-item>
          <a-menu-item key="4">
            团队C
          </a-menu-item>
          <a-menu-item key="5">
            团队D
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="6" style="margin-top:20px" >
        <div style="margin:0px 0 0 20px">
          <a-icon type="delete" />
          <span>回收站</span>
        </div>
        </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1'],
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
  },
}
</script>
