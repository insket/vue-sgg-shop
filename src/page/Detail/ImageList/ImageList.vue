<template>
  <div class="swiper-container" ref="goodsSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(sku, index) in skuImageList" :key="sku.id">
        <img :class="{active:currentIndex === index}" :src="sku.imgUrl" @click="changeActive(index)"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0 // 点击的图片
    }
  },
  methods: {
    // 切换点击图片
    changeActive(index) {
      this.currentIndex = index
      // 将index传给 zoom
      this.$bus.$emit('getIndex', index)
    }
  },
  watch: {
    skuImageList: {
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.goodsSwiper, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 显示几个图片
            slidesPerView: 3
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid rgb(236, 155, 101);
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>