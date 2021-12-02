<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- 根据路由元信息meta判断是否显示footer -->
    <Footer v-show="$route.meta.isFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
