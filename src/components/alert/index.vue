<template>
  <div class="bg-container" @click.self="close" :style="{display: visible}">
    <div class="alert-container">
      <span>{{content}}</span>
      <slot></slot>
    </div>
  </div>

</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>
