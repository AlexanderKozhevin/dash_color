<template>
  <div class="hello_img">
    <div class="preview" :style="getStyle(data)">

      <div v-if="data.status == 'wait'" class="waiter flex-row flex-main-center flex-second-center">
        <img class="add_icon" src="/img/wait.svg" />
      </div>

      <a v-if="data.status == 'done'" :href="data.link" target="_blank" class="href_link flex-row flex-main-center flex-second-center">
      </a>


    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mapState } from "vuex";

export default {
  name: "sample",
  props: {
    data: Object
  },
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
    getStyle(data){
      let url = data.original

      if (data.status == 'done'){
        url = data.link
        // url = "https://storage.googleapis.com/colorize_jobs/5df453c02243796f484e54fd25a3986c/a2a34755b01bc418dcb708090c9fae88.jpg"
      }
      let obj = {
        background: `url("${url}")`,
      }
      return obj

    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello_img{
  width: 200px;
  height: 200px;
  border: 1px solid rgba(#303952, 0.2);
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.hello_img_thing{
  width: 100%;
  max-height: 50px;
}
.preview{
  background-size: cover!important;
  background-repeat: no-repeat!important;
  background-position: center center!important;
  width: 100%;
  height: 100%;

}
.waiter{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}
.href_link{
  width: 100%;
  height: 100%;
}
</style>
