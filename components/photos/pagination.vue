<template>
  <div class="hello flex-row flex-second-center">
    <div class="flex-row flex-main-center flex-second-center page-button" @click="shift(-1)">
      <img class="icon-image"  src="/img/left.svg" />
    </div>
    <div class="page-number flex-row flex-main-center flex-second-center">
      {{$store.state.page}} - {{$store.state.max_page}}
    </div>
    <div class="flex-row flex-main-center flex-second-center page-button" @click="shift(1)">
      <img class="icon-image"  src="/img/right.svg" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";

export default {
  name: "sample",
  props: {},
  computed: {
    ...mapState({
      // list: state => state.graphs.list
    })
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    shift(index){
      let page = this.$store.state.page
      page += index
      if (page == 0){
        page = 1
      }

      if (page > this.$store.state.max_page){
        page = this.$store.state.max_page
      }

      this.$store.commit('shift_page', page)
      setTimeout(()=>{
        this.$store.commit('get_list')
      }, 50)
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-number{
  height: 64px;
  width: 64px;
}
.icon-image{
  width: 25px;
}
.page-button{
  width: 64px;
  cursor: pointer;
  height: 64px;
  &:hover{
    background-color: rgba(130,130,130,0.1);
  }
}
</style>
