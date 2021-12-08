<template>
 <div class="zptBox">
        <div class="zpt">
          <div id="luck" class="lk">
            <div class="luck-unit luck-unit-0 active">
              <div class="iBox">
                <img class="canyu" src="@/assets/canyu.png" alt="" />
              </div>
              <p class="iconfont">谢谢参与</p>
            </div>
            <div class="luck-unit luck-unit-1 oneBox">
              <div class="iBox">
                <img class="img_one" src="@/assets/one.png" alt="" />
              </div>
              <p>华为p30手机</p>
            </div>
            <div class="luck-unit luck-unit-2">
              <div class="iBox">
                <img class="canyu" src="@/assets/canyu.png" alt="" />
              </div>
              <p>谢谢参与</p>
            </div>

            <div class="luck-unit luck-unit-7">
              <div class="iBox">
                <img class="img_two" src="@/assets/four.png" alt="" />
              </div>
              <p>京东卡200元</p>
            </div>
            <div class="cjBtn" id="btn" @click="luckFun">
              <h3>抽奖</h3>
            </div>
            <div class="luck-unit luck-unit-3">
              <div class="iBox">
                <img class="img_four" src="@/assets/two.png" alt="" />
              </div>
              <p>戴森吸尘器</p>
            </div>
            <div class="luck-unit luck-unit-6">
              <div class="iBox">
                <img class="canyu" src="@/assets/canyu.png" alt="" />
              </div>
              <p>谢谢参与</p>
            </div>
            <div class="luck-unit luck-unit-5 threeBox">
              <div class="iBox">
                <img class="img_three" src="@/assets/three.png" alt="" />
              </div>
              <p>京东卡100元</p>
            </div>
            <div class="luck-unit luck-unit-4">
              <div class="iBox">
                <img class="canyu" src="@/assets/canyu.png" alt="" />
              </div>
              <p>谢谢参与</p>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
/*
    @params:
        luck.prize: 中奖位置
    @fun:
        roll: 调用启动转盘
        luckFun:点击抽奖按钮
        luckEnd:抽奖结束
*/
import { ref,onMounted, reactive, defineEmits, defineProps, watch } from "vue"
const luckSpeed = ref(50)
const luckObj = reactive({ luck: {} })
let luck = luckObj.luck
const emit = defineEmits(["luckFun", "luckEnd", "update:modelValue"])
const props = defineProps({
  modelValue: Number,
})
watch(
  () => props.modelValue,
  (val, pre) => {
    console.log(val, "prize")
    luck.prize = val
  }
)
const luckDataInit = () => {
  luck = {
    index: 0, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: luckSpeed.value, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置
    init: function(id) {
      var $luck,
        $units = ""
      if ($("#" + id).find(".luck-unit").length > 0) {
        $luck = $("#" + id)
        $units = $luck.find(".luck-unit")
        this.obj = $luck
        this.count = $units.length
        $luck.find(".luck-unit-" + this.index).addClass("active")
      }
    },
    roll: function() {
      var index = this.index
      var count = this.count
      var luck = this.obj
      $(luck)
        .find(".luck-unit-" + index)
        .removeClass("active")
      index += 1
      if (index > count - 1) {
        index = 0
      }
      $(luck)
        .find(".luck-unit-" + index)
        .addClass("active")
      this.index = index
      console.log("roll")
      return false
    },
    stop: function(index) {
      this.prize = index
      return false
    },
  }
}
const roll = () => {
  console.log(luck)
  luck.times += 1
  luck.roll()
  if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
    console.log("结束转动stop", luck.prize, luck.index)
    emit("luckEnd")
    // 可以确保点击再来一次时候显示最新机会次数
    // 下边就拿不到了   初始化了 需要索引要在上面做;;
    clearTimeout(luck.timer)
    emit("update:modelValue", -1)
    luck.times = 0
    luck.timer=0
    luck.speed=luckSpeed.value
    // click = false
  } else {
    if (luck.times < luck.cycle) {
      luck.speed -= 10
      // 将来这里变一下 >= 并且已经拿到后台返回的具体中将数字
    } else if (luck.times == luck.cycle) {
      console.log(luck.times, luck.cycle)
      var index = (Math.random() * luck.count) | 0
      if (index > 5) {
        index = 7
      } else {
        index = 5
      }
      // test
    } else {
      if (
        luck.times > luck.cycle + 10 &&
        ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)
      ) {
        luck.speed += 110
      } else {
        luck.speed += 20
      }
    }
    if (luck.speed < 40) {
      luck.speed = 40
    }
    luck.timer = setTimeout(roll, luck.speed)
  }
  return false
}
onMounted(() => {
//   luckDataInit()
  luckDataInit()
  luck.init("luck")
})
const luckFun = () => {
  emit("luckFun", "luck")
}
defineExpose({
  roll,
  luck,
})
</script>

