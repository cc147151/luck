<template>
  <div class="home">
    <div class="bgc">
      <div class="imgBgc">
        <img class="bgcImg" src="@/assets/bgc.png" alt="" />
      </div>
      <LuckDraw
        ref="luckDraw"
        v-model="prize"
        @luckFun="luckFun"
        @luckEnd="luckEnd"
      />
      <Button type="primary" @click="see">vant3的组件使用{{imgStyle}}</Button>
      <img class="ttt" src="../assets/k2.png" alt="">
      <img class="img" :style="imgStyle.value" @load="imgLoad($event)" src="../assets/k2.png" alt="" srcset="">
    </div>
  </div>
</template>

<script setup>
/*
  九宫格:luckDraw组件 参数见组件
*/
import {imgHook} from '@/hooks/imgHook.js'  // 使用hook值得时候不要.value。会丢失响应式
import LuckDraw from "@/components/LuckDraw.vue";
import { ref,reactive } from "vue";
import { Button,Toast } from "vant";
let prize = ref(-1); // 起始位置
const luckDraw = ref(null);
const imgWidth = ref('');
const imgHeight = ref('');
let imgStyle = ref({})
const luckFun = () => {
  luckDraw.value.roll();
  setTimeout(() => {
    prize.value = 7;
  }, 7000);
};
const luckEnd = () => {
  Toast('恭喜您中奖或者没中奖')
};
const imgLoad =(e)=> {
  imgStyle.value=imgHook(e)
}
</script>
<style lang="scss" scoped>
@import "../styles/index.css";
.ttt {
 width: 6.18rem;
 height: 6.6rem;
}
</style>
