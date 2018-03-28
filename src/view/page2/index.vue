<template>
  <div>
      <div>
        <h1>这里是page2页面</h1>
        <h2 @click="goHello">返回hello页面</h2>
        <div>{{helloText}}</div>
        <div>count: {{count}}</div>
        <div v-for="(item, index) in list" :key="index">
          {{item.title}}
        </div>
        <unique :content="content"></unique>
      </div>
  </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

