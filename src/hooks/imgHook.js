import { ref } from "vue";
const num = ref(1);
// 使用解构视图是不会重新渲染的
let imgStyle = ref({});
const imgWidth = ref("");
const imgHeight = ref("");
const getSize = (naturalWidth, naturalHeight) => {
  const clientWidth = document.documentElement.clientWidth;
  const fontSize = clientWidth / 750;
  imgWidth.value = naturalWidth * fontSize + "px";
  imgHeight.value = naturalHeight * fontSize + "px";
  imgStyle.value = { width: imgWidth.value, height: imgHeight.value };

};
export const imgHook = (e) => {
  const { naturalWidth, naturalHeight } = e.path[0];
  getSize(naturalWidth, naturalHeight);
    imgStyle.value = { width: imgWidth.value, height: imgHeight.value };
  window.addEventListener("resize", () => {
    getSize(naturalWidth, naturalHeight);
  });
  return imgStyle;
};
