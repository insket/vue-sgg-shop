<template>
  <div class="">
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="item in floors" :key="item.id" :floor="item" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "./components/ListContainer";
import Recommend from "./components/Recommend";
import Rank from "./components/Rank";
import Like from "./components/Like";
import Floor from "./components/Floor";
import Brand from "./components/Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("floorList");
  },
  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>
