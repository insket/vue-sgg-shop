<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <Transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2">
              <!--  一级分类 -->
              <div
                class="item"
                :class="{ on: currentIndex === index }"
                v-for="(catItem1, index) in category"
                :key="catItem1.categoryId"
                @click="goSearch"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-catName="catItem1.categoryName"
                    :data-catName1id="catItem1.categoryId"
                    >{{ catItem1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <!--  二级分类 -->
                  <div
                    class="subitem"
                    v-for="catItem2 in catItem1.categoryChild"
                    :key="catItem2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-catName="catItem2.categoryName"
                          :data-catName2id="catItem2.categoryId"
                          >{{ catItem2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!--  三级分类 -->
                        <em
                          v-for="catItem3 in catItem2.categoryChild"
                          :key="catItem3.categoryId"
                        >
                          <a
                            :data-catName="catItem3.categoryName"
                            :data-catName3id="catItem3.categoryId"
                            >{{ catItem3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "loadsh";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, // 鼠标移入分类的index
      isShow: true, // 三级联动是否展示
    };
  },

  mounted() {
    // 判断当前路由是不是home
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },

  computed: {
    ...mapState({
      category: (state) => state.home.category,
    }),
  },

  methods: {
    // 鼠标进入修改currentIndex的回调  节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),

    // 鼠标移出的回调
    leaveIndex() {
      // 将currentIndex改为-1变成不选中
      this.currentIndex = -1;
      // 鼠标移出隐藏三级分类
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },

    // 点击分类跳转到search
    goSearch(event) {
      // console.log(event.target.dataset);
      const { catname, catname1id, catname2id, catname3id } =
        event.target.dataset;
      // 判断点击的是否是a标签
      if (catname) {
        const location = { name: "search" };
        const query = { catname: catname };

        if (catname1id) {
          query.catname1id = catname1id;
        } else if (catname2id) {
          query.catname2id = catname2id;
        } else {
          query.catname3id = catname3id;
        }

        // 拼接路由参数
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query;
          this.$router.push(location);
        }
      }
    },

    // 鼠标移入展示三级联动
    enterShow() {
      if (this.$route.path !== "/home") {
        this.isShow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    :hover {
      cursor: pointer;
    }

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 470px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .on {
          background-color: #ccc;
        }
      }
    }

    // 过度样式
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 470px;
    }
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
