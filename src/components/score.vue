<!-- 评分 -->
<template>
  <div class="Rating-gray">
    <i v-for="(item,index) in itemClasses
    " :key="index" class="fa" :class="item"></i>
    <span v-if="showText" class="text">{{rating}}</span>
  </div>
</template>
 
<script>
// 星星长度
const LENGTH = 0;
// 星星对应的class,亮星
const CLS_ON = "fa-star";
// 半星
const CLS_HALF = "fa-star-half-empty";
// 灰星
const CLS_OFF = "fa-star-o";
export default {
  name: "Rating",
  props: {
    rating: String,
    showText: {
        type: Boolean,
        default: false,
    },
  },
  computed: {
    itemClasses() {
      // 如4.8 四个全星 1个半星
      let result = [];
      // 对分数进行处理, 向下取0.5的倍数
      let score = Math.floor(this.rating * 2) / 2;
      // 控制半星
      let hasDecimal = score % 1 !== 0;
      // 全星
      let integer = Math.floor(score);
      // 全星放入到数组中
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 半星
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 补齐
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;      
    }
  }
};
</script>

<style scoped>
.Rating-gray{
    text-align: center;
}

.text{
    font-weight: 500;
    font-size: 12px;
    -webkit-transform: scale(.916) translateY(1px);
    transform: scale(.916) translateY(1px);
    -webkit-transform-origin: top left;
    transform-origin: top left;
    color: rgba(0,0,0,.5);
    padding: 3px 0;
    margin: -3px 0;
    margin-left: 4px;
}
.fa-star{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../image/1.png) no-repeat;
    background-size: 100%;
}
.fa-star-half-empty{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../image/3.png) no-repeat;
    background-size: 100%;
}
.fa-star-o{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../image/4.png) no-repeat;
    background-size: 100%;
}
</style>