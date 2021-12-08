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
      <Button type="primary">vant3的组件使用</Button>
    </div>
  </div>
</template>

<script setup>
/*
  九宫格:luckDraw组件 参数见组件
*/
import LuckDraw from "@/components/LuckDraw.vue";
import { ref } from "vue";
import { Button,Toast } from "vant";
let prize = ref(-1); // 起始位置
const luckDraw = ref(null);
const luckFun = () => {
  luckDraw.value.roll();
  setTimeout(() => {
    prize.value = 7;
  }, 7000);
};
const luckEnd = () => {
  Toast('恭喜您中奖或者没中奖')
  console.log("luckEnd");
};
</script>
<style lang="scss" scoped>
@import "../styles/index.css";
</style>
