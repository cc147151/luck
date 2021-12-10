//首先图片是1:1比例，解决不同图片免去单独设置宽高
// 在函数里创建ref，可以避免多张图片使用造成取值的问题
import { ref } from "vue"
// 使用解构视图是不会重新渲染的
const getSize = (naturalWidth, naturalHeight,imgWidth,imgHeight,imgStyle) => {
  const clientWidth = document.documentElement.clientWidth
  const fontSize = clientWidth / 750
  imgWidth.value = naturalWidth * fontSize + "px"
  imgHeight.value = naturalHeight * fontSize + "px"
  imgStyle.value = { width: imgWidth.value, height: imgHeight.value }
}
export const imgHook = (e) => {
  let imgStyle = ref({})
  const imgWidth = ref("")
  const imgHeight = ref("")
  const { naturalWidth, naturalHeight } = e.path[0]
  getSize(naturalWidth, naturalHeight,imgWidth,imgHeight,imgStyle)
  imgStyle.value = { width: imgWidth.value, height: imgHeight.value }
  window.addEventListener("resize", () => {
    getSize(naturalWidth, naturalHeight,imgWidth,imgHeight,imgStyle)
  })
  return imgStyle
}
