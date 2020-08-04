<template>
  <div class="hello flex-row flex-wrap hello_photo">
    <photo v-for="(el, index) in $store.state.photos" :data="el" :key="index" />

    <div class="aligner flex-row flex-main-center flex-second-center" v-if="$store.state.photos.length == 0">
      <img class="break_photo" src="/img/break.png" />
    </div>

  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";
import photo from './item.vue';

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
  methods: {},
  components: {
    photo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.hello_photo{
  padding-left: 20px;
  padding-top: 10px;
  // background-color: red;
}
.break_photo{
  width: 400px;
}
.aligner{
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
</style>
