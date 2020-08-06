<template>
  <div class="hello_img">
    <div class="preview flex-col">

      <!-- <div v-if="data.status == 'wait'" class="waiter flex-row flex-main-center flex-second-center">
        <img class="add_icon" src="/img/wait.svg" />
      </div> -->
<!--
      <a v-if="data.status == 'done'" :href="data.link" target="_blank" class="href_link flex-row flex-main-center flex-second-center">
      </a> -->

      <div class="naming">
        {{data.name}}
      </div>

      <video width="100%" height="200px" controls v-if="data.status != 'done'">
  <source :src="data.original" type="video/mp4">
</video>

<video width="100%" height="200px" controls v-if="data.status == 'done'">
<source :src="data.link" type="video/mp4">
</video>

<div class="flex-row flex flex-main-center flex-second-center" v-if="data.status == 'wait'">
  in queue
</div>

<div class="flex-row flex logs flex-main-center flex-second-center" v-if="data.status == 'work'">
  <img class="wait_icon" src="/img/wait2.svg" />
  <div>{{data.logs}}</div>
</div>

<div class="flex-row flex logs flex-main-center flex-second-center" v-if="data.status == 'done'">
  ready
</div>


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
  width: 300px;
  // height: 250px;
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
.logs{
  font-size: 12px!important;
}
.wait_icon{
  margin-right: 10px;
}
.naming{
  font-size: 12px;
  margin-left: 12px;
  margin-top: 12px;
}
</style>
