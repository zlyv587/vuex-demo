<template>
  <div class="hello">
    <div @click="goPage2">跳完page2</div>
    <h1>{{ helloText }}</h1>
    <div @click="sayHello">{{count}}dede</div>
    {{visibleProp }}
    <!--<alert content="fewafewafew" :visibleProp="visibleProp" :closeProp="closeProp"></alert>-->
  </div>
</template>
<style scoped lang="less" src="./style.less"></style>
<script src="./script.js"></script>

