<template>
  <div>
    好看的：{{content.text}}
    <unique v-if="content.children" :content="content.children"></unique>
  </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>
