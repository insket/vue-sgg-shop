<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="changIsCheck(cart.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum($event, -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="changeNum($event, 0, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum($event, 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteById(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          @change="updataIsAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "loadsh";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getCartList");
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 商品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        item.isChecked === 1 ? (sum += item.skuNum * item.skuPrice) : "";
      });
      return sum;
    },
    // 选中商品个数
    checkedNum() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        item.isChecked === 1 ? (sum += item.skuNum) : "";
      });
      return sum;
    },
    //  是否全部选中
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },
  methods: {
    // 修改商品个数
    changeNum: throttle(async function (event, type, cart) {
      let num = 0;
      switch (type) {
        case 1:
          num = 1;
          break;
        case -1:
          // 如果大于1 传递-1, 如果小于等于1 不变
          num = cart.skuNum > 1 ? -1 : 0;
          break;
        case 0:
          // 非法情况
          if (isNaN(event.target.value || event.target.value < 1)) {
            num = 0;
          } else {
            num = parseInt(event.target.value) - cart.skuNum;
          }
        default:
          break;
      }
      await this.$store.dispatch("updataShopCart", {
        skuId: cart.skuId,
        skuNum: num,
      });
      // 发送数据更新页面
      await this.$store.dispatch("getCartList");
    }, 1000),
    // 删除商品
    async deleteById(id) {
      await this.$store.dispatch("deleteCart", id);
      await this.$store.dispatch("getCartList");
    },
    // 切换商品是否选中
    async changIsCheck(id, $event) {
      let isCheck = $event.target.checked ? "1" : "0";
      await this.$store.dispatch("changeCheckedStatus", {
        skuId: id,
        isChecked: isCheck,
      });
      await this.$store.dispatch("getCartList");
    },
    // 删除所有选中的商品
    async deleteAllChecked() {
      try {
        // 派发action
        await this.$store.dispatch("deleteAllChecked");
        await this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改全部商品是否全选
    async updataIsAllChecked($event) {
      let checked = $event.target.checked ? '1' : '0'
      await this.$store.dispatch('updataIsAllChecked', checked)
      await this.$store.dispatch("getCartList")
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>