<style scoped lang="scss">
.zptBox {
  width: 100%;
  padding: 0 0.26rem;
  margin-top: 0.1rem;
}
/* 九宫格样式 */
.zpt {
  /* width: 6.57rem; */
  height: 6.25rem;
  margin-top: 0.1rem;
  display: flex;
  padding: 0.6rem;
  position: relative;
  z-index: 11;
  padding: 0.73rem 0.8rem;
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100% 6.25rem;
  animation: changeBg 0.5s ease infinite;
}
.lk {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
}
.lk > div {
  /* width: 1.67rem; */
  width: 31.33%;
  height: 1.46rem;
  background: url("../assets/baidi.png") no-repeat left top;
  background-size: 100% 1.46rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.25rem;
}
.lk .iBox {
  height: 0.86rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lk .cjBtn {
  background: url("../assets/chou.png") no-repeat;
  background-size: 100% 1.46rem;
}
.lk .cjBtn h3 {
  font-size: 0.36rem;
  font-weight: 600;
  color: #eb4c3d;
}
.lk .cjBtn p {
  font-size: 0.18rem;
  color: #b82626;
  padding: 0.03rem 0.08rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0.13rem;
  display: flex;
  align-items: center;
}
.lk .cjBtn span {
  color: #e74c44;
  font-size: 0.28rem;
  font-weight: 500;
  margin-top: -0.01rem;
}

.oneBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 选中的 谢谢参与 */
.lk .active img {
  /* margin-bottom: 0.15rem;
  margin-top: 0.24rem; */
}
.lk .img_one {
  width: 0.6rem;
  height: 0.8rem;
  margin: 0;
}
.lk .img_two {
  width: 0.98rem;
  height: 0.63rem;
  /* margin-top: 0.2rem;
  margin-bottom: 0.15rem; */
}
.lk .img_four {
  width: 0.86rem;
  height: 0.86rem;
}
.img_three {
  width: 0.97rem;
  height: 0.63 rem;
}

/* .lk .threeBox image {

} */
.lk div p {
  font-size: 0.2rem;
  color: #f0953f;
}
.lk div.active {
  background-size: 100% 1.46rem;
  /* box-shadow: 0.01rem 0.03rem 0.02rem 0 #ebeb61; */
  box-shadow: 0 0.08rem 0.25rem 0.01rem #fded5e,
    0rem 0rem 0.2rem 0.02rem rgba(246, 70, 50, 1) inset;
  border: 0.07rem solid #fded5e;
}
/*  */
.lk .canyu {
  width: 0.63rem;
  height: 0.63rem;
  /* margin-top: 0.24rem;
  margin-bottom: 0.2rem; */
}
/* 额外的单独 */
.lk .luck-unit-5 {
  /* display: block; */
  text-align: center;
  position: relative;
  overflow: hidden;
}
@keyframes changeBg {
  0% {
    background-image: url("../assets/k1.png");
  }
  100% {
    background-image: url("../assets/k2.png");
  }
}
</style>
