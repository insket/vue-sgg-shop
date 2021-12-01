<template>
  <div class="">
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import ListContainer from './components/ListContainer'
import Recommend from './components/Recommend'
import Rank from './components/Rank'
import Like from './components/Like'
import Floor from './components/Floor'
import Brand from './components/Brand'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data () {
    return {}
  },
  props: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
