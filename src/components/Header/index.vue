<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.loginName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <span>{{userInfo.loginName}}</span>
            <span class="register" @click="loginOut">退出登录</span>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/trade">我的订单</router-link>
          <router-link to='/shopcart'>我的购物车</router-link>
          <router-link to="/center">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keydown="enterSearch"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      keyword: "", // input值
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.loginAndRegister.userInfo
    })
  },
  methods: {
    // 搜索的回调
    goSearch() {
      // 判断输入是否为空格或没有输入
      if (this.keyword.trim().length === 0) return alert("没有输入搜索内容哦");

      if (this.$route.query) {
        let loaction = { name: "search", params: { keyword: this.keyword } };
        loaction.query = this.$route.query;
        // 携带 input的keyword
        this.$router.push(loaction);
        this.keyword = ''
      }
    },
    // 按下 enter 跳转search
    enterSearch(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (this.$route.query) {
          let loaction = { name: "search", params: { keyword: this.keyword } };
          loaction.query = this.$route.query;
          // 携带 input的keyword
          this.$router.push(loaction);
          this.keyword = ''
        }
      }
    },
    // 退出登录
    loginOut() {
      this.$store.dispatch('getLoginOut')
    }
  },
};
</script>

<style lang="less" scoped>
// 头部样式
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
