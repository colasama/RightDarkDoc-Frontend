<template>
  <div class="example">
    <v-contextmenu ref="contextmenu" :theme="theme">
      <v-contextmenu-item @click="handleClick">删除</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">权限设置</v-contextmenu-item>

      <v-contextmenu-item divider></v-contextmenu-item>

      <v-contextmenu-submenu @submenu-show="handleSubmenuShow" title="子菜单">
        <v-contextmenu-item @click="handleClick">菜单3</v-contextmenu-item>

        <v-contextmenu-item divider></v-contextmenu-item>

        <v-contextmenu-submenu title="子菜单">
          <v-contextmenu-item @click="handleClick">菜单5</v-contextmenu-item>
        </v-contextmenu-submenu>

        <v-contextmenu-item @click="handleClick">菜单4</v-contextmenu-item>

        <v-contextmenu-item :auto-hide="false">不自动关闭1</v-contextmenu-item>
        <v-contextmenu-item :auto-hide="false">不自动关闭2</v-contextmenu-item>
      </v-contextmenu-submenu>
    </v-contextmenu>

    <div :class="['box', theme]" @contextmenu.prevent="" v-contextmenu:contextmenu>
      右键点击此区域
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Submenu',
    props: {
      theme: String,
    },
    methods: {
      handleClick (vm, event) {
        console.log(vm, event)
      },
      handleSubmenuShow (vm, placement) {
        console.log(vm, placement)
      },
    },
  }
</script>

<style scoped>
  .box {
    width: 100%;
  }
</style>