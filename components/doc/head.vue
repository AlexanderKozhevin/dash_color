<template>
  <div class="hello"></div>
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
  methods: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
